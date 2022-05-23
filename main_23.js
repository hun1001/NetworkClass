var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  var pathname = url.parse(_url, true).pathname;

  if (pathname == '/') {
    if (title == undefined) {
      fs.readdir('./data', function (err, filelist) {
        title = 'HELLO';
        var description = '메롱 첫번째 페이지';

        var list = '<ol>';
        for (var i = 0; i < filelist.length; i++) {
          list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`
        }
        list = list + '</ol>';

        var template = `
          <!DOCTYPE html>
          <html lang="en" dir="ltr">

          <head>
            <meta charset="utf-8">
            <title> ${title} </title>
          </head>

          <body>
            <h1> <a href="/"> ${title}</a> </h1>

            ${list}

            <p>${description}</p>
          </body>
          </html>
          `;
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
          for (var i = 0; i < filelist.length; i++) {
            list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`
          }
          list = list + '</ol>';
        });
        var template = `
          <!DOCTYPE html>
          <html lang="en" dir="ltr">

          <head>
            <meta charset="utf-8">
            <title> ${title} </title>
          </head>

          <body>
            <h1> <a href="/"> ${title}</a> </h1>

            <ol>
                ${list}
            </ol>
            <p>${description}</p>
          </body>
          </html>
          `;
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
    var template = `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">

      <head>
        <meta charset="utf-8">
        <title> ${title} </title>
      </head>

      <body>
        <h1> <a href="/"> ${title}</a> </h1>

        <ol>
            <li> <a href ="/?id=성찰교실1">목록1</a> </li>
            <li> <a href ="/?id=성찰교실2">목록2</a> </li>
            <li> <a href ="/?id=성찰교실3">목록3</a> </li>
        </ol>
        <p>${description}</p>
      </body>
      </html>
      `;
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(template);

  });

});
app.listen(3000);
