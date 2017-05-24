var MMRunner = MMRunner || {}

MMRunner.Bullet = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  this.anchor.setTo(0.5);
  this.scale.setTo(1.5, 1);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  this.body.velocity.x = 250;
}

MMRunner.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Bullet.prototype.constructor = MMRunner.Bullet;

MMRunner.Bullet.prototype.update = function(){

}
