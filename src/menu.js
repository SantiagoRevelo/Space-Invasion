function Menu() {
	this.startBg;
	this.startPrompt;
    this.menuFontStyle;
    this.timer;
    this.firebutton;
    
    //FILTER STUFF 
    this.filter = [];
    this.FILTER_VIGNETTE = 0;
    this.FILTER_FILMGRAIN = 1;
    this.FILTER_BULGEPINCH = 2;
}

Menu.prototype.create = function () {
    //creamos el sprite del fondo y hacemos que se pueda clicar
    startBg = this.add.sprite(0, 0, 'fondo');
     //FILTERS
    this.filter[this.FILTER_VIGNETTE] = this.add.filter('Vignette');
    this.filter[this.FILTER_VIGNETTE].size = 0.2;
    this.filter[this.FILTER_VIGNETTE].amount = 0.5;
    this.filter[this.FILTER_VIGNETTE].alpha = 1.0;
    
    this.filter[this.FILTER_FILMGRAIN] = this.add.filter('FilmGrain');
    this.filter[this.FILTER_FILMGRAIN].color = 0.6;
    this.filter[this.FILTER_FILMGRAIN].amount = 0.08;
    this.filter[this.FILTER_FILMGRAIN].luminance = 0.9;
    
    this.filter[this.FILTER_BULGEPINCH] = this.add.filter('BulgePinch');
    this.filter[this.FILTER_BULGEPINCH].center = {x:this.world.centerX, y:this.world.centerY};
    this.filter[this.FILTER_BULGEPINCH].radius = 0.75;
    this.filter[this.FILTER_BULGEPINCH].strength = 0.7;
    
    this.stage.filters = [this.filter[this.FILTER_VIGNETTE], this.filter[this.FILTER_FILMGRAIN]/*, this.filter[this.FILTER_BULGEPINCH]*/];
    
    startBg.inputEnabled = true;		
    startBg.events.onInputDown.addOnce(this.onInputDown, this);

    menuFontStyle = { font: "bold 32px silkscreen", fill: "#ffffff", align: "center" };
    startPrompt = this.add.text(this.world.centerX, this.world.centerY + 120, "- Touch to Start -", menuFontStyle);
    startPrompt.anchor.setTo(0.5, 0.5);
    timer = 0;
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    scanlines = this.add.sprite(0,0,'scanlines');
    scanlines.alpha = 0.3;
};

Menu.prototype.update = function () {
    timer += this.time.elapsed;
    if (timer >= 700) {
        timer %= 700;
        startPrompt.visible = !startPrompt.visible;
    }
    if (this.fireButton.isDown)
        this.onInputDown();
    
    var f = this.filter[this.FILTER_FILMGRAIN];
    f.update();
};

Menu.prototype.onInputDown = function () {
    if (!this.game.device.desktop) {
        this.scale.startFullScreen ();
    }
    this.game.state.start('game');
};

module.exports = Menu;
