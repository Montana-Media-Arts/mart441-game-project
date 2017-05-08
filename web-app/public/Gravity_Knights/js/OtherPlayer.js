/* jshint esversion: 6 */

class OtherPlayer {
    constructor() {
        // Foot not head
        this.runidx = 5;
        this.runidy = 0;
        this.runipos = [95, 190, 285, 380, 475, 570, 665, 760, /*jumps*/ 855, 0];
        this.runrate = 5;
        this.playerScore;


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
        this.gravity = 1;
        this.playervis = 0;

        // size should be 0-100
        this.size = 100;

        this.emitData = {
            playervis: this.playervis,
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
            gravity: {
                x: 0,
                y: 1
            }
        };
    }
    // Movement translator?


    frame() {
        this.display();
    }

    display() {
        // console.log("trying to rendering other player");
        if (this.playervis == 0) return;
        console.log(this.playervis);
        if (!this.sprite && !this.playervis) {
            this.sprite = loadImage(this.playervis);
        };
        // console.log("rendering other player");
        // Draw the otherplayer
        push();

        // Position the other player
        translate(this.pos.x + this.size / 2, this.pos.y + this.size / 2);

        if (this.gravity.y == -1)
            rotate(PI);
        else if (this.gravity.x == 1)
            rotate(3 * PI / 2);
        else if (this.gravity.x == -1)
            rotate(PI / 2);

        image(this.sprite, -this.size / 2, -this.size / 2, 95, 73, this.runipos[this.runidx], this.runidy, 95, 73);
        //if (this.playerScore == 0){
        //  oppvis = null;
        // }

        // For Other Player Health- purely graphical right now
        // Health Lost- must be positioned here.
        fill('black');
        healthHolder2 = rect(15 - this.size / 2, -13 - this.size / 2, 66, 9);

        fill('red');
        healthHolder = rect(15 - this.size / 2, -13 - this.size / 2, this.healthLeft, 9);
        if (ophealthLeft <= 0) {
            ophealthLeft = 0;
        }

        pop();

    }

}
