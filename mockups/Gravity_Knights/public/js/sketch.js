// declaration of variables
var bg;
var me;
var myIdx;
var othersIdx = [];
var otherPlayers = {};
var playervis;
var oppvis;
var platformrect = [{x:315, y:187, width:115, height:221}, {x:25, y:274, width:127, height:51}, {x:590, y:274, width:151, height:51}];

// Loads Visuals
function preload() {
  level = loadImage("../vis/map2.jpg");
  playervis = loadImage("../vis/yellowknight.gif");
  oppvis = loadImage("../vis/redknight.gif");
}


function setup() {
  createCanvas(800 , 600);


  me = new ClientPlayer(playervis, myIdx);
  console.log(me);
}

function draw() {
  image(level, 0, 0);

  // plat boxes
  //mid plat
//   for (var i = 0; i < platformrect.length; i++) {
//     platformrect[i]
//   }
//   if (platformrect[i].x < rect2.x + rect2.width &&
//    platformrect[i].x + platformrect[i].width > rect2.x &&
//    platformrect[i].y < rect2.y + rect2.height &&
//    platformrect[i].height + platformrect[i].y > rect2.y) {
//     // collision detected!
// }
  rect(350, 408, 100,2)
  rect(350, 187, 100,2)
  //left plat
  rect(25, 274, 151,2)
  rect(25, 325, 151,2)
  //right plat
  rect(624, 274, 151,2)
  rect(624, 325, 151,2)

  // call the player object methods
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
  if (me){
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
        playerCurr.size = playerServer.size;
        playerCurr.pos.x = playerServer.pos.x;
        playerCurr.pos.y = playerServer.pos.y;
        playerCurr.attackpos.y = playerServer.fistPos.y;
        playerCurr.attackpos.x = playerServer.fistPos.x;
        playerCurr.runidx = playerServer.runidx;
        playerCurr.runidy = playerServer.runidy;
      }
    }
  }

});

socket.on('hit player', function(data) {
  me.pos.y = 0;
  console.log(data);
});

socket.on("disconnect_player", function(disconnect_id) {
  othersIdx.splice(disconnect_id, 1);
  delete otherPlayers[disconnect_id.toString()];
});
