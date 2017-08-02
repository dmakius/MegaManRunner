var MMRunner = MMRunner || {};
MMRunner.PreloadState = {
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
    this.game.load.spritesheet('badGuy1', 'assets/badGuy1.png',34,16);

    //audio files
    this.game.load.audio('shoot', 'assets/audio/shoot.wav');
    this.game.load.audio('landing', 'assets/audio/landing.wav');
    this.game.load.audio('dead', 'assets/audio/dead.wav');
  },

  create: function(){
    this.game.state.start('MenuState');
  }
}
