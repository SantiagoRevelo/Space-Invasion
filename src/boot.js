function Boot() {
    this.firstRunPortrait;
};

Boot.prototype.init = function () {
    this.input.maxPointers = 1;    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setMinMax(320, 180, 1280, 720);
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;    
    this.game.scale.forceOrientation(true, false);
    this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
    this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);
};

Boot.prototype.preload = function () {
    //  Here we load the assets required for our preloader (in this case a background and a loading bar)
    this.firstRunPortrait = !this.scale.isGameLandscape;
};

Boot.prototype.create = function () {
  this.state.start('preloader');
};

Boot.prototype.handleIncorrect = function () {
    if(!this.game.device.desktop){
        this.game.paused=true;
        document.getElementById("turn").style.display="block";
    }
};

Boot.prototype.handleCorrect = function () {
    if (!this.game.device.desktop){
        if (this.firstRunPortrait) {
            var gameRatio = window.innerWidth / window.innerHeight;
            this.height = Math.ceil(360 * gameRatio);
            this.width = 360;
            this.renderer.resize(this.width, this.height);
        }
        this.game.paused=false;
        document.getElementById("turn").style.display="none";
    }
};

module.exports = Boot;
