var MMRunner = MMRunner || {}

MMRunner.Badguy = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'badGuy');
  this.anchor.setTo(0.5);
  this.scale.setTo(3, 3);
  this.game.physics.arcade.enable(this);
  // this.enableBody = true;
  this.body.velocity.x = -250;
  this.animations.add('fly', [0,1],40, true);
  this.animations.play('fly');
}

MMRunner.Badguy.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Badguy.prototype.constructor = MMRunner.Badguy;

MMRunner.Badguy.prototype.update = function(){
  if(this.body.x <= -20){
    this.kill();
  }
}
