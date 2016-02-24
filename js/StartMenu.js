SpaceInvasion.StartMenu = function(game) {
	this.startBg;
	this.startPrompt;
    this.menuFontStyle;
    this.timer;
}

SpaceInvasion.StartMenu.prototype = {
	create: function () {
		startBg = this.add.image(0, 0, 'titleScreen');
		startBg.inputEnabled = true;
		startBg.events.onInputDown.addOnce(this.startGame, this);
        
        menuFontStyle = { font: "bold 32px silkscreen", fill: "#ffffff", align: "center" };
		startPrompt = this.add.text(this.world.centerX, this.world.centerY, "- Touch to Start -", menuFontStyle);
        startPrompt.anchor.setTo(0.5, 0.5);
        timer = 0;
        
	}, 

    update: function () {
        timer += this.time.elapsed;
        if (timer >= 400) {
            timer %= 400;
            startPrompt.visible = !startPrompt.visible;
        }
    },
    
	startGame: function (pointer) {
		this.state.start('Game');
	}   

};