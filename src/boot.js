function Boot() {}

Boot.prototype.init = function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop)
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ; 
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
        this.game.scale.setMinMax(640, 360, 1280, 720);
        
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    }
    else
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ; 
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
        this.game.scale.setMinMax(640, 360, 1280, 720);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.forceOrientation(true, false);
        this.game.scale.setResizeCallback(this.gameResized, this);
        this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
};

Boot.prototype.preload = function () {
    //  Here we load the assets required for our preloader (in this case a background and a loading bar)
    this.load.image('loadingAnim', '../assets/preloader.gif');
};

Boot.prototype.create = function () {
  this.state.start('preloader');
};

Boot.prototype.gameResized = function (width, height) {
    //  This could be handy if you need to do any extra processing if the game resizes.
    //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
    //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
};

Boot.prototype.enterIncorrectOrientation = function () {
    BasicGame.orientated = false;
    document.getElementById('orientation').style.display = 'block';
};

Boot.prototype.leaveIncorrectOrientation = function () {
    BasicGame.orientated = true;
    document.getElementById('orientation').style.display = 'none';
};

module.exports = Boot;
