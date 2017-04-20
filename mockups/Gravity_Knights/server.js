var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app).listen(3000);

var io = require("socket.io")(server);

// This is game player data for all players
var num_of_players = 0;
var players_idx = [];
var player_data = {};
var player_hits = {};

// We're using express.middleWare()
app.use(express.static("./public"));


io.on("connection", function(socket) {
    var myIdx = num_of_players;
	var myIdxStr = myIdx.toString();
    num_of_players++;


    console.log("A user connected.");
    socket.emit("Welcome", "Hello, from the server.");
    socket.emit("player_num", myIdx);
	socket.emit("initialize_others", players_idx);

	// Join their own individual room.
		// This allows us to address them individually.
	socket.join(myIdxStr);

	players_idx.push(myIdxStr);

	player_hits[myIdxStr] = 0;

    io.emit('newplayer', {thereidx: myIdx, players: players_idx} );



    // incoming data functions
    socket.on('player', function(playerData) {
        // console.log(playerData);
        player_data[myIdxStr] = playerData;
    });

	// Incoming hit data
	socket.on('player hit', function(hitPlayer) {
		player_hits[hitPlayer]++;
		console.log('hit player', hitPlayer, player_hits);
		// io.emit('hit player', {thereidx: myIdx, players: players_idx});
		io.in(hitPlayer).emit('hit player', "You were hit - " + hitPlayer);
});

    // Cleanup
    socket.on("disconnect", function() {
        console.log("User disconnected: " + myIdx);
		var idx2remove = players_idx.indexOf( myIdxStr );
		players_idx.splice( idx2remove, 1 );
		console.log(myIdx);
		console.log(players_idx);

		delete player_data[myIdxStr];
		delete player_hits[myIdxStr];
        io.emit("disconnect_player", myIdx);
    });

});


var sendLoop = setInterval(function() {

        io.emit("player_data", player_data);
		// console.log(player_data);
    },
    20
);
