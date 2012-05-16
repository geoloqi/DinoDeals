var http = require('http');
var path = require('path');
var fs = require('fs');
 
http.createServer(function (request, response) {
 
    console.log('request for '+ request.url +' starting...');
     
    var filePath = '.' + request.url;
    if (filePath == './'){
      filePath = './index.html';
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(8125);
 
console.log('Server running at http://127.0.0.1:8125/');