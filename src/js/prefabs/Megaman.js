var MMRunner = MMRunner || {}

MMRunner.Megaman = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'megaman');
  this.game.physics.arcade.enable(this);
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  this.enableBody = true;
  this.body.gravity.y = 175;
  this.shootTime  = 0;
  this.nextShootTime = 0;
  this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 3), 10, true);
  this.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 1, 1), 1, true);
  this.animations.add('shoot', Phaser.Animation.generateFrameNames('shoot', 1, 3), 10, true);
  this.animations.add('slide', Phaser.Animation.generateFrameNames('slide', 1, 1), 1, true);
  this.animations.add('jumpShoot', Phaser.Animation.generateFrameNames('jump', 2, 2), 1, true);
  this.animations.play('shoot');

  this.cursors = game.input.keyboard.createCursorKeys();
  this.shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

MMRunner.Megaman.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Megaman.prototype.constructor = MMRunner.Megaman;

MMRunner.Megaman.prototype.update = function(){
  this.body.velocity.x = 0;

  if(this.shootTime < this.game.time.now){
    this.animations.play('walk');
  }else{
    this.animations.play('shoot');
  }

  if(this.cursors.up.isDown && this.body.wasTouching.down){
    this.body.velocity.y = -200;
  }else if(this.cursors.left.isDown){
    this.body.velocity.x = -100;
  }else if(this.cursors.right.isDown){
    this.body.velocity.x = 100;
  }else if(this.cursors.down.isDown){
    this.body.velocity.x = 200;
    this.animations.play('slide');
  }

  if(this.shootKey.isDown && this.game.time.now > this.nextShootTime){
    var bullet = new MMRunner.Bullet(this.game, this.body.x + 45, this.body.y + 15);
    MMRunner.GameState.bullets.add(bullet);
    this.shootTime = this.game.time.now + 250;
    this.nextShootTime = this.game.time.now + 125;
  }

  if(!this.body.touching.down){
    if(this.shootTime > this.game.time.now){
     this.animations.play('jumpShoot');
   }else{
    this.animations.play("jump");
   }
 }

}
