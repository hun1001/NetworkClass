const http = require('http');
const fs = require('fs');
const url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    if (_url == '/') {
        _url = '/index.html';
    }
    if (_url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //response.end(fs.readFileSync(__dirname + _url));
    // fs.realFile(`data/${queryData.id}`, 'utf8', function(err, data) { 대충 여기서 html 입력받고 변수에 넣어주면 됨 에러체크는 덤})) 일부만 변경하는 코드
    var template = fs.readFileSync(__dirname + _url, 'utf8');
    response.end(template);
});
app.listen(3000);
