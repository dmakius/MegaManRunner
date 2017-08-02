var MMRunner = MMRunner || {}

MMRunner.Badguy = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'badGuy1');
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  this.game.physics.arcade.enable(this);
  // this.enableBody = true;
  this.body.velocity.x = -100;
  this.animations.add('fly', [0,1,2,3,4,5],4, true);
  this.animations.play('fly');
}

MMRunner.Badguy.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Badguy.prototype.constructor = MMRunner.Badguy;

MMRunner.Badguy.prototype.yHolder = 0;
MMRunner.Badguy.prototype.update = function(){
  // this.yHolder =  this.yHolder + 0.05;
  // this.body.velocity.y = Math.sin(this.yHolder) * 200;

  if(this.body.x <= -20){
    this.kill();
  }
}
