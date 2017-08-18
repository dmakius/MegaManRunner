var MMRunner = MMRunner || {}

MMRunner.Explosion = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'explosion1');
  this.anchor.setTo(0.5);
  this.scale.setTo(2, 1.5);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  this.animations.add('explosion', [1,2,3], 8, true);
  this.animations.play('explosion');
  this.exlosionTime = this.game.time.now + 1000;
}

MMRunner.Explosion.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Explosion.prototype.constructor = MMRunner.Explosion;
MMRunner.Explosion.prototype.killTime = 0;
MMRunner.Explosion.prototype.update = function(){
    this.killTime ++;
    console.log("explosion die");

}
