var MMRunner = MMRunner || {};
MMRunner.PreloadState = {
  init: function(){

  },

  preload: function(){
    // this.game.load.atlas('megaman', 'assets/megaman.png', 'assets/megaman.json');
    this.game.load.atlas('megaman', 'assets/spritesheet.png', 'assets/sprites.json');
    this.game.load.image('logo', 'assets/megamanlogo.png');
    this.game.load.image('background', 'assets/background.jpg');
    this.game.load.image('platform', 'assets/floor1.png');
    this.game.load.image('bullet', 'assets/bullet.jpg');
    this.game.load.image('platform2', 'assets/platform2.png');
    this.game.load.image('platform3', 'assets/platform3.png');
    this.game.load.image('platform4', 'assets/platform4.png');
    this.game.load.spritesheet('badGuy', 'assets/badGuy.png',25,32);
  },

  create: function(){
    this.game.state.start('MenuState');
  }
}
