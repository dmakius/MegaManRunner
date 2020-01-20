var MMRunner = MMRunner || {};
var player;
var floor;

MMRunner.GameState = {
  create: function(){
    this.game.physics.startSystem(Phaser.Physics.P2);

    this.background = this.game.add.tileSprite(0, 0, 700, 500, 'background');
    this.background.autoScroll(-100, 0);

    this.player = this.game.add.group();
    var megaman = new MMRunner.Megaman(this.game, 100, 350);
    this.player.add(megaman);

    this.bullets = this.game.add.group();
    this.explosions = this.game.add.group();
    this.healthUps = this.game.add.group();
    
    //create health bar sprite. Hit bar graphic expands over sprite as player get damaged
    this.game.healthBar = this.game.add.sprite(50, 50, 'healthBar');
    this.game.hitBar = this.game.add.graphics();
    this.game.playerDamage = 0;
    this.game.hitBar.beginFill(0x000);
    this.game.hitBar.drawRect(50, 50, 20, this.game.playerDamage);


    this.createFloor();
    this.createPlatforms();
    this.score = 0;
    this.game.scoreBoard = this.game.add.bitmapText(10, 10, "marioFont", "SCORE: " + this.score , 16);
    this.landingSound = this.game.add.audio('landing');
    this.hitSound = this.game.add.audio('playerHit');
    this.gameMusic = this.game.add.audio('wily', 0.25, true);
    this.deadMusic = this.game.add.audio('dead');
    this.reflectMusic = this.game.add.audio('reflect');
    this.largeHealthUpMusic = this.game.add.audio('largeHealthUp');
    this.smallHealthUpMusic = this.game.add.audio('smallHealthUp');
    this.gameMusic.play();
    this.createBadGuys();
    this.floorTimer = this.game.time.events.loop(3250, this.addFloor, this);
    this.platform2Timer = this.game.time.events.loop(3500, this.addplatform2, this);
    this.badGuyTimer1 = this.game.time.events.loop(2500, this.addBadGuys1, this);
    this.badGuyTimer1 = this.game.time.events.loop(8000, this.addBadGuys2, this);
  },

  update: function(){
    //DEBUGGING
    //this.game.debug.spriteBounds(this.bullets);
    //this.game.debug.spriteBounds(this.badGuys2);
    // console.log(this.player[0]);
    // this.game.debug.spriteInfo(this.player[0], 32, 32, 'rgb(255,255,255)');
    //this.game.debug.spriteBounds(this.floor);
    // this.game.debug.inputInfo(32, 32);
    ///////////
    
    //collisions
    this.game.physics.arcade.collide(this.player, this.floor, this.collide);
    this.game.physics.arcade.overlap(this.player, this.floor, this.overalping);
    this.game.physics.arcade.collide(this.player, this.platforms, this.collide);
    this.game.physics.arcade.collide(this.player, this.platforms, this.overalpingPlatforms);

    this.game.physics.arcade.collide(this.healthUps, this.floor);
    this.game.physics.arcade.collide(this.healthUps, this.platforms);

    this.game.physics.arcade.collide(this.player, this.healthUps, this.increaseHealth);

    this.game.physics.arcade.collide(this.bullets, this.badGuys, this.killBadGuy);
    this.game.physics.arcade.collide(this.bullets, this.badGuys2, this.killBadGuy);

    if(!this.player.children[0].invincible){
      this.game.physics.arcade.collide(this.player, this.badGuys, this.playerHit);
      this.game.physics.arcade.collide(this.player, this.badGuys2, this.playerHit);
    }
    if(MMRunner.Megaman.dead){
       this.game.gameOverText =  this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "marioFont", "GAME OVER" , 48);
    }
  },

  increaseHealth: function(player, healthUp){
    if(healthUp.key === "smallHealthUp"){
      MMRunner.GameState.game.playerDamage -= 15;
      MMRunner.GameState.smallHealthUpMusic.play();
    }else if(healthUp.key === "largeHealthUp"){
      MMRunner.GameState.game.playerDamage -= 50;
      MMRunner.GameState.largeHealthUpMusic.play();
    }
    //playerDamage can only be positive
    if(MMRunner.GameState.game.playerDamage < 0){MMRunner.GameState.game.playerDamage = 0}
    console.log("PlayerDamage healthUp: " + MMRunner.GameState.game.playerDamage);
    MMRunner.GameState.changeHealthBar();
    healthUp.destroy();
  },

  killBadGuy: function(bullet, badGuy){
    if(badGuy.key === "badGuy2"){
      //console.log(bullet);
      console.log(badGuy.body.touching.right);
      if(badGuy.body.touching.right){
        bullet.kill();
        badGuy.health -= 100;
        var newExplosion = new MMRunner.Explosion(MMRunner.GameState.game, badGuy.x, badGuy.y);
        MMRunner.GameState.explosions.add(newExplosion);
      }else{
        bullet.deflect();
        badGuy.deflect();
        MMRunner.GameState.reflectMusic.play();
      }
      
    }else{

      bullet.kill();
      badGuy.health -= 100;
    
      var newExplosion = new MMRunner.Explosion(MMRunner.GameState.game, badGuy.x, badGuy.y);
      MMRunner.GameState.explosions.add(newExplosion);
      var ranHealth = Math.random();
      if(ranHealth > 0.70 && ranHealth < 0.90){
         var newHealthUp = new MMRunner.SmallHealthUp(MMRunner.GameState.game, badGuy.x, badGuy.y);
         MMRunner.GameState.healthUps.add(newHealthUp);
      }else if(ranHealth > 0.90){
         var newHealthUp = new MMRunner.LargeHealthUp(MMRunner.GameState.game, badGuy.x, badGuy.y);
         MMRunner.GameState.healthUps.add(newHealthUp);
      }
      
      MMRunner.GameState.score += 100;
      MMRunner.GameState.game.scoreBoard.setText("SCORE: " + MMRunner.GameState.score);
    }
  }, 

  playerHit: function(player, badguy){
    MMRunner.GameState.hitSound.play();
    player.invincible = true;
    MMRunner.GameState.game.playerDamage += 25;
    console.log("PlayerDamage Hit: " + MMRunner.GameState.game.playerDamage);
    MMRunner.GameState.changeHealthBar();
    if(MMRunner.GameState.game.playerDamage >= 130){
      player.dead = true;
      MMRunner.GameState.gameOver(player);
    }
    player.hitTimer = MMRunner.GameState.game.time.now + 2000;
  },

  changeHealthBar: function(){
    this.game.hitBar.clear();
    this.game.hitBar.beginFill(0x000);
    this.game.hitBar.drawRect(50, 50, 20,this.game.playerDamage);
  },

  gameOver: function(player){
    this.gameMusic.stop();
    this.deadMusic.play();
    var emitter = this.game.add.emitter(player.x, player.y, 500);
    emitter.makeParticles('explosionParticle');
    emitter.minParticleSpeed.setTo(-100, -100);
    emitter.maxParticleSpeed.setTo(100, 100);
    emitter.gravity = 0;
    emitter.start(true, 1500, null, 100);
    this.game.gameOverText =  
    this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "marioFont", "GAME OVER" , 36);
    this.game.gameOverText.anchor.setTo(0.5);
    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.resetGame, this);
  },

  resetGame: function(){
    this.game.state.start('MenuState');
  },

  overalping: function(player, floor){
    player.body.y -= 2;
  },

  overalpingPlatforms: function(player, floor){
    console.log("Overlapping platforms");
    player.body.y -= 2;
  },


  collide:function(player, floor){
    if(player.body.checkCollision.down && player.jump == true){
      MMRunner.GameState.landingSound.play();
    }
  },

  createFloor: function(){
    this.floor = this.game.add.group();
    this.floor.enableBody = true;
    for(var i = 0; i < 5; i++){
      var platform = new MMRunner.Platform(this.game, i*160, 420);
      this.floor.add(platform);
    }
  },

  createPlatforms: function(){
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
  },

  createBadGuys: function(){
    this.badGuys = this.game.add.group();
    this.badGuys.enableBody = true;

    this.badGuys2 = this.game.add.group();
    this.badGuys2.enableBody = true;
  },

  addBadGuys1: function(){
    var ranY = Math.floor(Math.random()* 300 + 100);
    var badguy = new MMRunner.Badguy1(this.game,700, ranY);
    this.badGuys.add(badguy);
  },

   addBadGuys2: function(){
    var ranY = Math.floor(Math.random()* 300 + 100);
    var badguy2 = new MMRunner.Badguy2(this.game,700, ranY);
    this.badGuys2.add(badguy2);
  },

  addplatform2: function(){
    var ranY = Math.floor(Math.random()* 300 + 100);
    var plat2 = new MMRunner.Platform2(this.game, 800, ranY);
    this.platforms.add(plat2);
  },

  addFloor: function(){
    var gap = Math.random();
    if(gap < 0.9){
      var floorPiece = new MMRunner.Platform(this.game, 800, 420);
      this.floor.add(floorPiece);
    }
  }
}
