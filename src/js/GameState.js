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
    // console.log(this.player);

    this.bullets = this.game.add.group();

    this.createFloor();
    // this.createPlatforms();
    // this.createBadGuys();
 
    // this.floorTimer = this.game.time.events.loop(1300, this.addFloor, this);
    //this.platform2Timer = this.game.time.events.loop(1000, this.addplatform2, this);
    //this.badGuyTimer = this.game.time.events.loop(1000, this.addBadGuys, this);
  },

  update: function(){
    // this.game.debug.spriteBounds(this.player);
    // console.log(this.player[0]);
    // this.game.debug.spriteInfo(this.player[0], 32, 32, 'rgb(255,255,255)');
    // this.game.debug.spriteBounds(this.floor);
   // this.game.debug.inputInfo(32, 32);
    this.game.physics.arcade.collide(this.player, this.floor, this.collide);
    this.game.physics.arcade.overlap(this.player, this.floor, this.overalping);
    //this.game.physics.arcade.collide(this.player, this.platforms, this.collide);
    ///this.game.physics.arcade.collide(this.player, this.badGuys, this.collide);
  },
  overalping: function(player, floor){
    console.log( "player colliding");
    console.log( "player gavity:" + player.body.gravity);
    // player.body.gravity = 0;
    player.body.y -= 2;
  },
  collide:function(player, floor){
    if(player.body.checkCollision.down){
      // console.log(player);
    }
  },

  createFloor: function(){
    this.floor = this.game.add.group();
    this.floor.enableBody = true;
    for(var i = 0; i < 8; i++){
        var platform = new MMRunner.Platform(this.game,i*160,420);
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
    var badguy = new MMRunner.Badguy(this.game,700, 400);
    this.badGuys.add(badguy);
    console.log(badguy);
  },
  addplatform2: function(){
    // var ranY = Math.floor(Math.random()* 500);
    var plat2 = new MMRunner.Platform2(this.game, 800, 360);
    this.platforms.add(plat2);
  },

  addFloor: function(){
    var gap = Math.random();
    if(gap < 0.8){
      var floorPiece = new MMRunner.Platform(this.game, 700, 400);
      this.floor.add(floorPiece);
    }
  }
}
