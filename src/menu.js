function Menu() {
	this.startBg;
	this.startPrompt;
    this.menuFontStyle;
    this.timer;
    this.firebutton;
    
    //FILTER STUFF 
    this.singleFilter;
    
    //this.myDataRef = new Firebase('https://boiling-torch-7482.firebaseio.com/');
}

Menu.prototype.create = function () {

    this.menuFontStyle = { font: "bold 28px 'Press Start 2P', cursive", fill: "#ffffff", align: "center" };
    this.startPrompt = this.add.text(this.world.centerX, this.world.centerY + 120, "- Touch to Start -", this.menuFontStyle);
    this.startPrompt.anchor.setTo(0.5, 0.5);
    this.timer = 0;
    
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.startBg = this.add.sprite(0, 0, 'fondo');
    //creamos el sprite del fondo y hacemos que se pueda clicar
    this.startBg.inputEnabled = true;		
    this.startBg.events.onInputDown.addOnce(this.onInputDown, this);
    
    //Add the CRT Filter
    
    this.singleFilter = new Phaser.Filter(this, null, this.cache.getShader('crtFilter'));
    this.singleFilter.setResolution(this.world.width, this.world.height);
    this.stage.filters = [this.singleFilter];    
    
    
    //Add the scanlines
    //scanlines = this.add.sprite(0,0,'scanlines');
    //scanlines.alpha = 0.3;
};

Menu.prototype.update = function () {
    this.timer += this.time.elapsed;
    if (this.timer >= 700) {
        this.timer %= 700;
        this.startPrompt.visible = !this.startPrompt.visible;
    }
    if (this.fireButton.isDown)
        this.onInputDown();
    
    
   //var f = this.stage.filters[this.FILTER_CRT]; 
   //this.singleFilter.update();
    
    
};

Menu.prototype.onInputDown = function () {
    if (!this.game.device.desktop) {
        this.scale.startFullScreen ();
    }
    this.game.state.start('game');
};

module.exports = Menu;
