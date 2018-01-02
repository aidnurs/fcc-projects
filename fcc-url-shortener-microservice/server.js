var express = require('express');
var app = express();
var mongo=require("mongodb").MongoClient;

var mongoUri="mongodb://test:test@ds125774.mlab.com:25774/urls"

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

mongo.connect(mongoUri,function(err,db){
  
  app.get("/new/*",function(req,res){
    var input=req.params[0];
    var randomNumber=Math.floor(Math.random()*1000);
    var shortInput="https://fcc-url-shortener-mservice.glitch.me/"+randomNumber;
    var obj={
      original_url:input,
      short_url:shortInput
    }
    res.json(obj);
    db.collection('randomurls').insertOne(obj);
    res.end();
  });
  
  app.get("/:number",function(req,res){
    var shortUrl="https://"+req.headers["x-forwarded-host"]+"/"+req.params.number
    db.collection("randomurls").find({
      "short_url":shortUrl
    },{"original_url":1,"_id":0}).toArray(function(err,docs){
      if(err)throw err;
      docs.map(function(item){
        var result=res.redirect(item.original_url);
        return result;
      });
    });
  });
  
  db.collection("randomurls").deleteMany({});
  
});





var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
