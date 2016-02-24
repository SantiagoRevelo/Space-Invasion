SpaceInvasion.Preloader = function(game) {
	this.preloader = null;
	this.titleTex = null;
	this.ready = false;
};

SpaceInvasion.Preloader.prototype = {
	preload: function() {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY - 150, 'titleImage');
		this.titleText.anchor.setTo(0.5, 0.5);
		this.load.image('titleScreen', 'assets/images/titleBg.png');
        
        this.load.image('ship', 'assets/images/ship.png');
        this.load.image('motherShip', 'assets/images/motherShip.png');
	}, 

	create: function () {
		this.preloadBar.cropEnabled = false;
	},
 
	update: function () {
		this.ready = true;
        this.state.start('StartMenu');
	}

};