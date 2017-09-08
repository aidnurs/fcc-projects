
var express = require('express');
var app = express();

const GoogleImages = require('google-images');
 
const client = new GoogleImages(process.env.CSE_ID, process.env.CSE_API_KEY);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/cats',function(req,res){
  var obj={};
  client.search('cats').then(images => {
    res.json(images);
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});