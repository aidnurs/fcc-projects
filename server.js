var express = require('express');
var app = express();
var offset=1;

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:query", function (req, res) {
  var url = "https://www.googleapis.com/customsearch/v1?q=" + req.params.query 
    + "&cx=" + process.env.Engine_ID
    + "&num=10&start=" + Number(1 + parseInt(offset)*10)
    + "&fileType=bmp,png,gif,jpg,jpeg"
    + "&key=" + process.env.Google_API_key;
  res.send(url);
});

app.get("/api/latest/imagesearch/", function (request, response) {
  
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
