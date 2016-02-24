window.onload = function() {
	var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game-container');
	game.state.add('Boot', SpaceInvasion.Boot);
	game.state.add('Preloader', SpaceInvasion.Preloader);
	game.state.add('StartMenu', SpaceInvasion.StartMenu );
    game.state.add('Game', SpaceInvasion.Game );
	game.state.start('Boot');

	var style = { font: "32px silkscreen", fill: "#666666", align: "center" },
        boldStyle = { font: "bold 32px silkscreen", fill: "#ffffff", align: "center" };


} 