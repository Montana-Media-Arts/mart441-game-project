// for testing purposes
var r = 0;

// array of players
var player = [];

var vxa = 650;
var vxb = 50;
var vya = 600;
var vyb = 100;

// jump
var gravity = 1;
var ground;
var velocity = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);

// for loop for player instances
for (var px = 0; px < 4; px += 100) {
  player.push(new Player())
}
  ground = windowHeight - 100;
}

function draw() {
  background('powderblue');
  fill('salmon');
  rect(vxa, vya, vxb, vyb);
for (var i = 0; i < player.length; i++) {
  player[i].draw();
}

  player.attackpos.x = player.pos.x + 15.5

  player.attackpos.y = player.pos.y + 20
  player.pos.y += velocity + gravity;
  if (player.pos.y >= ground) {
    gravity = 0;
    velocity = 0;
  }else {
    gravity = 1;
  }
// movement
  // left
  if (keyIsDown(65) && player.pos.x >= 0) {
    player.pos.x -= 5;
    if (keyIsDown(32)) {
      player.attackpos.x = player.pos.x - 35.5;
    } else {
      player.attackpos.x = player.pos.x + 15.5;
    }
  }
  // right
  if (keyIsDown(68)&&player.pos.x <= windowWidth - 50) {
    player.pos.x += 5;
    if (keyIsDown(32)) {
      player.attackpos.x = player.pos.x + 60;
    } else {
      player.attackpos.x = player.pos.x + 15.5;
    }
  }

  // jump = w
    // up
    if (keyIsDown(87) && player.pos.y >= ground) {
    velocity = -25;
    }
    // fall
    else {
      velocity += gravity;
    }
    // hit
    if (attack=true && player.attackpos.x + 50 < vxa + 50 && player.attackpos.x + 50 > vxa && player.attackpos.y < vya + 100 && player.attackpos.y > vya) {
      vxa = random(0, 900);
      vya = random(0, 600);
    }
    if (player.pos.y> ground){
      player.pos.y = ground;
    }

  }
