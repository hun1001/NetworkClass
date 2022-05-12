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

    var template = `<!DOCTYPE html>
<head>
    <title>${queryData.id}</title>
    <meta charset="utf-8">
</head>
<body>
    <span style = "font-size:24px;"><strong> ${queryData.id}</strong></span>
    <ol type="1">
        <a href="/?id=page1.html" target="_blank" title="닥터스트레인지">
            <li>목록1</li>
        </a>
        <a href="page2.html" target="_blank" title="닥터스트레인지">
            <li>목록2</li>
        </a>
        <a href="page3.html" target="_blank" title="닥터스트레인지">
            <li>목록3</li>
        </a>
    </ol>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/niEalGA414k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    <div id="disqus_thread"></div>
    <script src="discus.js"> </script>

    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

<!--Start of Tawk.to Script-->
<script type="text/javascript" src = "Tawk.js"> </script>
<!--End of Tawk.to Script-->

</body>
</html>`;
    response.end(template);
});
app.listen(3000);