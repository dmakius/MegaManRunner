var MMRunner = MMRunner || {}

MMRunner.Bullet = function(game, x , y, forward){
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  this.anchor.setTo(0.5);
  this.scale.setTo(2, 1.5);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  if(forward){
 	  this.body.velocity.x = 250;
  }else{
  	this.body.velocity.x = -250;
  } 
}

MMRunner.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Bullet.prototype.constructor = MMRunner.Bullet;

MMRunner.Bullet.prototype.update = function(){
  if(this.body.x >= 700 || this.body.x <= -20){
    //console.log("bullet killed")
    this.destroy();
  }
}
MMRunner.Bullet.prototype.deflect = function(){
 this.body.velocity.x *= -1;
 this.body.velocity.x += -300;
 
}
