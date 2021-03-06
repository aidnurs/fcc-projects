<<<<<<< HEAD

var express = require('express');
var app = express();
var url = require('url')
var dateFormat = require('dateformat');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:input", function (req, res) {
  var obj
  var input=req.params.input
  var unixTime=null
  var naturalTime=null
  //unix
  if(Number.isInteger(Number(input))){
    unixTime=Number(input)
    naturalTime=dateFormat(new Date(input*1000),"mmmm dd, yyyy")
  }
  //time
  else{ 
    naturalTime=input
    unixTime=new Date(naturalTime).getTime() / 1000
  }
  obj={
    unix:unixTime,
    natural:naturalTime
  }
  res.json(obj)
  res.end()
});

// listen for requests :)
=======
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/",function(req,res){
  
  var obj={
    ipaddress:req.headers["x-forwarded-for"].split(',')[0],
    language:req.headers["accept-language"].split(',')[0],
    software:req.headers["user-agent"].split(/[\(\)]/)[1],
  }
  res.json(obj)
});

>>>>>>> project-a/master
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
