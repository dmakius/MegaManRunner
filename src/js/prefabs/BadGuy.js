var MMRunner = MMRunner || {}

MMRunner.Badguy1 = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'badGuy1');
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  this.health = 10;
  this.game.physics.arcade.enable(this);
  this.body.velocity.x = -100;
  this.animations.add('fly', [0,1,2,3,4,5],4, true);
  this.animations.play('fly');
  this.deadSound = this.game.add.audio('badGuyHit');
}

MMRunner.Badguy1.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Badguy1.prototype.constructor = MMRunner.Badguy;

MMRunner.Badguy1.prototype.yHolder = 0;
MMRunner.Badguy1.prototype.update = function(){
  this.yHolder =  this.yHolder + 0.05;
  this.body.velocity.y = Math.sin(this.yHolder) * 200;
  if(this.body.x <= -20){
    this.destroy();
  }

  if(this.health < 0){  
    this.destroy();
    this.deadSound.play();
  }
}
