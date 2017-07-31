var MMRunner = MMRunner || {};
MMRunner.BootState = {
  init: function(){
  },

  preload: function(){

  },

  create: function(){
    this.game.state.start('PreloadState');
  }
}
