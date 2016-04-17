
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'SpaceInvader-game');
game.state.add('boot', require('./boot'));
game.state.add('preloader', require('./preloader'));
game.state.add('menu', require('./menu'));
game.state.add('game', require('./game'));
game.state.add('leaderboard', require('./leaderboard'));
game.state.start('boot');
