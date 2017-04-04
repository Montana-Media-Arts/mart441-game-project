var pxa = 0;
var pxb = 50;
var pya = 600;
var pyb = 100;

//fist
var fx = 0;
var fy = 650;
var fxb = 50;
var fyb = 15;

var vxa = 650;
var vxb = 50;
var vya = 600;
var vyb = 100;

function setup() {
    createCanvas(1000, 700);

}

function draw() {
    background('blue');
    fill('orange');
    rect(vxa, vya, vxb, vyb);

    if (keyIsDown(LEFT_ARROW)) {
        pxa -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        pxa += 5;
    }
    if (keyIsDown(UP_ARROW) && pya >= 450) {
        pya -= 5;
    } else if (pya < 600) {
        pya += 5;
    }

    //punch
    if (keyIsDown(83)) {
        fx = pxa + 50;
    } else {
        fx = pxa;
    }
    fill('red');
    rect(pxa, pya, pxb, pyb);
    rect(fx, pya + 30, fxb, fyb);


    //hit
    if (keyIsDown(83) && fx + 50 < vxa + 50 && fx + 50 > vxa && fy < vya + 100 && fy > vya) {
        vxa = random(0, 900);
        vya = random(0, 600);
    }

}

function keyPressed() {
    if (keyCode === UP_ARROW && pya >= 450) {
        pya -= 5;
    } else if (pya < 600) {
        pya += 5;
    }

}
