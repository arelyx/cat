var path = require('path');
var http = require('http');
var fs = require('fs');

var dir = path.join(__dirname, 'pics');

var mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
};

var server = http.createServer(function (req, res) {
    var reqpath = req.url.toString().split('?')[0];
    console.log(reqpath); 
    if (reqpath == "/favicon.ico"){
        res.statusCode = 404;
        return res.end("Not Found");
    } 

    if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Method not implemented');
    }

    fs.readdir(dir, function (err, files) {
        var cats = []
        files.forEach(function (file) {
            cats.push(file);
        });
        random_cat = cats[Math.floor(Math.random() * cats.length)];
        
        var file = path.join(dir, random_cat);
        var type = mime[path.extname(file).slice(1)] || 'text/plain';
        var s = fs.createReadStream(file);
        s.on('open', function () {
            res.setHeader('Content-Type', type);
            s.pipe(res);
        });
        s.on('error', function () {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Not found');
        });
    });
});

server.listen(3000, function () {
    console.log('Listening on http://localhost:3000/');
});