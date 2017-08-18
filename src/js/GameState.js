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
    this.landingSound = this.game.add.audio('landing');
    this.hitSound = this.game.add.audio('hit');
    this.hitSound.play();
    this.gameMusic = this.game.add.audio('wily');
    //this.gameMusic.play();
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
    this.game.physics.arcade.collide(this.bullets, this.badGuys, this.killBadGuy);
    if(!this.player.children[0].invincible){
      this.game.physics.arcade.collide(this.player, this.badGuys, this.playerHit);
    }

    //kill off screen bullets
    this.bullets.filter(function(bullet) { return (bullet.x >= 700|| bullet.x <= - 10); }).callAll('destroy');
    this.explosions.filter(function(explosion) { return explosion.killTime >= 15; }).callAll('destroy');


  },
  killBadGuy: function(bullet, badGuy){
    //console.log(this.game);
    bullet.kill();
    badGuy.health -= 100;
   
    var newExplosion = new MMRunner.Explosion(MMRunner.GameState.game, badGuy.x, badGuy.y);
    console.log(newExplosion);
    MMRunner.GameState.explosions.add(newExplosion);
    MMRunner.GameState.score += 100;
    MMRunner.GameState.game.scoreBoard.setText("SCORE: " + MMRunner.GameState.score);
  },

  playerHit: function(player, badguy){
      MMRunner.GameState.hitSound.play();
      player.invincible = true;
      player.hitTimer = MMRunner.GameState.game.time.now + 2000;
  },

  overalping: function(player, floor){
    //console.log( "player gavity:" + player.body.gravity);
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
