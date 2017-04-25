/* jshint esversion: 6 */

class OtherPlayer {
    constructor() {
        // Foot not head
        this.pos = createVector(800 / 2, 600 - 100);
        this.attackpos = createVector(this.pos.x, this.pos.y);
        this.attackvel = 0;
        this.attackacc = 10;
        this.attacksize = {
            w: 25,
            h: 25
        };
        this.isjumping = false;
        this.maxSpeed = 10;
        this.gravity = 1;
        this.ground = 600 - 100;
        this.velocity = 0;
        this.isattacking = false;

        // size should be 0-100
        this.size = 100;

        // colors for Players
        this.color = ['red', 'goldenrod', 'green', 'salmon', 'blue']

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
            size: this.size
        };
    }

    frame() {
        this.display();
    }

    display() {
        // Draw the this
        push();
        // Position the this
        translate(this.pos.x, this.pos.y);
        fill(this.color[4]);
        rect(0, 0, this.size / 2, this.size);
        pop();

        push();
        translate(this.attackpos.x, this.attackpos.y);
        fill(this.color[4]);
        rect(0, 0, this.attacksize.w, this.attacksize.h);
        pop();

    }

}
