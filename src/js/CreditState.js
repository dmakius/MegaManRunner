var MMRunner = MMRunner || {};
MMRunner.CreditState = {
  create: function(){
    this.background = this.game.add.sprite(0,0, 'background');

    this.preloadText = this.game.add.bitmapText(this.game.world.centerX, 50, "marioFont", "High Scores" ,24);
    this.preloadText.anchor.setTo(0.5);
    this.scores = [{"player": "Hashem", "score":"613000"},
     {"player":"TheRebbe", "score":'77000'}, 
     {"player":"HaMidinah","score":'19480'}, 
     {"player":"Ha Olam", "score":"5773"}, 
     {"player":"Satan", "score":"6660"}, 
     {"player":"The Bar Mitzvah Boy", "score":"1300"},
     {"player":"The Hertz Chumash", "score":"586"}]
  },

   update: function(){
   for(var x = 0; x < this.scores.length; x++){
    this.playerName = this.game.add.bitmapText(50, (x* 50) +100, "marioFont", this.scores[x].player,18);
    this.playerScores = this.game.add.bitmapText(550, (x* 50) +100, "marioFont", this.scores[x].score,18);
    }
  }

}
