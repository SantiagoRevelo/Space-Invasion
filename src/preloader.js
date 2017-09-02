function Preloader() {
    this.asset = null;
    this.ready = false;
    this.isFontsLoaded = false;
    
    //********//
    this.alienStruct = [
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ,[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        ,[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]
        ,[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
        ,[0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0]
        ,[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
        ,[0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0]
        ,[0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0]
        ,[0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0]
        ,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.alienLoader;
    this.alienPartSize = 25;
    this.lastPercent = 0;
    
    this.tweeners = [];
    //********//
};

Preloader.prototype.preload = function () {
    this.createAlien();    
    this.load.onFileComplete.add(this.onFileLoaded, this);
    this.stage.backgroundColor = '#001414';
    this.loadResources();    
};

Preloader.prototype.createAlien = function() {
    this.alienLoader = this.add.group();
    for(var y = 0; y < this.alienStruct.length; y++) {
        for(var x = 0; x < this.alienStruct[y].length; x++) {
            //if (this.alienStruct[y][x] == 1) {
                
                var baseBmp = this.add.bitmapData(this.alienPartSize, this.alienPartSize);
                baseBmp.rect(1, 1, this.alienPartSize - 1, this.alienPartSize - 1, this.alienStruct[y][x] == 1 ? 'rgba(0, 255, 0, 255)' : 'rgba(255, 255, 255, 255)' );
                baseBmp.update();
               
                var startDir = this.rnd.integerInRange(0, 3);
                var posEnd;
                posEnd = {
                    x: this.game.world.centerX - (this.alienPartSize  * this.alienStruct[y].length/2) - (this.alienPartSize * 0.5) + (x * this.alienPartSize), 
                    y:this.game.world.centerY - (this.alienPartSize  * this.alienStruct.length/2) - (this.alienPartSize * 0.5) + (y * this.alienPartSize)
                };
                
                var posIni;
                if (startDir == 0) {
                       posIni = {x: posEnd.x, y: -this.alienPartSize};
                } else if(startDir == 1) {
                    posIni = {x: this.game.world.width + this.alienPartSize, y: posEnd.y};
                } else if(startDir == 2) {
                    posIni = {x: posEnd.x, y: this.game.world.height + this.alienPartSize};
                } else if(startDir == 3) {
                    posIni = {x: -this.alienPartSize, y: posEnd.y};
                }
                
                var box = this.alienLoader.create(posIni.x, posIni.y, baseBmp);                
                var t = this.game.add.tween(box).to(posEnd, 400, Phaser.Easing.Quadratic.InOut, false);
                this.tweeners.push(t);
            //}
        }
    }
}

Preloader.prototype.fontsLoaded = function() {
    this.isFontsLoaded = true;
}

Preloader.prototype.loadResources = function () {
    //FILTER
    this.load.shader('crtFilter', 'src/filters/crt.frag');
    
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
    WebFontConfig = {
        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: this.fontsLoaded(),
        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: { families: [ 'Press+Start+2P::latin' ] }

    };
    // Scripts
    this.load.script('webfont', 'src/plugins/webfont.js');
    this.load.script('firebaseStuff', 'src/components/firebaseStuff.js');
    this.load.script('cameraShek', 'src/plugins/CameraShake.js')
    
    //Starfield
    this.load.script('starfield', 'src/components/starfield.js');

    //OVERLAYS
    //this.load.image('scanlines','assets/images/scanlines.png');
    
    // IMAGES
    this.load.image('fondo',  'assets/images/titleBg.png');
    this.load.image('navePlayer', 'assets/images/ship.png');
    this.load.image('shield', 'assets/images/shield.png');
    this.load.image('motherShip', 'assets/images/mothership.png');
    this.load.image('enemyBullet', 'assets/images/bomb.png');
    this.load.image('playerBullet', 'assets/images/bullet.png');
    this.load.image('pixel', 'assets/images/pixel.jpg');
    this.load.image('podium', 'assets/images/podium.png');    
    this.load.image('star', 'assets/images/star.png');
    
    // SECUENCIAS
    this.load.spritesheet('alien1', 'assets/images/alien1.png', 40, 40, 2);
    this.load.spritesheet('alien2', 'assets/images/alien2.png', 40, 40, 2);
    this.load.spritesheet('alien3', 'assets/images/alien3.png', 40, 40, 2);
    
    // SONIDOS
    this.load.audio('bomb', 'assets/sounds/bomb.wav');
    this.load.audio('explode', 'assets/sounds/explode.wav');
    this.load.audio('shoot', 'assets/sounds/shoot.wav');
};

Preloader.prototype.scriptLoaded = function (data) {
    console.log(data);
}

Preloader.prototype.create = function () {
    
    //this.game.add.tween(this.alienLoader).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
    
};

Preloader.prototype.update = function () {
  if (!!this.ready && this.isFontsLoaded) {
      this.game.state.start('menu');
  }
};
        
Preloader.prototype.onFileLoaded = function(progress) {
    var id = 0;
    for (var i = Math.floor(this.tweeners.length * (this.lastPercent/100)); i < Math.floor(this.tweeners.length * (progress/100)); i++){                
        this.tweeners[i].delay(Math.random() * 400 * ++id);        
        this.tweeners[i].start();
    }
    
    this.lastPercent = progress;
    
    if (progress >= 100) {
        this.time.events.add(4000, function() { fbs.preload(); this.ready = true; }, this);
    }
}

Preloader.prototype.onLoadComplete = function () {
   // ONLINE SCORES
   
};

module.exports = Preloader;
