function otherPlayer() {
    //foot not head
    this.pos = createVector(windowWidth/2 ,windowHeight - 100);
this.size = { w:50 , h:100};
this.attackpos = createVector(this.pos.x, this.pos.y/.5);
this.attacksize = {w:10 , h:10};
this.isjumping = false;
 this.color = ['red','orange','green','pink'];


}

otherPlayer.prototype.draw=function(){
    fill('green')
    rect(this.attackpos.x, this.attackpos.y, this.attacksize.w, this.attacksize.h);
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
};


otherPlayer.prototype.startjump = function () {
  this.isjumping = true;
};

otherPlayer.prototype.stopjump = function () {
this.isjumping = false;
};
