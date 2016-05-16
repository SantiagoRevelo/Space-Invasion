function Game() {
  
    // CONSTANTS
    this.PLAYER_MAX_SPEED = 10;
    this.LEVELS_DEFINITION = [
        //level1
        [
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
        ],
        //level2
        [
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0]
        ],
        //level3
        [
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0],
            [0, 0, 3, 3, 3, 0, 3, 3, 3, 0, 0]
        ],
        //level4
        [
            [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
            [3, 0, 0, 3, 3, 3, 3, 3, 0, 0, 3],
        ],
        //level5
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ]
    ];
        
    //Variables
    this.navePlayer;
    this.cursors;
    this.fireButton;
    
    this.playerCurrentSpeed;
    this.playerCurrentDirection;
    this.playerBullet;
    this.playerAttackTime;
    this.soundShoot;
    
    this.lives;
    this.livesCount;
    this.livesText;
    this.playerScore;
    this.scoreText;
    this.scoreLabel;
    
    this.enemyWidth;
    this.enemyHeight;
    this.enemyDir;
    this.enemySpeed;
    this.enemyTimerUpdate;
    this.livingEnemies;
    this.enemyBullets;
    this.enemyAttackTimer;
    this.soundBomb;
    
    this.motherShip;
    this.motherShipSpeed;
    this.motherShipwaitTimer;
    this.motherShipwaitKilledInThisLevel;
    
    this.shields;
    this.shieldBmps;
    
    this.bdm;
    this.HUDBorder;
    
    this.alienDeadEmitter;
    this.soundExplode;
    
    this.level;
    this.myTimer;
    this.steps;
    
    this.worldOffsetH;
    this.worldOffsetV;

    this.HUDHeight;
    this.textStyle;
    this.textBoldStyle;
    
    this.isPlaying;
    this.isPauseBetweenLevels;
    this.loseLivesTimer;
    this.pauseBetweenLevelsTimer;
    this.loseLivesText;
    this.pauseBetweenLevelsText;
    
    this.crtFilter;
    this.scanlines;
};

Game.prototype.create = function () {
    this.init();
    
    this.initializeFilters();
    
    this.buildLevel();
    this.startLevel();
};

Game.prototype.initializeFilters = function() {

    //Add the CRT Filter
    this.crtFilter = new Phaser.Filter(this, null, this.cache.getShader('crtFilter'));
    this.crtFilter.setResolution(this.world.width, this.world.height);
    this.stage.filters = [this.crtFilter];   
};

Game.prototype.init = function() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.playerCurrentSpeed = 0;
    this.playerAttackTime = 0;
    this.livesCount = 3;
    this.playerScore = 0000;
    this.scoreLabel = "Score: ";
    this.soundShoot = this.add.sound('shoot');
        
    this.level = 1 ;
    this.myTimer = 0;
    this.steps = 1;
    
    this.enemyWidth = 75;
    this.enemyHeight = 50;
    this.enemyDir = 1;
    this.enemySpeed = 25;
    this.livingEnemies = [];
    this.enemyAttackTimer = this.rnd.integerInRange(0, 5) * 1000 / this.level;
    this.soundBomb = this.add.sound('bomb');
    
    this.shieldDamageBmp = this.make.bitmapData(28, 28);
    //this.shieldDamageBmp.circle(14,14,14, 'rgba(0, 0, 0, 255)');
    this.shieldDamageBmp.rect(8, 0, 20, 28, 'rgba(0, 0, 0, 255)');
    this.shieldDamageBmp.update();
    
    this.lineBMP = this.add.bitmapData(1280, 2);
    this.lineBMP.rect(0, 0, 1280, 2, 'rgba(0, 255, 0, 255)');
    this.lineBMP.update();
        
    this.alienDeadEmitter = this.add.emitter(0, 0, 100);
    this.alienDeadEmitter.makeParticles('pixel', 0, 250, 1, true);
    this.alienDeadEmitter.collide = true;
    this.alienDeadEmitter.enableBody = true;
    this.alienDeadEmitter.gravity = 200;
    this.soundExplode = this.add.sound('explode');
    
    this.worldOffsetH = 40;
    this.worldOffsetV = 20;
    this.HUDHeight = 80;
    
    this.textStyle = { font: "28px 'Press Start 2P', cursive", fill: "#C2C2C2", align: "center" };
    this.textBoldStyle = { font: "bold 26px 'Press Start 2P', cursive", fill: "#FFFFFF", align: "center" };
    this.textGreenBoldStyle = { font: "bold 28px 'Press Start 2P', cursive", fill: "#00FF00", align: "center" };
    
    this.isPlaying = true;
    this.loseLivesTimer = 0;
    this.pauseBetweenLevelsTimer = 0;
};

Game.prototype.buildLevel = function() {
   // this.physics.startSystem(Phaser.Physics.ARCADE);
    //this.physics.startSystem(Phaser.Physics.P2JS);
    
    // Creamos el player
    this.createNavePlayer();
    
    //Eenemies
    this.alienGroup = this.add.group();
    this.alienGroup.enableBody = true;
        
    //Nave nodriza bonus    
    this.createMotherShip();
    
    //Escudos
    this.shields = this.add.group();
    this.shields.enableBody = true;
        
    // HUD
        
    this.HUDBorder = this.add.sprite(0, this.world.height - this.HUDHeight, this.lineBMP);
    this.physics.enable(this.HUDBorder, Phaser.Physics.ARCADE);
    //this.HUDBorder.body.inmovable = true;
    this.HUDBorder.body.allowGravity = 0;
    this.HUDBorder.body.immovable = true;
    
    
    
    /*
    var line = this.add.graphics(0, this.world.height - this.HUDHeight);
    line.beginFill();
    line.lineStyle(1, 0x00ff00);
    line.lineTo(this.world.width, 0);
    line.endFill();
    window.graphics = line;
    */
    // Texto de numero de vidas
    this.livesText = this.add.text(this.worldOffsetH, this.world.height - ((this.HUDHeight * 0.5) + 20), 3,  this.textStyle);    
    
    this.lives = this.add.group();
    for (var i = 0; i < this.livesCount; i++ ) {
        var nave = this.lives.create(this.livesText.x + this.livesText.width + 10 + 60 * i, this.livesText.y + 7, 'navePlayer');
        nave.tint = 0x00FF00;
    }
    this.livesText.text = this.lives.countLiving();
    
    var textoCreditos = this.add.text(0, this.world.height - ((this.HUDHeight * 0.5) + 20), 'Space Invasion - By Sreveloc',  this.textBoldStyle);
    textoCreditos.x = this.world.width - this.worldOffsetH - textoCreditos.width;
        
    // Puntuaciones
    this.scoreText = this.add.text(0, this.worldOffsetV, this.scoreLabel  + this.fixedIntSize(0, 4),  this.textStyle);
    this.scoreText.x = this.world.width - this.worldOffsetH - this.scoreText.width;
};

Game.prototype.createNavePlayer = function() {
    this.navePlayer = this.add.sprite(0, 0, 'navePlayer');
    this.navePlayer.enableBody = true;
    this.navePlayer.physicsBodyType = Phaser.Physics.ARCADE;
    this.navePlayer.anchor.setTo(0.5, 1);        
    this.physics.arcade.enable(this.navePlayer);
    
    // Creamos las balas del player
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
    this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
};

Game.prototype.createPlayerBullets = function() {
    this.playerBullets.createMultiple(2, 'playerBullet');
    this.playerBullets.setAll('anchor.x', 0.5);
    this.playerBullets.setAll('anchor.y', 0);
    this.playerBullets.setAll('outOfBoundsKill', true);
    this.playerBullets.setAll('checkWorldBounds', true);
};

Game.prototype.createEnemies = function() {
    // La posicion del primer alien en X la calculamos así: centroaAntallaX - (totalAliens/2 * ancho) + (ancho * 0.5) 
    var startXpos = this.world.centerX - (this.LEVELS_DEFINITION[this.level-1][0].length/2 * this.enemyWidth) + (this.enemyWidth * 0.5);
    // La posicion en Y de los aliens empieza a partir de 100 + el alto de cada alien + un espacio de 20 pixels
    var startYpos = 150;
    // Lavelocidad con la que se actualiza el avance de los enemigos.
    this.enemyTimerUpdate = 1000;
    
    for (var i = 0; i < this.LEVELS_DEFINITION[this.level-1].length; i++) { // filas
        for (var j = 0; j < this.LEVELS_DEFINITION[this.level-1][i].length; j++) { // columnas
            // El valor 0 es una posicion vacía
            if (this.LEVELS_DEFINITION[this.level-1][i][j] != 0) {
                var alienName = "alien" + this.LEVELS_DEFINITION[this.level-1][i][j];

                var alien = this.alienGroup.create(startXpos + (j * this.enemyWidth), startYpos + (this.enemyHeight * i), alienName, 1);
                alien.anchor.setTo(0.5, 0.5);
                alien.body.moves = false;
                alien.animations.add('step1',[0], 1);
                alien.animations.add('step2',[1], 1);
                alien.play('step1', 1);
            }
        }
    }
    
    // Balas de los enemigos
    this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;    
};

Game.prototype.createEnemyBullets = function() {
    this.enemyBullets.createMultiple(1 * this.level, 'enemyBullet');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
};

Game.prototype.createMotherShip = function() {
    this.motherShip = this.add.sprite(0, 0, 'motherShip');
    this.motherShip.scale.set(0.5);
    this.motherShip.enableBody = true;
    this.motherShip.physicsBodyType = Phaser.Physics.ARCADE;
    this.physics.arcade.enable(this.motherShip);
    this.motherShip.kill();
};

Game.prototype.createShields = function() {
    
    this.shieldBmps = [];
    
    for (var i = 0; i < 3; i++ ) {        
        var baseBmp = this.make.bitmapData(80,70);
        baseBmp.draw('shield', 0, 0, 80, 70);
        baseBmp.update();        
                
        var shieldX = this.world.width * 0.25 * ( i + 1) - baseBmp.width * 0.5;
        var shieldY = this.world.height * 0.7;
        
        this.shields.create( shieldX, shieldY, baseBmp);
        
        this.shieldBmps.push({
            bmp: baseBmp,
            worldX: shieldX,
            worldY: shieldY
        });
    }
            
    this.shieldsenablebody = true;
    this.shields.physicsBodyType = Phaser.Physics.ARCADE; 
    this.shields.setAll('body.immovable', true);
};

Game.prototype.startLevel = function() {
    
    // Seteamos el player
    this.navePlayer.revive();
    this.setPlayerStartPosition();
    
    // Seteamos las balas del plaYer
    this.playerBullets.removeAll();
    this.createPlayerBullets();
    
    //Seteamos los enemigos
    this.alienGroup.removeAll();
    this.createEnemies();
    
    //Seteamos las balas de los enemigos
    this.enemyBullets.removeAll();
    this.createEnemyBullets();
    
    //Seteamos la nave de bonus
    this.motherShipSpeed = this.level * 66;
    this.motherShipwaitTimer = this.time.now + 10000;
    this.motherShipwaitKilledInThisLevel = false;
    this.motherShip.kill();    
    
    // Reseteamos los textos
    if (typeof this.loseLivesText != 'undefined')
        this.loseLivesText.destroy();
    
    //Seteamos las defensas
    this.shields.removeAll();
    this.createShields();
    
    // Recreamos las vidas
    this.lives.removeAll();
    this.lives = this.add.group();
    for (var i = 0; i < this.livesCount; i++ ) {
        var nave = this.lives.create(this.livesText.x + this.livesText.width + 10 + 60 * i, this.livesText.y + 7, 'navePlayer');
        nave.tint = 0x00FF00;
    }
    this.livesText.text = this.livesCount;
    //SCANLINES
    //this.scanlines = this.add.sprite(0,0,'scanlines');
    //this.scanlines.alpha = 0.3;
};

Game.prototype.reStartGame = function() {
    this.level = 1;
    this.init();
    this.startLevel();
};

Game.prototype.setPlayerStartPosition = function() {
    this.navePlayer.x = this.world.centerX;
    this.navePlayer.y = this.world.height - this.worldOffsetV - this.HUDHeight;
};

Game.prototype.update = function () {

    this.myTimer += this.time.elapsed;
    
    if (this.isPlaying === true) {
        if (this.myTimer >= this.enemyTimerUpdate) {
            this.myTimer %= this.enemyTimerUpdate;
            this.updateEnemies();
        }

        this.BonusMotherShipUpdate();
        this.checkInput();

        this.updateCollisions();
    }
    else {
        if (this.livesCount > 0) {
            if (this.loseLivesTimer <= this.time.now) {
                this.isPlaying = true;
                this.loseLivesText.destroy();
                this.navePlayer.revive();
                this.setPlayerStartPosition();
            }
            else {
                this.loseLivesText.text = "Hit by an alien bullet! \n ready in: " + ((this.loseLivesTimer - this.time.now)* 0.001).toFixed(1);
            }            
        }
        //if (this.livesCount <= 0) {
        else{
          this.loseLivesText.text = "- Game Over - \n Touch anywhere to restart";
        }
    }
    
    if (this.isPauseBetweenLevels) {
        if (this.pauseBetweenLevelsTimer <= this.time.now) {
            this.isPauseBetweenLevels = false;
            this.pauseBetweenLevelsText.destroy();
            this.level++;
            this.startLevel();            
        }
        else {
            this.pauseBetweenLevelsText.text = "Well done!!!\n But it is not time to declare victory yet\n Next alien wave in: " + ((this.pauseBetweenLevelsTimer - this.time.now)* 0.001).toFixed(1);
        }
    }
    
    //FILTERS
    this.crtFilter.update();
};

Game.prototype.updateEnemies = function() {
        var goDown = false;
        var alienIncH = this.enemyDir * this.enemySpeed;
        
        var that = this;
        this.alienGroup.forEach( function(alien) {
            if (alien.x + alienIncH <= that.worldOffsetH || alien.x + alienIncH >= that.world.width - that.worldOffsetH ) {
                goDown = true;
            }
        });
    
        if (!goDown) {
            this.alienGroup.forEach(function(alien) {
                alien.x += alienIncH; 
            });            
        }
        else {
            this.alienGroup.forEach(function(alien) {
                alien.y += 30; 
            });            
            goDown != goDown;
            this.enemyDir *= -1;
            this.enemyTimerUpdate *= 0.8;
        }
                
        this.steps++;
        if (this.steps % 2 == 0) 
            this.alienGroup.callAll('animations.play', 'animations', 'step2');
        else
            this.alienGroup.callAll('animations.play', 'animations', 'step1');
    
        if (this.time.now > this.enemyAttackTimer)
        {
            // le pasamos el incremento en el eje X para corregir la posición de la bala
            this.enemyFires(alienIncH);
        }
};

Game.prototype.BonusMotherShipUpdate = function() {
    if (!this.motherShipwaitKilledInThisLevel) {
        if (this.time.now > this.motherShipwaitTimer) {
            if (!this.motherShip.alive){
                this.motherShip.reset(-100, 65);
                this.motherShip.body.velocity.x = this.motherShipSpeed;
            }
            if (this.motherShip.x > this.world.width) {
                this.motherShip.kill();
                this.motherShipwaitTimer = this.time.now + 10000;
            }
        }
    }
};

Game.prototype.checkInput = function() {
    var isMoving = false;
    // Controles Táctiles
    if (this.input.activePointer.isDown)
    {
        if (this.input.activePointer.position.y > this.world.height - this.HUDHeight)
            this.fireBullet();
        else {
            var targetX = this.input.activePointer.position.x;
            this.playerCurrentDirection =  targetX >= this.world.centerX ? 1 : -1;        
            isMoving = true;
        }
    }
    
    // Controles con teclado
    if (this.cursors.left.isDown) {
        this.playerCurrentDirection = -1;
        isMoving = true;
    }
    else if (this.cursors.right.isDown) {
        this.playerCurrentDirection = 1;
        isMoving = true;
    }
  
    if (isMoving) {
        this.playerCurrentSpeed += this.playerCurrentSpeed < this.PLAYER_MAX_SPEED? 0.5 : 0;
    }
    else {
        this.playerCurrentSpeed -= this.playerCurrentSpeed > 0 ? 0.75 : 0;
        if (this.playerCurrentSpeed < 0) this.playerCurrentSpeed = 0;
    }
    
    this.movePlayer();
    
    if (this.fireButton.isDown) {
        this.fireBullet();
    }
    
};

Game.prototype.updateCollisions = function() {
    this.physics.arcade.overlap(this.playerBullets, this.alienGroup, this.playerBulletHitsEnemy, null, this);
    this.physics.arcade.overlap(this.enemyBullets, this.navePlayer, this.enemyBulletHitsPlayer, null, this);
    this.physics.arcade.overlap(this.playerBullets, this.motherShip, this.playerBulletHitsMotherShip, null, this);
    this.physics.arcade.overlap(this.navePlayer, this.alienGroup, this.alienHitsPlayer, null, this);
    this.physics.arcade.overlap(this.playerBullets, this.shields, this.bulletHitsShield, null, this);
    this.physics.arcade.overlap(this.enemyBullets, this.shields, this.bulletHitsShield, null, this);
    this.physics.arcade.overlap(this.alienGroup, this.shields, this.alienHitsShield, null, this);
    
    this.physics.arcade.collide(this.enemyBullets, this.HUDBorder, this.enemyBulletTouchGround);
    this.physics.arcade.collide(this.alienDeadEmitter, this.HUDBorder);
    this.physics.arcade.collide(this.alienDeadEmitter, this.shields);
};

Game.prototype.movePlayer = function() {

    var inc = this.playerCurrentSpeed * this.playerCurrentDirection;

    if (this.navePlayer.x + inc >= this.worldOffsetH && this.navePlayer.x + inc  <= this.world.width - this.worldOffsetH) {
        this.navePlayer.x += inc;
    }
};

Game.prototype.fireBullet = function() {
    if(this.time.now > this.playerAttackTime) {
        var bullet = this.playerBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.navePlayer.x, this.navePlayer.y - 25);
            bullet.body.velocity.y -= 400;
            //Un disparo cada dos segundos
            this.playerAttackTime = this.time.now + 2000;
            
            this.soundShoot.play();
        }
    }
};

Game.prototype.enemyFires = function( nextX ) {
    var enemyBullet = this.enemyBullets.getFirstExists(false);
    
    this.livingEnemies.length = 0;
    var that = this;
    this.alienGroup.forEachAlive( function(alien) {
        that.livingEnemies.push(alien);
    });
    
    if (enemyBullet && this.livingEnemies.length > 0) {
        var random = this.rnd.integerInRange(0, this.livingEnemies.length -1);
        var shooter = this.livingEnemies[random];
        enemyBullet.reset(shooter.body.x + (shooter.width * 0.5) + nextX, shooter.body.y  + shooter.height);
        switch (this.level) {
            case 1:
            case 2:
                enemyBullet.body.velocity.y += 150;
                break;                
            default:
                this.physics.arcade.moveToObject(enemyBullet, this.navePlayer, 66 * this.level);
                break;
        }
        
        this.enemyAttackTimer = this.time.now + this.rnd.integerInRange(0, 4) * 1000 / this.level;
        this.soundBomb.play();
    }
    
};

Game.prototype.playerBulletHitsEnemy = function(bullet, enemy) {
    this.explodeParticles(enemy.x, enemy.y, 0xFFFFFF, 1500, 15);
    bullet.kill();
    enemy.kill();
    this.playerAttackTime = 0;
    
    //TODO: addPoints, create explosions, etc...
    this.playerScore += 10;
    this.scoreText.text = this.scoreLabel + this.fixedIntSize(this.playerScore, 4);
    
    if (this.alienGroup.countLiving() == 0) {
        this.GotoNextLevel();
    }
};

Game.prototype.enemyBulletHitsPlayer = function(player, enemyBullet) {
    this.explodeParticles(enemyBullet.x, enemyBullet.y, 0xFFFFFF, 1500, 50);
    enemyBullet.kill();
    this.enemyAttackTimer = 0;
    this.lives.getFirstExists(false);
    var live = this.lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }
    this.livesText.text = this.lives.countLiving();
    this.livesCount--;
    this.PlayerLoseLives();
};

Game.prototype.playerBulletHitsMotherShip = function(bullet, motherShip) {
    this.explodeParticles(motherShip.x, motherShip.y, 0xFF0000, 2500, 30);
    
    bullet.kill();
    motherShip.kill();
    // TODO: Add FX, points, etc...
    this.playerScore += 20;
    this.scoreText.text = this.scoreLabel + this.fixedIntSize(this.playerScore, 4);
    this.motherShipwaitKilledInThisLevel = true;
};

Game.prototype.alienHitsPlayer = function(navePlayer, enemy) {
    console.log("Game Over");
    this.lives.removeAll();
    this.livesCount = 0;
    this.livesText.text = this.lives.countLiving();
    this.isPlaying = false;
    this.loseLivesText = this.add.text(this.world.centerX, this.world.centerY, "", this.textGreenBoldStyle);
    this.loseLivesText.anchor.setTo(0.5);
    
};

Game.prototype.bulletHitsShield = function(bullet, shield) {
    var shieldIdx = this.shields.getChildIndex(shield);

    var matchingBmp = this.shieldBmps[shieldIdx];
    
    var bmpRelativeX = Math.round(bullet.x - matchingBmp.worldX);
    var bmpRelativeY = Math.round(bullet.y - matchingBmp.worldY);
    var bmpPixelRgba = matchingBmp.bmp.getPixelRGB(bmpRelativeX, bmpRelativeY); 

    if (bmpPixelRgba.a > 0 ) { // we hit a colored zone
        matchingBmp.bmp.blendDestinationOut();
        matchingBmp.bmp.draw(this.shieldDamageBmp, bmpRelativeX - (this.shieldDamageBmp.width * 0.5 ), bmpRelativeY- (this.shieldDamageBmp.height * 0.5 ));
        matchingBmp.bmp.blendReset();
        matchingBmp.bmp.update();
        
        this.explodeParticles(bullet.x, bullet.y, 0x00FF00, 1500, 15);
        
        bullet.kill();
        if (bullet.key === "playerBullet") {
            this.playerAttackTime = 0;
        }
    }
};

Game.prototype.enemyBulletTouchGround = function(ground, enemyBullet) {
    enemyBullet.kill();
    this.enemyAttackTimer = 0;
};

Game.prototype.alienHitsShield = function(bullet, shield) {
    shield.kill();
    this.explodeParticles (shield.x, shield.y, 0x00FF00, 2000, 50);
};

Game.prototype.explodeParticles = function(x, y, color, lifespan, number) {
    this.alienDeadEmitter.x = x;
    this.alienDeadEmitter.y = y;
    this.alienDeadEmitter.forEach(function(particle){ if (!particle.visible) particle.tint = color;}); 
    this.alienDeadEmitter.start(true, lifespan, null, number);
    this.soundExplode.play();
};

Game.prototype.PlayerLoseLives = function(){
    
    this.playerCurrentSpeed = 0;
    this.navePlayer.kill();
    this.loseLivesTimer = 3000 + this.time.now;
    this.loseLivesText = this.add.text(this.world.centerX, this.world.centerY, this.livesCount > 0 ? "Hit by an alien bullet!" : "- GAME OVER -", this.textGreenBoldStyle);
    this.loseLivesText.anchor.setTo(0.5);
    this.isPlaying = false;
  
    if (this.livesCount <= 0) {
      //Esperamos 3 segundos y mostramos la ventana de pedir el nombre para la leaderboard...
      this.time.events.add(3, this.promptPlayerName, this);
      
      //... y mientras dejamos el 
      this.loseLivesText.text = "- Game Over - \n Touch anywhere to restart";
    }
};

Game.prototype.GotoNextLevel = function() {
    this.isPauseBetweenLevels = true;
    this.pauseBetweenLevelsTimer = this.time.now + 4000;
    this.enemyBullets.removeAll();
    this.pauseBetweenLevelsText = this.add.text(this.world.centerX, this.world.centerY, "", this.textGreenBoldStyle);
    this.pauseBetweenLevelsText.anchor.setTo(0.5);
};

Game.prototype.promptPlayerName = function() {
  // Configuramos el contenido de la modal
  $('#promptPlayerNameModal .modal-body').html('<h2>CONGRATULATIONS HEARTHLING</h2><h3>YOUR SCORE IS</h3><h1>' + this.playerScore + '</h1><p>TYPE YOUR NAME TO SIGN THE HALL OF FAME</p><input id="inputName" type="text" name="nickname" placeholder="Enter your name...">');          
  
  // Configuramos la funcionalidad de la modal
  $('#sendScoreButton').click(this.submitScore.bind(this));
  $("#inputName").keyup(this.validateName.bind(this));
  $('#promptPlayerNameModal').on('hidden.bs.modal', this.OnCloseModalPromptPlayerName.bind(this));
  
  // Mostramos la modal
  $('#promptPlayerNameModal').modal('show');
  
}; 

Game.prototype.validateName = function(e) { 
  if (e.keyCode == 13) {
      this.submitScore();
      $('#promptPlayerNameModal').modal('hide');
  }
}

Game.prototype.submitScore = function() {
    var v = $('#inputName').val();
    fbs.addScore(v, this.playerScore);
}

Game.prototype.OnCloseModalPromptPlayerName = function() {
  this.game.state.start('leaderboard');
}

Game.prototype.fixedIntSize = function(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
};

/*
Game.prototype.render = function() {
    this.game.debug.spriteBounds(this.shields, '#ff0000', false);
    this.game.debug.spriteBounds(this.navePlayer, '#ff0000', false);
    this.game.debug.spriteBounds(this.playerBullets, '#ff0000', false);    
}
*/
module.exports = Game;
