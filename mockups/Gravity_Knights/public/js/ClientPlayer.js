/* jshint esversion: 6 */

class ClientPlayer {

  constructor(playervis, myIdx) {
    // Player skin
    this.runidx = 5;
    this.runidy = 0;
    this.runipos = [95, 190, 285, 380, 475, 570, 665, 760, /*jumps*/ 855, 0];
    this.runrate = 5;
    this.playervis = playervis;


    // Unique player ID
    this.idx = myIdx;

    // Foot not head
    this.pos = createVector(800 / 2, 600 - 100);
    this.attackpos = createVector(this.pos.x, this.pos.y);
    this.attacksize = {
      w: 25,
      h: 25
    };
    this.isjumping = false;
    this.maxSpeed = 10;
    this.gravity = 1;
    this.velocity = 0;
    this.direction = 0;
    this.punchTimer = 0;
    this.canPunch = true;
    this.canPunch = true;
    this.hitTimer = 0;
    this.pwidth= 36;
    this.pheight= 73;
    this.canmove=true;
    this.ground = 575-this.pheight;

    // size should be 0-100
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
      hitsLanded: 0
    };
  }

  frame(othersIdx, otherPlayers) {
    this.move();
    this.runtimer();
    this.display();
    this.emit();
    this.hitdetect(othersIdx, otherPlayers);
  }

  display() {
    // Draw the this
    push();
    // Position the this
    translate(this.pos.x, this.pos.y);
    // image(this.playervis, this.runipos[this.runidx], this.runidy, 95, 73, 0, 0, 95, 73);
    image(this.playervis, 0, 0, 95, 73, this.runipos[this.runidx], this.runidy, 95, 73);
    pop();
  }

  runtimer() {
    /*empty for now*/
  }




  move() {

//if right arrow kes is pressed change player width for gravity and rotation of player
//    if (keyIsDown(37)) {
//      this.pwidth=95;
//}

//platforms
this.canmove=true;
for (var i = 0; i < platformrect.length; i++) {
  if (platformrect[i].x < this.pos.x + this.pwidth &&
    platformrect[i].x + platformrect[i].width > this.pos.x &&
    platformrect[i].y < this.pos.y + this.pheight &&
    platformrect[i].height + platformrect[i].y > this.pos.y) {
      this.canmove=false

    }
// console.log(this.canmove)
}





    // Left-A
    if (keyIsDown(65) && this.pos.x >= 3 && this.canmove) {
      if (!keyIsDown(87) && frameCount % this.runrate == 0) {
        this.runidx = (this.runidx + 1) % 4;
      }
      this.pos.x -= 5;
      this.direction = 1;
    }

    // Right-D
    else if (keyIsDown(68) && this.pos.x <= 740- this.pwidth && this.canmove) {
      if (!keyIsDown(87) && frameCount % this.runrate == 0) {
        this.runidx = 4 + (this.runidx + 1) % 4;

      }
      this.pos.x += 5;
      this.direction = 0;
    }

    // Punching-Space bar
    this.attackpos.x = this.pos.x + 15.5;
    this.attackpos.y = this.pos.y + 20;

    if (this.punchTimer >= 3 * frameRate()) {
      this.canPunch = false;
      this.punchTimer = 0;
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

    // Jump = W

    //visuals
    if (this.isjumping = true && keyIsDown(87) && this.direction == 0) {
      this.runidx = 8;
    }
    if (this.isjumping = true && keyIsDown(87) && this.direction == 1) {
      this.runidx = 9;
    }

    //movement
if (!this.canmove) {
  this.velocity = -this.velocity/5;
}

    if (keyIsDown(87) && this.pos.y >= this.ground ) {
      this.velocity = -26;
    }

    // Fall
    else {
      this.velocity += this.gravity;
    }

    // Fixes Player in ground glitch
    if (this.pos.y > this.ground) {
      this.pos.y = this.ground;
    }
    this.pos.y += this.velocity + this.gravity;
    if (this.pos.y >= this.ground || this.pos.y <= 276-this.pheight) {
      this.gravity = 0;
      this.velocity = 0;
    } else {
      this.gravity = 1;
    }
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



  emit() {
    // Update values
    this.emitData.pos.x = this.pos.x;
    this.emitData.pos.y = this.pos.y;

    this.emitData.runidx = this.runidx;
    this.emitData.runidy = this.runidy;
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
