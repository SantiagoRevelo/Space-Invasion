function Preloader() {
    this.asset = null;
    this.ready = false;
}

Preloader.prototype.preload = function () {
    this.asset = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingAnim');
    this.asset.anchor.setTo(0.5, 0.5)
    this.load.setPreloadSprite(this.asset);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.stage.backgroundColor = '#001414';
    this.loadResources();
};

Preloader.prototype.loadResources = function () {
    
    //OVERLAYS
    this.load.image('scanlines','../assets/images/scanlines.png');
    
    // IMAGES
    this.load.image('fondo',  '../assets/images/titleBg.png');
    this.load.image('navePlayer', '../assets/images/ship.png');
    this.load.image('shield', '../assets/images/shield.png');
    this.load.image('motherShip', '../assets/images/motherShip.png');
    this.load.image('enemyBullet', '../assets/images/bomb.png');
    this.load.image('playerBullet', '../assets/images/bullet.png');
    this.load.image('pixel', '../assets/images/pixel.jpg');
    
    // SECUENCIAS
    this.load.spritesheet('alien1', '../assets/images/alien1.png', 40, 40, 2);
    this.load.spritesheet('alien2', '../assets/images/alien2.png', 40, 40, 2);
    this.load.spritesheet('alien3', '../assets/images/alien3.png', 40, 40, 2);
    
    //FILTERS
    this.load.script('filter-vignette','../assets/filters/Vignette.js');
    this.load.script('filter-filmgrain','../assets/filters/FilmGrain.js');
};

Preloader.prototype.create = function () {
    //this.asset.cropEnabled = false;
};

Preloader.prototype.update = function () {
  if (!!this.ready) {
      this.game.state.start('menu');
     // this.game.state.start('game');
  }
};

Preloader.prototype.onLoadComplete = function () {
   this.ready = true;
};

module.exports = Preloader;
