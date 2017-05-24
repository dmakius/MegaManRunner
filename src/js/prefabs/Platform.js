var MMRunner = MMRunner || {}

MMRunner.Platform = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'platform');
  this.enableBody = true;
  this.scale.setTo(4,1);
}

MMRunner.Platform.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Platform.prototype.constructor = MMRunner.Platform;

MMRunner.Platform.prototype.update = function(){
  this.body.velocity.x = -50;
  this.body.immovable = true;
  if(this.body.x <= -200){
    this.kill();
  }

}
