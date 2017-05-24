var MMRunner = MMRunner || {};
var player;
var floor;

MMRunner.GameState = {
  init: function(){
  },

  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = this.game.add.tileSprite(0, 0, 700, 500, 'background');
    this.background.autoScroll(-100, 0);

    this.player = this.game.add.group();
    var megaman = new MMRunner.Megaman(this.game, 100, 150);
    this.player.add(megaman);
    // console.log(this.player);

    this.bullets = this.game.add.group();

    this.createFloor();

    this.floorTimer = this.game.time.events.loop(1300, this.addFloor, this);
  },

  update: function(){
    this.game.physics.arcade.collide(this.player, this.floor, this.collide);
  },

  collide:function(player, floor){
    // console.log("COLLISION");
  },

  createFloor: function(){
    this.floor = this.game.add.group();
    this.floor.enableBody = true;
    for(var i = 0; i < 12; i++){
        var platform = new MMRunner.Platform(this.game,i*65, 400);
        this.floor.add(platform);
      }
  },

  addFloor: function(){
    var gap = Math.random();
    if(gap < 0.9){
      var floorPiece = new MMRunner.Platform(this.game, 700, 400);
      this.floor.add(floorPiece);
    }
  }
}
