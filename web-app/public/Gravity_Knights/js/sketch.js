// declaration of variables
var bg;
var me;
var myIdx;
var othersIdx = [];
var otherPlayers = {};

// Array for vis
var playerColor = ["vis/yellowknight.gif", "vis/redknight.gif", "vis/purpleknight.gif", "vis/pinkknight.gif", "vis/orangeknight.gif", "vis/greenknight.gif", "vis/blueknight.gif", "vis/musicknight.gif", "vis/zedknight.gif"];
var playerImg = [];
// var oppColor = ["vis/yellowknight.gif", "vis/redknight.gif", "vis/purpleknight.gif", "vis/pinkknight.gif", "vis/orangeknight.gif", "vis/greenknight.gif", "vis/blueknight.gif"];


// Score Health Stuff
var scoreString = "SCORE: ";
var scoreHolder;
var healthHolder;
var healthHolder2;
var healthLeft = 66;
var ophealthLeft = 66;

var platformrect = [{
    x: 345 - 95 / 2 + 20,
    y: 187,
    width: 105,
    height: 224
}, {
    x: 25 - 95 / 2,
    y: 274,
    width: 150,
    height: 51
}, {
    x: 630 - 95 / 2,
    y: 274,
    width: 151,
    height: 51
}];

//enterName for disconnect;

var enterName;


// Loads Visuals
function preload() {
    level = loadImage("vis/map2.jpg");

    // for (var i = 0; i < playerColor.length; i++) {
//     playerImg.push( loadImage(path,successCallback,failureCallback))
// }
}



function setup() {
    createCanvas(800, 600);

    me = new ClientPlayer(random(playerColor), myIdx);
    console.log(me);
}



function draw() {
    image(level, 0, 0);

    // Refs for plat boxes
    // Mid boxes
    //  rect(350, 408, 100, 2)
    //  rect(350, 187, 100, 2)
    // left plat
    //  rect(25, 274, 151, 2)
    //  rect(25, 325, 151, 2)
    // Right plat
    //   rect(624, 274, 151, 2)
    //  rect(624, 325, 151, 2)

    // Call the player object methods
    me.frame(othersIdx, otherPlayers);

    for (var i = 0; i < othersIdx.length; i++) {
        if (otherPlayers[othersIdx[i]]) {
            otherPlayers[othersIdx[i]].frame();
        }
    }

}


/*************** socket data ***************/
socket.on("player_num", function(data) {
    console.log(data);
    console.log(me);
    myIdx = data;
    if (me) {
        me.setIdx(data);
    }
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
    // console.log(me.idx);

    if (myIdx !== newIdx) {
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
                playerCurr.playervis = playerServer.playervis;
                playerCurr.size = playerServer.size;
                playerCurr.pos.x = playerServer.pos.x;
                playerCurr.pos.y = playerServer.pos.y;
                playerCurr.healthLeft = playerServer.healthLeft;
                playerCurr.attackpos.y = playerServer.fistPos.y;
                playerCurr.attackpos.x = playerServer.fistPos.x;
                playerCurr.runidx = playerServer.runidx;
                playerCurr.runidy = playerServer.runidy;
                playerCurr.gravity = playerServer.gravity;
                playerCurr.playerScore = playerServer.playerScore;
            }
        }
    }

});

socket.on('hit player', function(data) {
    me.pos.y = 0;
    healthLeft -= 22;
    console.log(data);
    console.log(healthLeft);

});

socket.on("disconnect_player", function(disconnect_id) {
    othersIdx.splice(disconnect_id, 1);
    delete otherPlayers[disconnect_id.toString()];
});
