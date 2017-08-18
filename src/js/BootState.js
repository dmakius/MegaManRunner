var MMRunner = MMRunner || {};
MMRunner.BootState = {
  init: function(){
  },

  preload: function(){
  	this.game.load.bitmapFont('marioFont', 'assets/fonts/mario20_0.png', 'assets/fonts/mario20.fnt');
  	this.game.load.image('background', 'assets/background.jpg');
 	this.game.load.image('preloader', 'assets/preloader.png');
  },

  create: function(){
    this.game.state.start('PreloadState');
  }
}
