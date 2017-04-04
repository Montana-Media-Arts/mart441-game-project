function Player() {
    //foot not head
    this.pos = createVector(windowWidth / 2,0);
this.size = { w:50 , h:100};
this.attackpos = createVector(this.pos.x, this.size.h * 0.66);
this.attacksize = {w:10 , h:10};
 this.color = ['red','orange','green','pink'];
}

Player.prototype.draw=function(){
    
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    rect(this.attackpos.x, this.attackpos.y, this.attacksize.w, this.attacksize.h);
}
