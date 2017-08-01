var MMRunner = MMRunner || {};
MMRunner.BootState = {
  init: function(){
  },

  preload: function(){
  	this.game.load.bitmapFont('marioFont', 'assets/fonts/mario20_0.png', 'assets/fonts/mario20.fnt');

  },

  create: function(){
    this.game.state.start('PreloadState');
  }
}
