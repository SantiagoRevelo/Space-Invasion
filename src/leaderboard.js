function Leaderboard() {	
    this.textStyle;
    
    this.firebutton;
    
    //FILTER STUFF 
    this.singleFilter;
    
    //ONLINE DATA
    this.scoreListRef;
    this.scoresListValues;
    this.SCORES_SHOWED = 10;  
};

Leaderboard.prototype.preload = function () {
    
    console.log("Preload de FireBase");    
};

Leaderboard.prototype.create = function () {

    this.textStyle = { font: "28px 'Press Start 2P', cursive", fill: "#C2C2C2", align: "center" };
    
    // pulsando una tecla, retornamos al menu.
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.onDown.add(this.onInputDown, this);
    
    //Add the CRT Filter
    this.singleFilter = new Phaser.Filter(this, null, this.cache.getShader('crtFilter'));
    this.singleFilter.setResolution(this.world.width, this.world.height);
    this.stage.filters = [this.singleFilter];    
};

Leaderboard.prototype.update = function () {
    
    if (this.fireButton.isDown)
        this.onInputDown();
    
   this.singleFilter.update();
};

Leaderboard.prototype.onInputDown = function () {
    if (!this.game.device.desktop) {
        this.scale.startFullScreen ();
    }
    this.game.state.start('menu');
};

module.exports = Leaderboard;
