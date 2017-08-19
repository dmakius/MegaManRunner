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

    this.createFloor();
    this.createPlatforms();
    this.score = 0;
    this.game.scoreBoard = this.game.add.bitmapText(10, 10, "marioFont", "SCORE: " + this.score , 16);
    this.game.healthBoard = this.game.add.bitmapText(500, 10, "marioFont", "HEALTH: 100% ", 16);
    this.landingSound = this.game.add.audio('landing');
    this.hitSound = this.game.add.audio('playerHit');
    this.gameMusic = this.game.add.audio('wily', 0.25, true);
    this.deadMusic = this.game.add.audio('dead');
    this.gameMusic.play();
    this.createBadGuys();
    this.floorTimer = this.game.time.events.loop(3250, this.addFloor, this);
    this.platform2Timer = this.game.time.events.loop(3500, this.addplatform2, this);
    this.badGuyTimer = this.game.time.events.loop(2000, this.addBadGuys, this);
  },

  update: function(){
    //DEBUGGING
    // this.game.debug.spriteBounds(this.player);
    // console.log(this.player[0]);
    // this.game.debug.spriteInfo(this.player[0], 32, 32, 'rgb(255,255,255)');
    // this.game.debug.spriteBounds(this.floor);
    // this.game.debug.inputInfo(32, 32);
    
    //collisions
    this.game.physics.arcade.collide(this.player, this.floor, this.collide);
    this.game.physics.arcade.overlap(this.player, this.floor, this.overalping);
    this.game.physics.arcade.collide(this.player, this.platforms, this.collide);
    this.game.physics.arcade.collide(this.player, this.platforms, this.overalpingPlatforms);

    this.game.physics.arcade.collide(this.bullets, this.badGuys, this.killBadGuy);
    if(!this.player.children[0].invincible){
      this.game.physics.arcade.collide(this.player, this.badGuys, this.playerHit);
    }
    if(MMRunner.Megaman.dead){
       this.game.gameOverText =  this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "marioFont", "GAME OVER" , 48);
    }
  },
  killBadGuy: function(bullet, badGuy){
    bullet.kill();
    badGuy.health -= 100;
   
    var newExplosion = new MMRunner.Explosion(MMRunner.GameState.game, badGuy.x, badGuy.y);
    MMRunner.GameState.explosions.add(newExplosion);
    MMRunner.GameState.score += 100;
    MMRunner.GameState.game.scoreBoard.setText("SCORE: " + MMRunner.GameState.score);
  }, 

  playerHit: function(player, badguy){
    MMRunner.GameState.hitSound.play();
    player.invincible = true;
    player.health -= 100;
    if(player.health <= 0){
      player.dead = true;
      MMRunner.GameState.gameOver(player);
    }
    player.hitTimer = MMRunner.GameState.game.time.now + 2000;
    MMRunner.GameState.game.healthBoard.setText("HEALTH: " + player.health + "%");
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
  },

  addBadGuys: function(){
    var ranY = Math.floor(Math.random()* 300 + 100);
    var badguy = new MMRunner.Badguy(this.game,700, ranY);
    this.badGuys.add(badguy);
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
