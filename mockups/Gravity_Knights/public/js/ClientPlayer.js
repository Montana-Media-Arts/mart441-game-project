/* jshint esversion: 6 */

class ClientPlayer {

    constructor( /*img*/ ) {
        // For implementing sprites
        // this.img = img;

        // Unique player ID
        this.idx = null;

        // Foot not head
        this.pos = createVector(800 / 2, 700 - 100);
        this.attackpos = createVector(this.pos.x, this.pos.y);
        this.attacksize = {
            w: 25,
            h: 25
        };
        this.isjumping = false;
        this.maxSpeed = 10;
        this.gravity = 1;
        this.ground = 700 - 100;
        this.velocity = 0;
        this.direction = 0;
        this.punchTimer = 0;
        this.canPunch = true;
        this.canHit = true;
        this.hitTimer = 0;


        // size should be 0-100
        this.size = 100;

        // colors for Players
        this.color = ['red', 'goldenrod', 'green', 'salmon', 'blue']

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
            hitsLanded: 0
        };
    }

    frame(othersIdx, otherPlayers) {
        this.move();
        this.display();
        this.emit();
        this.hitdetect(othersIdx, otherPlayers);
    }

    display() {
        // Draw the this
        push();
        // Position the this
        translate(this.pos.x, this.pos.y);
        fill(this.color[0]);
        rect(0, 0, this.size / 2, this.size);
        pop();

        push();
        translate(this.attackpos.x, this.attackpos.y);
        fill(this.color[0]);
        rect(0, 0, this.attacksize.w, this.attacksize.h);
        pop();
    }


    move() {
        this.attackpos.x = this.pos.x + 15.5;
        this.attackpos.y = this.pos.y + 20;
        this.pos.y += this.velocity + this.gravity;
        if (this.pos.y >= this.ground) {
            this.gravity = 0;
            this.velocity = 0;
        } else {
            this.gravity = 1;
        }
        // Left-A
        if (keyIsDown(65) && this.pos.x >= 0) {
            this.pos.x -= 5;
            this.direction = 1;
        }
        // Right-D
        else if (keyIsDown(68) && this.pos.x <= 750) {
            this.pos.x += 5;
            this.direction = 0;
        }
        // Punching-Space bar
        if (this.punchTimer >= 3 * frameRate()) {
            this.canPunch = false;
            this.punchTimer = 0;
        } else if (keyIsDown(32) && this.direction == 1 && this.canPunch) {
            this.attackpos.x = this.pos.x - 35.5;
            this.punchTimer++;
        } else if (keyIsDown(32) && this.direction == 0 && this.canPunch) {
            this.attackpos.x = this.pos.x + 60;
            this.punchTimer++;
        } else {
            this.attackpos.x = this.pos.x + 15.5;
            if (!keyIsDown(32)) {
                this.canPunch = true;
            }
        }

        // Jump = w
        // Up
        if (keyIsDown(87) && this.pos.y >= this.ground) {
            this.velocity = -25;
        }
        // Fall
        else {
            this.velocity += this.gravity;
        }
        if (this.pos.y > this.ground) {
            this.pos.y = this.ground;
        }
    }

    hitdetect(othersIdx, otherPlayers) {
        for (var i = 0; i < othersIdx.length; i++) {
            var op = otherPlayers[othersIdx[i]];
            if (op) {
                if (this.hitTimer >= frameRate()) {
                    this.canHit = true;
                    this.hitTimer = 0;
                } else if (
                    this.attackpos.x + this.attacksize.w*0.5 >= op.pos.x &&
                    this.attackpos.x + this.attacksize.w*0.5 <= (op.pos.x + this.size * 0.5) &&
                    this.attackpos.y >= op.pos.y &&
                    this.attackpos.y <= (op.pos.y + this.size) &&
                    keyIsDown(32) &&
                    this.canHit
                ) {
                    this.hitsLanded++;
                    this.canHit = false;
                    console.log('player hit', this.hitsLanded);
                    socket.emit('player hit', othersIdx[i]);
                } else if (!this.canHit) {
                    this.hitTimer++;
                }
            }
        }
    }


    emit() {
        // Update values
        this.emitData.pos.x = this.pos.x;
        this.emitData.pos.y = this.pos.y;
        this.emitData.fistPos.x = this.attackpos.x;
        this.emitData.fistPos.y = this.attackpos.y;
        this.emitData.hitsLanded = this.hitsLanded;
        socket.emit('player', this.emitData);
    }


    setIdx(idx) {
        this.idx = idx;
        this.emitData.idx = idx;
        console.log("My Idx is: " + me.idx);
    }

}
