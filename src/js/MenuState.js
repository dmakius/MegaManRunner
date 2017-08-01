var MMRunner = MMRunner || {};
MMRunner.MenuState = {
  init: function(){
  },

  create: function(){
  	this.background = this.game.add.tileSprite(0, 0, 700, 500, 'background');
  	this.background.autoScroll(-100, 0);
  	this.logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'logo');
   	this.logo.anchor.setTo(0.5);
   	this.logo.scale.setTo(3);
   	this.game.title = this.game.add.bitmapText(this.game.world.centerX, 400, "marioFont", "press spacebar to start" , 18);
    this.game.title.anchor.setTo(0.5);
    // this.game.state.start('PreloadState');
   	this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update:function(){
    if(this.start.isDown){
      this.game.state.start('GameState');
    }
  }
}
