var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app).listen(3000);

var io = require("socket.io")(server);

//We're using express.middleWare()
app.use(express.static("./public"));


io.on("connection", function(socket){
	socket.emit("datafromserver", "hahaEE");

	console.log("A user connected.");

});
