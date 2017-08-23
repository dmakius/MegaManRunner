var MMRunner = MMRunner || {}

MMRunner.SmallHealthUp = function(game, x , y, forward){
  Phaser.Sprite.call(this, game, x, y, 'smallHealthUp');
  this.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  this.body.gravity.y = 250;

  this.animations.add('blink', [0,1],4, true);
  this.animations.play('blink');
}

MMRunner.SmallHealthUp.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.SmallHealthUp.prototype.constructor = MMRunner.SmallHealthUp;


