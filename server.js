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

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
