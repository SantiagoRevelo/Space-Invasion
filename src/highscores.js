function HighScores() {	
    this.menuFontStyle;
    this.timer;
    this.firebutton;
    
    //FILTER STUFF 
    this.singleFilter;
    
  
    //ONLINE DATA
    this.scoreListRef;
    this.scoresListValues;
    this.SCORES_SHOWED = 10;
  
}


HighScores.prototype.preload = function () {
    
    this.scoreListRef = new Firebase('https://spaceinvasion.firebaseio.com/');
    var the_name = 'Señor_' + this.rnd.integerInRange(0, 99);
    var the_score = this.rnd.integerInRange(1, 1000);
    this.scoreListRef.push({ name:the_name, score:the_score });
    
}

HighScores.prototype.create = function () {

    this.menuFontStyle = { font: "bold 24px 'Press Start 2P', cursive", fill: "#ffffff", align: "center" };
    
    // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
    this.scoresListValues = this.scoreListRef.orderByChild('score').limitToLast(this.SCORES_SHOWED);
    console.log(this.scoresListValues);
   
    this.timer = 0;
    
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.input.onDown.add(this.onInputDown, this);
    
    //Add the CRT Filter
    this.singleFilter = new Phaser.Filter(this, null, this.cache.getShader('crtFilter'));
    this.singleFilter.setResolution(this.world.width, this.world.height);
    this.stage.filters = [this.singleFilter];    
};

HighScores.prototype.update = function () {
    this.timer += this.time.elapsed;
    
    if (this.fireButton.isDown)
        this.onInputDown();
    
   this.singleFilter.update();
};

HighScores.prototype.onInputDown = function () {
    if (!this.game.device.desktop) {
        this.scale.startFullScreen ();
    }
    this.game.state.start('menu');
};

module.exports = HighScores;
