var MMRunner = MMRunner || {}

MMRunner.Platform = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'platform4');
  this.game.physics.arcade.enable(this);
  this.anchor.setTo(0.5);
  this.scale.setTo(2,1);
  this.body.immovable = true;
}

MMRunner.Platform.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Platform.prototype.constructor = MMRunner.Platform;

MMRunner.Platform.prototype.update = function(){
this.body.velocity.x = -50;
  if(this.body.x <= -200){
    this.kill();
  }

}
