// for testing purposes
var r = 0;

// array of players
var player = [];



// jump

function setup() {
  createCanvas(windowWidth, windowHeight);

// for loop for player instances
// for (var px = 0; px < 4; px += 100) {
//   player.push(new Player())
// }
  player.ground = windowHeight - 100;
}

function draw() {
  background('powderblue');
  // fill('salmon');
  // rect(player.vxa, player.vya, player.vxb, player.vyb);
//for (var i = 0; i < player.length; i++) {
  player.show(0,0);
//}
}
