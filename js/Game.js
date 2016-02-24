SpaceInvasion.Game = function(game) {};

SpaceInvasion.Game.prototype = {
	create: function () {
        this.BuildScene();
    },
    
    BuildScene: function() {
        this.add.image(this.world.centerX, this.world.height - 50, 'ship');
        this.add.image(this.world.centerX, 50, 'motherShip');
    },
 
	update: function () {}

};