var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app).listen(3000);

var io = require("socket.io")(server);

//We're using express.middleWare()
app.use(express.static("./public"));
