var socket = io();
socket.on("datafromserver", function(message){
	console.log(message);
});
