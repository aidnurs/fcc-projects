
var express = require('express');
var app = express();
var mongo= require('mongodb').MongoClient;
var mongoUri="mongodb://"+process.env.user+":"+process.env.password+"@ds131384.mlab.com:31384/imgsearch"

const GoogleImages = require('google-images');
 
const client = new GoogleImages(process.env.CSE_ID, process.env.CSE_API_KEY);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/imagesearch/:input',function(req,res){
  var input=req.params.input;
  mongo.connect(mongoUri,function(err,db){
    db.collection('imgsearch').insert({
      term:input,
      when:new Date()
    });
    db.close();
  });
  
  var obj={};
  client.search('cats').then(images => {
    res.json(images);
  });
});

app.get('/api/latest/imagesearch/',function(req,res){
  mongo.connect(mongoUri,function(err,db){
    db.collection('imgsearch').find({},{_id: 0, term: 1, when: 1}).toArray()
      .then(results => {
        db.close();
        res.json(results);
      })
    db.close();
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});