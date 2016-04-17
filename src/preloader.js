function Preloader() {
    this.asset = null;
    this.ready = false;
    this.isFontsLoaded = false;
};

Preloader.prototype.preload = function () {
    this.asset = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingAnim');
    this.asset.anchor.setTo(0.5, 0.5)
    this.load.setPreloadSprite(this.asset);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.stage.backgroundColor = '#001414';
    this.loadResources();
};

Preloader.prototype.fontsLoaded = function() {
    this.isFontsLoaded = true;
}

Preloader.prototype.loadResources = function () {
    
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
    WebFontConfig = {
        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: this.fontsLoaded(),
        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: { families: [ 'Press+Start+2P::latin' ] }

    };
    //FONT
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    // ONLINE SCORES
    fbs.preload();
    
    //OVERLAYS
    this.load.image('scanlines','assets/images/scanlines.png');
    
    // IMAGES
    this.load.image('fondo',  'assets/images/titleBg.png');
    this.load.image('navePlayer', 'assets/images/ship.png');
    this.load.image('shield', 'assets/images/shield.png');
    this.load.image('motherShip', 'assets/images/motherShip.png');
    this.load.image('enemyBullet', 'assets/images/bomb.png');
    this.load.image('playerBullet', 'assets/images/bullet.png');
    this.load.image('pixel', 'assets/images/pixel.jpg');
    this.load.image('podium', 'assets/images/podium.png');
    
    // SECUENCIAS
    this.load.spritesheet('alien1', 'assets/images/alien1.png', 40, 40, 2);
    this.load.spritesheet('alien2', 'assets/images/alien2.png', 40, 40, 2);
    this.load.spritesheet('alien3', 'assets/images/alien3.png', 40, 40, 2);
    
    //FILTER
    this.load.shader('crtFilter', 'src/filters/crt.frag');
};

Preloader.prototype.create = function () {
    //this.asset.cropEnabled = false;
};

Preloader.prototype.update = function () {
  if (!!this.ready && this.isFontsLoaded) {
      this.game.state.start('menu');
     // this.game.state.start('game');
  }
};

Preloader.prototype.onLoadComplete = function () {
   this.ready = true;
};

module.exports = Preloader;
