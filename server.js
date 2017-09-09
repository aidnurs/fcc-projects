"use strict";

var express = require('express');
var app = express();
var multer =require('multer');
var upload = multer({ dest: 'uploads/' })

app.use(express.static('public'));

app.post('/get-file-size', upload.single('file'), function (req, res) {
  var obj={
    name:req.file.originalname,
    size:req.file.size
  }
  res.json(obj)
})

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
