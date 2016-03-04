function Preloader() {
  this.asset = null;
  this.ready = false;
}

Preloader.prototype.preload = function () {
  this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 -10, 'preloader');
  this.load.setPreloadSprite(this.asset);

  this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  this.loadResources();
};

Preloader.prototype.loadResources = function () {
    // load your resources here
    this.load.image('fondo', '../assets/images/titleBg.png');
    this.load.image('player', '../assets/images/ship.png');    
};

Preloader.prototype.create = function () {

};

Preloader.prototype.update = function () {
  if (!!this.ready) {
    this.game.state.start('menu');
  }
};

Preloader.prototype.onLoadComplete = function () {
   this.ready = true;
};

module.exports = Preloader;
