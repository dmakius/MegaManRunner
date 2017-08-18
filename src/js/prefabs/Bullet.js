var MMRunner = MMRunner || {}

MMRunner.Bullet = function(game, x , y, forward){
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  this.anchor.setTo(0.5);
  this.scale.setTo(2, 1.5);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  if(forward){
  	//console.log("shotting forward");
 	this.body.velocity.x = 250;
  }else{
  	//console.log("shotting backword");
  	this.body.velocity.x = -250;
  }
 
}

MMRunner.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Bullet.prototype.constructor = MMRunner.Bullet;

MMRunner.Bullet.prototype.update = function(){

}
