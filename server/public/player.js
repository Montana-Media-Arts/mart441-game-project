function Player(pos,color) {
    //foot not head
this.pos = createVector(windowWidth/2 ,windowHeight - 100);
this.size = { w:50 , h:100};
this.attackpos = createVector(this.pos.x, this.pos.y);
this.attacksize = {w:25 , h:25};
this.isjumping = false;
this.color = ['red','goldenrod','green','salmon'];
this.vxa = 650;
this.vxb = 50;
this.vya = 600;
this.vyb = 100;
this.gravity = 1;
this.ground;
this.velocity = 0;
}


Player.prototype.show = function(){
    fill(this.color[0]);
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    fill(this.color[0]);
    rect(this.attackpos.x, this.attackpos.y, this.attacksize.w, this.attacksize.h);
    player.prototype.move = function(){
      //movements
      this.attackpos.x = this.pos.x + 15.5;

      this.attackpos.y = this.pos.y + 20;
      this.pos.y += this.velocity + this.gravity;
      if (this.pos.y >= this.ground) {
        this.gravity = 0;
        this.velocity = 0;
      }else {
        this.gravity = 1;
      }
      // movement
      // left
      if (keyIsDown(65) && this.pos.x >= 0) {
        this.pos.x -= 5;
        if (keyIsDown(32)) {
          this.attackpos.x = this.pos.x - 35.5;
        } else {
          this.attackpos.x = this.pos.x + 15.5;
        }
      }
      // right
      if (keyIsDown(68) && this.pos.x <= windowWidth - 50) {
        this.pos.x += 5;
        if (keyIsDown(32)) {
          this.attackpos.x = this.pos.x + 60;
        } else {
          this.attackpos.x = this.pos.x + 15.5;
        }
      }

      // jump = w
        // up
        if (keyIsDown(87) && this.pos.y >= this.ground) {
        this.velocity = -25;
        }
        // fall
        else {
          this.velocity += this.gravity;
        }
        // hit
        if (attack == true && this.attackpos.x + 50 < this.vxa + 50 && this.attackpos.x + 50 > this.vxa && this.attackpos.y < this.vya + 100 && this.attackpos.y > this.vya) {
          this.vxa = random(0, 900);
          this.vya = random(0, 600);
        }
        if (this.pos.y> this.ground){
          this.pos.y = this.ground;
        }

    }

};


Player.prototype.startjump = function () {
  this.isjumping = true;
};

Player.prototype.stopjump = function () {
this.isjumping = false;
};
