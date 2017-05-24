var MMRunner = MMRunner || {};
MMRunner.BootState = {
  init: function(){
  },

  preload: function(){

  },

  create: function(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.minWidth = 480;
    this.game.scale.minHeight = 320;
    this.game.scale.maxWidth = 960;
    this.game.scale.maxHeight = 640;

    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    // if(!this.game.device.desktop){
    //      this.scale.forceOrientation(true, false);
    //      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
    //      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    //    }

    // Start Preloader
    this.game.scale.setScreenSize(true);
    this.game.state.start('PreloadState');
  }
}
