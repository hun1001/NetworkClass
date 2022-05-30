var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  if (list == null) {
    list = '<li>성찰1</li>';
    list += '<li>성찰2</li>';
    list += '<li>성찰3</li>';
  }
  return `
    <!DOCTYPE html>
          <html lang="en" dir="ltr">

          <head>
            <meta charset="utf-8">
            <title> ${title} </title>
          </head>

          <body>
            <h1> <a href="/"> ${title}</a> </h1>

            ${list}

            <p>${body}</p>
          </body>
          </html>
          
    `;
}

var templateList = (filelist) => {
  var list = `<ol>`;
  for (var i = 0; i < filelist.length; i++) {
    list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`
  }
  list = list + '</ol>';
}


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  var pathname = url.parse(_url, true).pathname;
  var func = templateHTML;

  if (pathname == '/') {
    if (title == undefined) {
      fs.readdir('./data', function (err, filelist) {
        title = 'HELLO';
        var description = '메롱 첫번째 페이지';

        var list = templateList(filelist);

        var template = templateHTML(title, list, description);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(template);
      })

    }
    else {
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var list = '<ol>';
        var description = '메롱 첫번째 페이지';
        fs.readdir('./data', function (err, filelist) {
          title = 'HELLO';
        });
        var template = templateHTML(title, list, description);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(template);
      });
    }

  }
  else {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('메롱 NOT FOUND');
  }

  fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
    var template = templateHTML(title, list, description);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(template);

  });

});
app.listen(3000);
