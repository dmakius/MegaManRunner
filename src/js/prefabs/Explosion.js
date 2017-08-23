var MMRunner = MMRunner || {}

MMRunner.Explosion = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'explosion3');
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  this.animations.add('explosion3', [0,1,2], 12, true);
  this.animations.play('explosion3');
  this.exlosionTime = this.game.time.now + 1000;
}

MMRunner.Explosion.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Explosion.prototype.constructor = MMRunner.Explosion;
MMRunner.Explosion.prototype.killTime = 0;
MMRunner.Explosion.prototype.update = function(){
    this.killTime ++;
    if(this.killTime >= 12){
      this.destroy();
    }
}
