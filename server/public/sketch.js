// for testing purposes
var r = 0;

var plyr = [];

var vxa = 650;
var vxb = 50;
var vya = 600;
var vyb = 100;

// jump
var falling = false;
var jump = false;
var landed = true;
var w_down = false;
var ground;

function setup() {
  createCanvas(windowWidth, windowHeight);
  plyr = new Player();
  ground = windowHeight-100;
}



function draw() {
  background('blue');
  fill('orange');
  rect(vxa, vya, vxb, vyb);

  plyr.draw();

  if (keyIsDown(65)) {
    plyr.pos.x -= 5;
  }
  if (keyIsDown(68)) {
    plyr.pos.x += 5;
  }


  // punch
  if (keyIsDown(83)) {
    plyr.attackpos.x = plyr.pos.x + 50;
  } else {
    plyr.attackpos.x = plyr.pos.x;
  }

  // jump
  // startjump
  if (w_down & landed) {
    landed = false;
    plyr.startjump();
    jump = true;
  }
  if (w_down & jump & plyr.pos.y>=ground-200) {
    plyr.pos.y -= 25;

  } else {
    jump = false;
}
    if(plyr.pos.y<ground){
      plyr.pos.y += 25;
    } else if(!w_down) {
      if (!landed) {
        landed = true;
        plyr.stopjump();
      }
    }

  // R testing 
    if (keyIsDown(82)){
      plyr.pos.y--
    }
    // hit
    if (attack=true && plyr.attackpos.x + 50 < vxa + 50 && plyr.attackpos.x + 50 > vxa && plyr.attackpos.y < vya + 100 && plyr.attackpos.y > vya) {
      vxa = random(0, 900);
      vya = random(0, 600);
    }

  }


  // fast type keys
  // jump
  function keyTyped() {
    if (key==='w') {
      w_down = true;
    }
    if (key==='d') {
      d_down = true;
    }
  }

  function keyReleased() {
    a_down = false;
    d_down = false;
  }

 console.log(w_down)
