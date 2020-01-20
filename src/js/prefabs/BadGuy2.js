var MMRunner = MMRunner || {}

MMRunner.Badguy2 = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'badGuy2');
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  this.health = 10;
  this.enableBody = true;
  this.game.physics.arcade.enable(this);
  this.body.velocity.x = -100;
  this.animations.add('fly', [0,1],2, true);
  this.animations.play('fly');
  this.deadSound = this.game.add.audio('badGuyHit');
}

MMRunner.Badguy2.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Badguy2.prototype.constructor = MMRunner.Badguy;

MMRunner.Badguy2.prototype.yHolder = 0;
MMRunner.Badguy2.prototype.update = function(){
  this.yHolder =  this.yHolder + 0.05;
  this.body.velocity.y = Math.sin(this.yHolder) * 10;
  if(this.body.x <= -20){
    this.destroy();
  }

  if(this.health < 0){  
    this.destroy();
    this.deadSound.play();
  }
}
MMRunner.Badguy2.prototype.deflect = function(){
  this.body.velocity.x = -100;
}