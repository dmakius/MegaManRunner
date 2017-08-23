var MMRunner = MMRunner || {};
MMRunner.PreloadState = {
  preload: function(){
    this.background = this.game.add.sprite(0,0, 'background');
    this.preloadText = this.game.add.bitmapText(this.game.world.centerX, 200, "marioFont", "LOADING..." ,24);
    this.preloadText.anchor.setTo(0.5);
    this.preloadBar = this.game.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    // this.game.load.atlas('megaman', 'assets/megaman.png', 'assets/megaman.json');
    this.game.load.atlas('megaman', 'assets/spritesheet.png', 'assets/sprites.json');
    this.game.load.image('logo', 'assets/megamanlogo.png');
    this.game.load.image('platform', 'assets/floor1.png');
    this.game.load.image('bullet', 'assets/bullet.jpg');
    this.game.load.image('healthBar', 'assets/health.png');
    this.game.load.image('platform2', 'assets/platform2.png');
    this.game.load.image('platform3', 'assets/platform3.png');
    this.game.load.image('platform4', 'assets/platform4.png');
    this.game.load.image('explosionParticle', 'assets/explosionParticle.png');
    this.game.load.spritesheet('badGuy1', 'assets/badGuy1.png',34,16);
    this.game.load.spritesheet('explosion1' , 'assets/explosion2.png', 28,31);
    this.game.load.spritesheet('explosion3' , 'assets/explosion3.png', 16,16);
    this.game.load.spritesheet('smallHealthUp' , 'assets/small_health_up.png', 12,10);
    this.game.load.spritesheet('largeHealthUp' , 'assets/large_health_up.png', 14.5,14);

    //audio files
    this.game.load.audio('shoot', 'assets/audio/shoot.wav');
    this.game.load.audio('landing', 'assets/audio/landing.wav');
    this.game.load.audio('dead', 'assets/audio/dead.wav');
    this.game.load.audio('badGuyHit', 'assets/audio/badGuyHit.wav');
    this.game.load.audio('playerHit', 'assets/audio/hit.wav');
    this.game.load.audio('smallHealthUp', 'assets/audio/smallHealthUp.wav');
    this.game.load.audio('largeHealthUp', 'assets/audio/largeHealthUp.wav');

    this.game.load.audio('wily', 'assets/audio/wily.mp3');
  },

  create: function(){
    this.game.state.start('MenuState');
  }
}
