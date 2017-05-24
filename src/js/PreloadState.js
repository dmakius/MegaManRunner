var MMRunner = MMRunner || {};
MMRunner.PreloadState = {
  init: function(){

  },

  preload: function(){
    this.game.load.atlas('megaman', 'assets/megaman.png', 'assets/megaman.json');
    this.game.load.image('background', 'assets/background.jpg');
    this.game.load.image('platform', 'assets/floor1.png');
    this.game.load.image('bullet', 'assets/bullet.jpg');
  },

  create: function(){
    this.game.state.start('GameState');
  }
}
