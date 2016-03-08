function Menu() {
	this.startBg;
	this.startPrompt;
    this.menuFontStyle;
    this.timer;
}

Menu.prototype.create = function () {
    //creamos el sprite del fondo y hacemos que se pueda clicar
    startBg = this.add.sprite(0, 0, 'fondo');
    startBg.inputEnabled = true;		
    startBg.events.onInputDown.addOnce(this.onInputDown, this);

    menuFontStyle = { font: "bold 32px silkscreen", fill: "#ffffff", align: "center" };
    startPrompt = this.add.text(this.world.centerX, this.world.centerY + 120, "- Touch to Start -", menuFontStyle);
    startPrompt.anchor.setTo(0.5, 0.5);
    timer = 0;
    
    
};

Menu.prototype.update = function () {
    timer += this.time.elapsed;
    if (timer >= 400) {
        timer %= 400;
        startPrompt.visible = !startPrompt.visible;
    }
};

Menu.prototype.onInputDown = function () {
  this.game.state.start('game');
};

module.exports = Menu;
