var http = require('http');
var fs = require('fs');


var app = http.createServer(function (request, response) {
    var url = request.url;

    if (url == '/') {
        url = 'index.html';
    }
    if (url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    //console.log(dirname + url);
    response.end(fs.readFileSync(dirname + url));

});
app.listen(3000);