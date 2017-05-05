/* jshint esversion: 6 */

class ClientPlayer {

    constructor(playervis, myIdx) {
//keycodes
//w=87 a=65 s=83 d=68
this.leftKey=65
this.rightKey=68
this.jumpKey=87
this.botKey=83

//gravity
this.leftGrav=false
this.rightGrav=false
this.topGrav=false
this.botGrav=true

        // Player skin
        this.runidx = 5;
        this.runidy = 0;
        this.runipos = [95, 190, 285, 380, 475, 570, 665, 760, /*jumps*/ 855, 0];
        this.runrate = 5;
        this.playervis = playervis;


        // Unique player ID
        this.idx = myIdx;

        // Foot not head
        this.pos = createVector(800 / 2, 500);
        this.attackpos = createVector(this.pos.x, this.pos.y);
        this.attacksize = {
            w: 25,
            h: 25
        };
        this.isjumping = false;
        this.maxSpeed = 10;
        this.gravity = {
            x: 0,
            y: 1,
            magnitude: function() {
                return sqrt(x * x + y * y)
            }
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.direction = 0;
        this.playerScore = 0;
        this.punchTimer = 0;
        this.canPunch = true;
        this.hitTimer = 0;
        this.pwidth = 36;
        this.pheight = 73;
        this.canMove = true;
        this.cantMove = false;
        this.groundSet = false;
        this.ground = 575 - this.pheight;
        this.absoluteGround = this.ground;
        this.aPressed = false;
        this.dPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.grounded = true;

        // Size should be 0-100
        this.size = 95;


        this.hitsLanded = 0;

        this.emitData = {
            idx: this.idx,
            pos: {
                x: 0,
                y: 0
            },
            fistPos: {
                x: 0,
                y: 0
            },
            vel: {
                x: 0,
                y: 0
            },
            size: this.size,
            hitsLanded: 0,
            gravity: {
                x: 0,
                y: 0
            }
        };
    }

    frame(othersIdx, otherPlayers) {
        healthHolder;
        healthHolder2;
        this.move();
        this.runtimer();
        this.display();
        this.emit();
        this.hitdetect(othersIdx, otherPlayers);
        this.score(othersIdx, otherPlayers);
    }



    display() {
        // Draw the player
        push();
        translate(this.pos.x + this.size / 2, this.pos.y + this.size / 2);

        if (this.gravity.y == -1)
            rotate(PI);
        else if (this.gravity.x == 1)
            rotate(3 * PI / 2);
        else if (this.gravity.x == -1)
            rotate(PI / 2);
        // Position the player
        // Player Sprites
        if (this.gravity.y == -1)
            scale(-1, 1);
        image(this.playervis, -this.size / 2, -this.size / 2, 95, 73, this.runipos[this.runidx], this.runidy, 95, 73);

        // For Player Health
        // Health Lost- must be positioned here.
        fill('black');
        healthHolder2 = rect(15 - this.size / 2, -13 - this.size / 2, 66, 9);

        // Remaining Health
        fill('lime');
        healthHolder = rect(15 - this.size / 2, -13 - this.size / 2, healthLeft, 9);

        // Handles remaining Health/Player Death
        if (healthLeft <= 0) {
            healthLeft = 0;

            // find a better way to kill the player
            fill('white');
            textSize(15);
            text("YOU DIED", 15 - this.size / 2, -40 - this.size / 2, 100, 100);

            // Score alert- to send initials to text document later
            // needs work
            // prompt("YOU DIED! YOUR SCORE WAS- " + this.playerScore + " REFRESH TO TRY AGAIN", "Submit Score? Initials Here!");

            // Can no longer inflict damage- prevents ghost damage
            this.canPunch = false;
        }
        pop();
    }


    // For frames
    runtimer() {
        /*empty for now*/
    }



    move() {
        // Left-A
        if (keyIsDown(this.leftKey)) {
            this.aPressed = true;
            if (!keyIsDown(this.jumpKey) && frameCount % this.runrate == 0)
                this.runidx = (this.runidx + 1) % 4;
            if (this.gravity.x == -1)
                this.velocity.y = -5;
            else if (this.gravity.x == 1)
                this.velocity.y = 5;
            else if (this.gravity.y == 1)
                this.velocity.x = -5;
            else if (this.gravity.y == -1)
                this.velocity.x = -5;
            this.direction = 1;
        } else if (!keyIsDown(this.leftKey) && this.aPressed) {
            this.aPressed = false;
            if (this.gravity.x == 0)
                this.velocity.x = 0;
            else if (this.gravity.y == 0)
                this.velocity.y = 0;
        }

        // Right-D
        else if (keyIsDown(this.rightKey)) {
            this.dPressed = true;
            if (!keyIsDown(this.jumpKey) && frameCount % this.runrate == 0)
                this.runidx = 4 + (this.runidx + 1) % 4;
            if (this.gravity.x == -1)
                this.velocity.y = 5;
            else if (this.gravity.x == 1)
                this.velocity.y = -5;
            else if (this.gravity.y == 1)
                this.velocity.x = 5;
            else if (this.gravity.y == -1)
                this.velocity.x = 5;
            this.direction = 0;
        } else if (!keyIsDown(this.rightKey) && this.dPressed) {
            this.dPressed = false;
            if (this.gravity.x == 0)
                this.velocity.x = 0;
            else if (this.gravity.y == 0)
                this.velocity.y = 0;
        }

        // Punching-Space bar
        this.attackpos.x = this.pos.x + 15.5;
        this.attackpos.y = this.pos.y + 20;

        if (this.punchTimer >= 3 * frameRate()) {
            this.canPunch = false;
            this.punchTimer = 0;
            this.runidy = 0;
        } else if (keyIsDown(32) && this.direction == 1 && this.canPunch) {
            this.attackpos.x = this.pos.x - 35.5;
            this.punchTimer++;
            this.runidy = 73;
        } else if (keyIsDown(32) && this.direction == 0 && this.canPunch) {
            this.attackpos.x = this.pos.x + 60;
            this.punchTimer++;
            this.runidy = 73;
        } else {
            this.attackpos.x = this.pos.x + 15.5;
            if (!keyIsDown(32)) {
                this.runidy = 0;
                this.canPunch = true;
                // console.log(this.canPunch);
            }
        }

        // visuals
        if (this.isjumping = true && keyIsDown(87) && this.direction == 0)
            this.runidx = 8;
        if (this.isjumping = true && keyIsDown(87) && this.direction == 1)
            this.runidx = 9;


        //Jump
        if (keyIsDown(this.jumpKey) && this.grounded) {
            this.grounded = false;
            if (this.gravity.y == 1)
                this.velocity.y = -26;
            if (this.gravity.y == -1)
                this.velocity.y = 26;
            if (this.gravity.x == 1)
                this.velocity.x = -26;
            if (this.gravity.x == -1)
                this.velocity.x = 26;
        } else {
            // Fall
            this.velocity.y += this.gravity.y;
            this.velocity.x += this.gravity.x;
        }


        //Collisions
        var col = false;
        for (var i = 0; i < platformrect.length; i++)
            if (platformrect[i].x < this.pos.x + this.velocity.x + this.pwidth &&
                platformrect[i].x + platformrect[i].width > this.pos.x + this.velocity.x &&
                platformrect[i].y < this.pos.y + this.velocity.y + this.pheight &&
                platformrect[i].height + platformrect[i].y > this.pos.y + this.velocity.y) {

                //Horizontal collision
                if (platformrect[i].x < this.pos.x + this.pwidth &&
                    platformrect[i].x < this.pos.x + 10) {
                    if (this.gravity.y == 0) {
                        this.grounded = true;
                        this.velocity.x = 0;
                    } else
                        this.velocity.y = 0;
                    col = true;
                }
                //Vertical Collision
                if (platformrect[i].x < this.pos.x + this.pwidth &&
                    platformrect[i].x < this.pos.x + 10) {
                    if (this.gravity.x == 0) {
                        this.grounded = true;
                        this.velocity.y = 0;
                    } else
                        this.velocity.x = 0;
                    col = true;
                }
            }

        // Updates position of the Knight
        this.pos.y += this.velocity.y;
        this.pos.x += this.velocity.x;

        //Outside Collisions (edges of map)
        if (this.pos.y >= this.ground) {
            this.grounded = true;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.pos.y = this.ground;
        }

        if (this.pos.y <= 0) {
            this.grounded = true;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.pos.y = 0;
        }

        if (this.pos.x >= width - this.size) {
            this.grounded = true;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.pos.x = width - this.size + 1;
        }

        if (this.pos.x <= 0) {
            this.grounded = true;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.pos.x = 3;
        }

        //Gravity

        //resets controls
if (this.leftGrav==true) {
  this.rightGrav=false
  this.topGrav=false
  this.botGrav=false
  this.leftKey=87
  this.rightKey=83
  this.jumpKey=68
}
if (this.rightGrav==true) {
  this.leftGrav=false
  this.topGrav=false
  this.botGrav=false
  this.leftKey=83
  this.rightKey=87
  this.jumpKey=65
}
if (  this.topGrav==true) {
  this.leftGrav=false
  this.rightGrav=false
  this.botGrav=false
  this.leftKey=65
  this.rightKey=68
  this.jumpKey=83
}
if (this.botGrav==true) {
  this.leftGrav=false
  this.rightGrav=false
  this.topGrav=false
  this.leftKey=65
  this.rightKey=68
  this.jumpKey=87
}




        //top up
        if (keyIsDown(38) && !this.upPressed) {
          this.topGrav=true
            this.gravity.y = -1;
            this.gravity.x = 0;
            this.upPressed = true;
        } else if (!keyIsDown(38))
            this.upPressed = false;
//down
        if (keyIsDown(40) && !this.downPressed) {
          this.botGrav=true
            this.gravity.y = 1;
            this.gravity.x = 0;
            this.downPressed = true;
        } else if (!keyIsDown(40))
            this.downPressed = false;
//left
        if (keyIsDown(37) && !this.leftPressed) {
          this.leftGrav=true
            this.gravity.x = -1;
            this.gravity.y = 0;
            this.leftPressed = true;
        } else if (!keyIsDown(38))
            this.leftPressed = false;
//right
        if (keyIsDown(39) && !this.rightPressed) {
          this.rightGrav=true
            this.gravity.x = 1;
            this.gravity.y = 0;
            this.rightPressed = true;
        } else if (!keyIsDown(40))
            this.rightPressed = false;
    }

    hitdetect(othersIdx, otherPlayers) {
        for (var i = 0; i < othersIdx.length; i++) {
            var op = otherPlayers[othersIdx[i]];
            if (op) {
                if (
                    this.attackpos.x + this.attacksize.w * 0.5 >= op.pos.x &&
                    this.attackpos.x + this.attacksize.w * 0.5 <= (op.pos.x + this.size * 0.5) &&
                    this.attackpos.y >= op.pos.y &&
                    this.attackpos.y <= (op.pos.y + this.size) &&
                    keyIsDown(32) &&
                    this.canPunch
                ) {
                    //ophealthLeft-=22
                    this.hitsLanded++;
                    this.canPunch = false;
                    console.log('player hit', this.hitsLanded);
                    socket.emit('player hit', othersIdx[i]);
                } else if (!this.canPunch) {
                    this.hitTimer++;
                }
            }
        }
    }



    // Score Stuff- handles player score
    score() {
        if (this.playerScore == 0) {
            this.playerScore = this.hitsLanded;
        } else {
            this.playerScore = this.hitsLanded;
        }

        // For Player score
        fill(255);
        textSize(15);
        scoreHolder = text(scoreString, 30, 30, 100, 100) + text(this.playerScore, 90, 30, 100, 100);

        // console.log(this.playerScore);
    }



    emit() {
        // Update values
        this.emitData.pos.x = this.pos.x;
        this.emitData.pos.y = this.pos.y;
        this.emitData.healthLeft = healthLeft;
        this.emitData.runidx = this.runidx;
        this.emitData.runidy = this.runidy;
        this.emitData.fistPos.x = this.attackpos.x;
        this.emitData.fistPos.y = this.attackpos.y;
        this.emitData.hitsLanded = this.hitsLanded;
        this.emitData.playerScore = this.playerScore;
        this.emitData.gravity = this.gravity;
        socket.emit('player', this.emitData);
    }


    setIdx(idx) {
        this.idx = idx;
        this.emitData.idx = idx;
        console.log("My Idx is: " + me.idx);
    }

}
