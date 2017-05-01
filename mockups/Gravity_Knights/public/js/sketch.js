// declaration of variables
var bg;
var me;
var othersIdx = [];
var otherPlayers = {};
var playervis;
var oppvis;

//var img;
function preload() {
  level =loadImage("../vis/map2.jpg")
  playervis = loadImage("../vis/yellowknight.gif")
  oppvis = loadImage("../vis/redknight.gif")
}


function setup() {
<<<<<<< HEAD
    createCanvas(800, 600);
=======
    createCanvas(800, 800);
    bg = color('powderblue');
    background(bg);
>>>>>>> origin/master

    me = new ClientPlayer(playervis);
	console.log(me);
  // For loading sprites later
	// img = loadImage("image.png");
}

function draw() {

  image(level, 0, 0);

    // call the player object methods
    me.frame(othersIdx,otherPlayers);

    for (var i = 0; i < othersIdx.length; i++) {
        if (otherPlayers[othersIdx[i]]) {

            otherPlayers[othersIdx[i]].frame();
        }
    }

}


/*************** socket data ***************/
socket.on("player_num", function(data) {
	me.setIdx(data);
});

socket.on("initialize_others", function(data) {

    // reset variable to empty array;
    otherPlayers = {};

    for (var i = 0; i < data.length; i++) {
        otherPlayers[data[i]] = new OtherPlayer();
    }

});

socket.on("newplayer", function(data) {

    var newIdx = data.thereidx;
    othersIdx = data.players;
    console.log(data);
    console.log(me.idx);

    if (me.idx !== newIdx) {
        newIdx = newIdx.toString();
        otherPlayers[newIdx] = new OtherPlayer();
        console.log("New Player: " + newIdx);
        console.log(data.thereidx);
    }

    console.log(othersIdx);
    console.log(otherPlayers);

});

socket.on("player_data", function(player_data) {
    var playerServer, playerCurr;
    if (player_data) {

        for (var i = 0; i < othersIdx.length; i++) {

            playerServer = player_data[othersIdx[i]];
            playerCurr = otherPlayers[othersIdx[i]];

            if (playerServer && playerCurr) {
                playerCurr.size = playerServer.size;
                playerCurr.pos.x = playerServer.pos.x;
                playerCurr.pos.y = playerServer.pos.y;
				        playerCurr.attackpos.y = playerServer.fistPos.y;
				        playerCurr.attackpos.x = playerServer.fistPos.x;
            }
        }
    }

});

socket.on('hit player', function(data){
	me.pos.y = 0;
	console.log(data);
});

socket.on("disconnect_player", function(disconnect_id) {
    othersIdx.splice(disconnect_id, 1);
    delete otherPlayers[disconnect_id.toString()];
});
