/* jshint esversion: 6 */

class ClientPlayer {
	constructor( /*img*/ ) {
		// For implementing sprites
		// this.img = img;
		// Unique player ID
		this.idx = null;

		// Foot not head
		this.pos = createVector(800 / 2, 600 - 100);

		this.attackpos = createVector(this.pos.x, this.pos.y);
		this.attacksize = {
			w: 25,
			h: 25
		};
		this.isjumping = false;
		this.maxSpeed = 10;
		this.gravity = -1;
		this.ground = 600 - 100;
		this.velocity = 0;
		this.isattacking = false;
		this.attackvel = 0;
		this.attackacc = 10;

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

	frame(othersIdx,otherPlayers) {
		this.move();
		this.display();
		this.emit();
		// this.attackdetect(othersIdx,otherPlayers);
		this.hitdetect(othersIdx,otherPlayers);
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
		this.attackpos.x += this.attackvel;
		this.pos.y += this.velocity + this.gravity;
		if (this.pos.y >= this.ground) {
			this.gravity = 0;
			this.velocity = 0;
		} else {
			this.gravity = -1;
		}

		// //////////////
		// if (keyIsDown(87) && this.pos.y >= this.ground) {
		// 	this.velocity = -25;
		// }
		// // Fall
		// else {
		// 	this.velocity += this.gravity;
		// }
		// 	if (this.pos.y > this.ground) {
		// 	this.pos.y = this.ground;
		// }
		// //////////
		// Left-WASD
		if (keyIsDown(65) && this.pos.x >= 0) {
			this.pos.x -= 5;
			if (this.attackpos.x >= this.pos.x + 15.5){
				if (keyIsDown(32)) {
					this.attackvel = -100;
				}
				else {
					this.attackvel = 0;
				}
			}
			else{
				this.attackvel += this.attackacc;
			}
			// else {
			// 	this.attackpos.x = this.pos.x + 15.5;
			// }
		}
	// else{
	// 		this.attackpos.x = this.pos.x + 15.5;
	// }
		// Right
		if (keyIsDown(68) && this.pos.x <= 800 - 50) {
			this.pos.x += 5;
			if (this.attackpos.x <= this.pos.x +15.5){
				if (keyIsDown(32)) {
					this.attackvel = 100;
				}
				else {
					this.attackvel = 0;
				}
			}
			else{
					this.attackvel += -1*this.attackacc;
				}
			}
			// else{
			// 	this.attackpos.x = this.pos.x + 15.5;
			// }

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
// Commented out for now
	// attackdetect(othersIdx,otherPlayers){
	// 	for (var i = 0; i < othersIdx.length; i++) {
	// 		var op = otherPlayers[othersIdx[i]]
	// 		if (op) {
	// 			if ( this.attackpos.x>=op.pos.x && this.attackpos.x<=op.pos.x+50 && this.attackpos.y>=op.pos.y && this.attackpos.y<=op.pos.y+100 && keyIsDown(32)) {
	// 				op.pos.y-=1000;
	// 				console.log('opponent hit')
	// 			}
	// 		}
	// 	}
	// }
	hitdetect(othersIdx,otherPlayers){
		for (var i = 0; i < othersIdx.length; i++) {
			var op = otherPlayers[othersIdx[i]]
			if (op) {
				if ( op.attackpos.x>=this.pos.x && op.attackpos.x<=this.pos.x+50 && op.attackpos.y>=this.pos.y && op.attackpos.y<=this.pos.y+100 && keyIsDown(32) && (this.attackvel == 10 || this.attackvel == -10)) {
					this.hitsLanded++;
					console.log('player hit', this.hitsLanded);
					socket.emit('player hit', othersIdx[i]);
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
