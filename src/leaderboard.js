function Leaderboard() {	
    
    this.titleText;
    this.titleTextStyle;
    
    this.scoresText;
    this.scoresTextStyle;
    
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
    this.wordDelay = 30;
    this.lineDelay = 100;
    
    this.autoChangeStateDelay = 10000;
};

Leaderboard.prototype.preload = function () {
};

Leaderboard.prototype.create = function () {

    this.titleTextStyle = { font: "42px 'Press Start 2P', cursive", fill: "#00FF00", align: "center" };
    this.scoresTextStyle = { font: "28px 'Press Start 2P', cursive", fill: "#C2C2C2", align: "left" };
    
    
    this.titleText = this.add.text(this.world.centerX, 20, "-LEADERBOARD-", this.titleTextStyle);
    this.titleText.anchor.add(0.5, 0);
    
    this.scoresText = this.add.text(0, 0, "", this.scoresTextStyle);
    this.scoresText.lineSpacing = 20;
    
    
    var list = fbs.getLeaderBoard();
    
    var i = 0;
    for (var key in list) {
        if (i > 0) {
            this.scoresText.text += "\n";
        }
        this.scoresText.text += this.fitTextInSizeAndFillWithChar((i+1) + ". ", 4, ' ', 'left') + this.fitTextInSizeAndFillWithChar(list[key].name, 8) + "  " + this.fitTextInSizeAndFillWithChar('', 15, '·') + "  " + this.fitTextInSizeAndFillWithChar(list[key].score, 4, '0', 'left');
        this.content.push(      this.fitTextInSizeAndFillWithChar((i+1) + ". ", 4, ' ', 'left') + this.fitTextInSizeAndFillWithChar(list[key].name, 8) + "  " + this.fitTextInSizeAndFillWithChar('', 15, '·') + "  " + this.fitTextInSizeAndFillWithChar(list[key].score, 4, '0', 'left'));
        i++;
    }
    
    // posicionamos el texto en la pantalla.
    this.scoresText.x = (this.world.width - this.scoresText.width ) * 0.5;
    this.scoresText.y = (this.world.height - this.scoresText.height ) * 0.5 + 20;
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

Leaderboard.prototype.fitTextInSizeAndFillWithChar = function(txt, size, char, dir) {
    char = char || ' ';
    if (dir != 'left' && dir != 'right')
        dir = 'right';
    
    var text = "";
    if (dir === 'right')
        text = (txt + new Array(size + 1).join( char )).substr(0, size);
    else {
        text = new Array(size + 1).join( char ) + txt;
        text = text.substr(text.length - size, text.length);
    }
    return text;
}


Leaderboard.prototype.nextLine = function() {

    if (this.lineIndex === this.content.length)
    {
        // Returns to the main menu automatically after a pause at the end of the typed leaderboard
        this.time.events.add(this.autoChangeStateDelay, this.onInputDown, this);
        
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    this.line = this.content[this.lineIndex].split('');

    //  Reset the word index to zero (the first word in the line)
    this.wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

    //  Advance to the next line
    this.lineIndex++;
}

Leaderboard.prototype.nextWord = function() {

    //  Add the next word onto the text string, followed by a space
    this.scoresText.text = this.scoresText.text.concat(this.line[this.wordIndex] + "");

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

    this.game.state.start('menu');
};

module.exports = Leaderboard;
