// init project
var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var storage = '../models/storage'

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(process.cwd() + '/views/index.html');
});

app.post("/", upload.single('userFile'), function(req, res, next) {
  if(req.file === undefined){
    res.statusCode = 400;
    res.send('It looks like you may not have supplied a file.  You might want to check that.')
  } else {
    res.statusCode = 201;
    var size = req.file.size;
    res.json({
    file_size: size,
  });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
