/* jshint esversion: 6 */

class OtherPlayer {
    constructor() {
        // Foot not head
        this.runidx = 5;
        this.runidy = 0;
        this.runipos = [95, 190, 285, 380, 475, 570, 665, 760, /*jumps*/ 855, 0];
        this.runrate = 5;
        this.playervis = oppvis;


        this.pos = createVector(800 / 2, 600 - 100);
        this.attackpos = createVector(this.pos.x, this.pos.y);
        this.attacksize = {
            w: 25,
            h: 25
        };

        this.maxSpeed = 10;
        this.gravity = 1;
        this.ground = 600 - 100;
        this.velocity = 0;


        // size should be 0-100
        this.size = 100;

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
    // Movement translator?


    frame() {
        this.display();
    }

    display() {
        // Draw the this
        push();

        // Position the this
        translate(this.pos.x, this.pos.y);
        image(this.playervis, 0, 0, 95, 73, this.runipos[this.runidx], this.runidy, 95, 73);

        // For Other Player Health- purely graphical right now
          // Health Lost- must be positioned here.
          fill('black');
          healthHolder2 = rect(15, -13, 66, 9);

          fill('red');
          healthHolder = rect(15, -13, this.healthLeft, 9);
          if (ophealthLeft <= 0) {
            ophealthLeft = 0;
          }

        pop();

    }

}