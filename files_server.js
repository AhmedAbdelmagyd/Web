var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var imageDir = './images/';
var cssDir = './css/';

//create http server listening on port 3333
http.createServer(function (req, res) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url, true).query;
    var file;
    console.log(query);
    console.log(query.image);

    if (query.png !== undefined) {
        console.log("png ------------");
        file = query.png;
        fs.readFile(imageDir + file, function (err, content) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-type': 'image/png' });
                res.end(content);
            }
        });
    } else if (query.jpg !== undefined) {
        console.log("jpg ------------");
        file = query.jpg;
        fs.readFile(imageDir + file, function (err, content) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-type': 'image/jpg' });
                res.end(content);
            }
        });
    } else if (query.css !== undefined) {
        console.log("CSS ------------");
        file = query.css;
        fs.readFile(cssDir + file, function (err, content) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-type': 'text/css' });
                res.end(content);
            }
        });
    } 

}).listen(3333);
console.log("Server running at http://localhost:3333/");

