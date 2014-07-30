var querystring = require("querystring"),
    fs = require("fs"),
    util = require('util'),
    formidable = require("formidable"),
    squareFinder = require("./squareFinder.js");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="GO" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    //fs.renameSync(files.upload.path, "/tmp/test.png");
    var readStream = fs.createReadStream(files.upload.path)
    var writeStream = fs.createWriteStream("/tmp/test.txt");
     
    util.pump(readStream, writeStream, function() {
        fs.unlinkSync(files.upload.path);
    });
    response.writeHead(200, {"Content-Type": "text/html"});

    response.write("result :<br/>");
    //response.write("<img src='/show' />");
    var body = '<iframe frameborder=0 scrolling=no src="/show"></iframe>'
    response.write(body);
    //response.write(<iframe name="show" id="show" width="500" height="500" src="B.txt"/>);
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.txt", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(squareFinder.search(file), "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
