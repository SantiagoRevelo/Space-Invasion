var SpaceInvasion = {};

SpaceInvasion.Boot = function(game) {};

SpaceInvasion.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'Assets/images/loaderBar.png');
		this.load.image('titleImage', 'Assets/images/titleImage.png');
	},
	create: function() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 640;
		this.scale.minHeight = 360;
		this.scale.maxWidth = 1280;
		this.scale.maxHeight = 720;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAllignVertically = true;		
		this.stage.forceLandscape = true;
		//this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#000000';

		this.state.start('Preloader');
	}
};