function Player(pos,color) {
    //foot not head
    this.pos = createVector(windowWidth/2 ,windowHeight - 100);
this.size = { w:50 , h:100};
this.attackpos = createVector(this.pos.x, this.pos.y);
this.attacksize = {w:25 , h:25};
this.isjumping = false;
this.color = ['red','goldenrod','green','salmon'];
}

Player.prototype.draw = function(){
    fill(this.color[0]);
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    fill(this.color[0]);
    rect(this.attackpos.x, this.attackpos.y, this.attacksize.w, this.attacksize.h);
};


Player.prototype.startjump = function () {
  this.isjumping = true;
};

Player.prototype.stopjump = function () {
this.isjumping = false;
};
