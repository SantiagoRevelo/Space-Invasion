function Leaderboard() {	
    this.textStyle;
    this.scoresText;
    
    this.firebutton;
    
    //FILTER STUFF 
    this.singleFilter;
    
    //ONLINE DATA
    this.scoreListRef;
    this.scoresListValues;
    this.SCORES_SHOWED = 10;  
    
    //textUtils
    this.content = [];
    this.line = [];
    this.wordIndex = 0;
    this.lineIndex = 0;
    this.wordDelay = 100;
    this.lineDelay = 200;
};

Leaderboard.prototype.preload = function () {
    
    console.log("Preload de FireBase");    
};

Leaderboard.prototype.create = function () {

    this.textStyle = { font: "28px 'Press Start 2P', cursive", fill: "#C2C2C2", align: "left" };
    
    this.scoresText = this.add.text(0, 0, "", this.textStyle);
    
    var list = fbs.getLeaderBoard();
    
    var i = 0;
    for (var key in list) {
        if (i > 0) {
            this.scoresText.text += "\n";
            //this.content.push("\n");
        }
        this.scoresText.text += this.fitNameInSize(list[key].name, 8) + "   - - - -   " + list[key].score;
        this.content.push(this.fitNameInSize(list[key].name, 8)  + "   - - - -   " + list[key].score);
        i++;
    }
    
    // posicionamos el texto en la pantalla.
    this.scoresText.x = (this.world.width - this.scoresText.width ) * 0.5;
    this.scoresText.y = (this.world.height - this.scoresText.height ) * 0.5;
    this.scoresText.text = "";
    
    // pulsando una tecla, retornamos al menu.
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.onDown.add(this.onInputDown, this);
    
    //Add the CRT Filter
    this.singleFilter = new Phaser.Filter(this, null, this.cache.getShader('crtFilter'));
    this.singleFilter.setResolution(this.world.width, this.world.height);
    this.stage.filters = [this.singleFilter];
    
    this.nextLine();
};

Leaderboard.prototype.fitNameInSize = function(name, size) {
     return (name + new Array(size + 1).join( ' ' )).substr(0,8);
}


Leaderboard.prototype.nextLine = function() {

    if (this.lineIndex === this.content.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    this.line = this.content[this.lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    this.wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

    //  Advance to the next line
    this.lineIndex++;
}

Leaderboard.prototype.nextWord = function() {

    //  Add the next word onto the text string, followed by a space
    this.scoresText.text = this.scoresText.text.concat(this.line[this.wordIndex] + " ");

    //  Advance the word index to the next word in the line
    this.wordIndex++;

    //  Last word?
    if (this.wordIndex === this.line.length)
    {
        //  Add a carriage return
        this.scoresText.text = this.scoresText.text.concat("\n");
        //  Get the next line after the lineDelay amount of ms has elapsed
        this.time.events.add(this.lineDelay, this.nextLine, this);
    }
}



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
