var MMRunner = MMRunner || {}

MMRunner.Megaman = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'megaman');
  this.game.physics.arcade.enable(this);
  this.anchor.setTo(0.5,0.75);
  this.scale.setTo(2);
  this.standingRight = true;
  this.playerShooting = false;
  this.body.gravity.y = 250;
  this.jump = false;
  this.nextShootTime = 0;
  this.shootTime = 0;
  this.animations.add('standRight', Phaser.Animation.generateFrameNames('standRight', 1, 1), 10, true);
  this.animations.add('standLeft', Phaser.Animation.generateFrameNames('standLeft', 1, 1), 10, true);
  this.animations.add('runningRight', Phaser.Animation.generateFrameNames('runRight', 1, 3), 10, true);
  this.animations.add('runningLeft', Phaser.Animation.generateFrameNames('runLeft', 1, 3), 10, true);
  this.animations.add('jumpLeft', Phaser.Animation.generateFrameNames('jumpLeft', 1, 1), 10, true);
  this.animations.add('jumpRight', Phaser.Animation.generateFrameNames('jumpRight', 1, 1), 10, true);
  this.animations.add('jumpShootRight', Phaser.Animation.generateFrameNames('jumpShootRight', 1, 1), 10, true);
  this.animations.add('jumpShootLeft', Phaser.Animation.generateFrameNames('jumpShootLeft', 1, 1), 10, true);
  this.animations.add('slideRight', Phaser.Animation.generateFrameNames('slideRight', 1, 1), 10, true);
  this.animations.add('slideLeft', Phaser.Animation.generateFrameNames('slideLeft', 1, 1), 10, true);

  this.cursors = game.input.keyboard.createCursorKeys();
  this.shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

MMRunner.Megaman.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Megaman.prototype.constructor = MMRunner.Megaman;

MMRunner.Megaman.prototype.update = function(){
  this.body.velocity.x = 0;
  this.body.gravity.y = 250;
  this.body.height = 48;

  if(this.cursors.up.isDown && this.body.wasTouching.down){
    this.body.velocity.y = -200;
    this.jump = true;
  }else if(this.cursors.left.isDown){
      this.body.velocity.x = -100;
      this.standingRight = false;
      this.animations.play('runningLeft');
      this.body.height = 46;
      console.log("player hieght: "+ this.body.height);
  }else if(this.cursors.right.isDown){
      this.body.velocity.x = 100;
      this.standingRight = true;
      this.animations.play('runningRight');
      this.body.height = 46;
      console.log("player hieght: "+ this.body.height);
  }else if(this.cursors.down.isDown){
     this.body.height = 42;
     console.log(this.body.height);
    if(this.standingRight){
      this.body.velocity.x = 150;
      this.animations.play('slideRight');
    }else{
      this.body.velocity.x = -150;
      this.animations.play('slideLeft');
    }
  }else{
    if(this.standingRight === false){
      this.animations.play('standRight');
    }else{
      this.animations.play('standLeft');
    }
  }

  if(this.body.touching.down){
    this.jump = false;
  }

  if(this.jump){
    if(this.standingRight){
      this.body.height = 50;
      console.log("player hieght: "+ this.body.height);
      if(this.playerShooting){
        console.log("Shooting jump");
        this.animations.play('jumpShootRight');
       }else{
         console.log("regular jump");
         this.animations.play('jumpRight');
       }
    }else{
        if(this.playerShooting){
          this.animations.play('jumpShootLeft');
        }else{
          this.animations.play('jumpLeft');
        }
    }
  }

  if(this.body.touching.down){
    this.jump = false;
  }

  if(this.shootKey.isDown && this.game.time.now > this.nextShootTime){
    if(this.standingRight){
      var bullet = new MMRunner.Bullet(this.game, this.body.x + 60, this.body.y + 17, true);
    }else{
      var bullet = new MMRunner.Bullet(this.game, this.body.x - 20, this.body.y + 17, false);
    }
    
    MMRunner.GameState.bullets.add(bullet);
    this.shootTime = this.game.time.now + 1000;
    this.nextShootTime = this.game.time.now + 250;
    this.playerShooting = true;
    console.log("PLAYER SHOOTING");
  }

  if(this.game.time.now > (this.nextShootTime + 200)){
    this.playerShooting = false;
    console.log("SHOOTING ENDING");
  }

}
