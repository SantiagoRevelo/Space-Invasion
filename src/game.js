function Game() {
    // CONSTANTS
    this.PLAYER_MAX_SPEED = 10;
    this.LEVELS_DEFINITION = [
        //level1
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ],
        //level2
        [],
        //level3
        []
    ];
        
    //Variables
    this.navePlayer;
    this.cursors;
    this.fireButton;
    
    this.playerCurrentSpeed;
    this.playerCurrentDirection;
    this.playerBullet;
    this.playerBulletTime;
    
    this.lives;
    this.livesCount;
    this.livesText;
    
    this.enemyWidth;
    this.enemyHeight;
    this.enemyDir;
    this.enemySpeed;
    
    this.level;
    this.myTimer;
    this.steps;
    
    this.worldOffsetH;
    this.worldOffsetV;

    this.HUDHeight;
    this.textStyle;
    //this.textBoldStyle;
}

Game.prototype.create = function () {
    this.init();    
    this.buildLevel();     
};

Game.prototype.init = function() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.playerCurrentSpeed = 0;
    this.playerBulletTime = 0;
    this.livesCount = 3;
        
    this.level = 0;
    this.myTimer = 0;
    this.steps = 1;
    
    this.enemyWidth = 75;
    this.enemyHeight = 50;
    this.enemyDir = 1;
    this.enemySpeed = 25;
    
    this.worldOffsetH = 40;
    this.worldOffsetV = 20;
    this.HUDHeight = 80;
    
    this.textStyle = { font: "32px silkscreen", fill: "#C2C2C2", align: "center" };
    this.textBoldStyle = { font: "bold 32px silkscreen", fill: "#C2C2C2", align: "center" };
}

Game.prototype.update = function () {
    this.myTimer += this.time.elapsed;
    
    if (this.myTimer >= 1000) {
        this.myTimer %= 1000;
        this.updateEnemies();
    }
    
    this.checkInput();
    
    this.updateCollisions();
    
};

Game.prototype.updateEnemies = function() {
        var goDown = false;
        var alienIncH = this.enemyDir * this.enemySpeed;
        
        var that = this;
        this.alienGroup.forEach( function(alien) {
            if (alien.x + alienIncH <= that.worldOffsetH || alien.x + alienIncH >= that.world.width - that.worldOffsetH ) {
                goDown = true;
                console.log("godown");
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
        }
                
        this.steps++;
        if (this.steps % 2 == 0) 
            this.alienGroup.callAll('animations.play', 'animations', 'step2');
        else
            this.alienGroup.callAll('animations.play', 'animations', 'step1');
}

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
        this.playerCurrentSpeed -= this.playerCurrentSpeed > 0 ? 0.5 : 0;
    }
    
    this.movePlayer();
    
    if (this.fireButton.isDown) {
        this.fireBullet();
    }
    
}

Game.prototype.updateCollisions = function() {
    this.physics.arcade.overlap(this.playerBullets, this.alienGroup, this.playerBulletHitsEnemy, null, this);
}

Game.prototype.movePlayer = function() {

    var inc = this.playerCurrentSpeed * this.playerCurrentDirection;

    if (this.navePlayer.x + inc >= this.worldOffsetH && this.navePlayer.x + inc  <= this.world.width - this.worldOffsetH) {
        this.navePlayer.x += inc;
    }
}

Game.prototype.fireBullet = function() {
    if(this.time.now > this.playerBulletTime) {
        bullet = this.playerBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.navePlayer.x, this.navePlayer.y - 25);
            bullet.body.velocity.y -= 400;
            //Un disparo cada dos segundos
            this.playerBulletTime = this.time.now + 2000;
        }
    }
}

/*
Game.prototype.resetBullet = function(bulet) {
    bullet.kill();
}
*/

Game.prototype.playerBulletHitsEnemy = function(bullet, enemy) {
    bullet.kill();
    enemy.kill();
    this.playerBulletTime = 0;
    //TODO: addPoints, create explosions, etc...
}

Game.prototype.buildLevel = function() { 
    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Creamos el player
    this.navePlayer = this.add.sprite(this.world.centerX, this.world.height - this.worldOffsetV - this.HUDHeight, 'navePlayer');
    this.navePlayer.anchor.setTo(0.5, 1);    
        
    // disparos del player
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
    this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.playerBullets.createMultiple(2, 'playerBullet');
    this.playerBullets.setAll('anchor.x', 0.5);
    this.playerBullets.setAll('anchor.y', 1);
    this.playerBullets.setAll('outOfBoundsKill', true);
    this.playerBullets.setAll('checkWorldBounds', true);
    
    // HUD
    //linea separación del HUD
    var line = this.add.graphics(0, this.world.height - this.HUDHeight);
    line.beginFill();
    line.lineStyle(1, 0x00ff00);
    line.lineTo(this.world.width, 0);
    line.endFill();
    window.graphics = line;
    
    // Texto de numero de vidas
    this.livesText = this.add.text(this.worldOffsetH, this.world.height - ((this.HUDHeight * 0.5) + 20), this.livesCount,  this.textStyle);    
    this.lives = this.add.group();
    for (var i = 0; i < this.livesCount; i++ ) {
        var nave = this.lives.create(this.livesText.x + this.livesText.width + 10 + 60 * i, this.livesText.y + 7, 'navePlayer');
        nave.tint = 0x00FF00;
    }
    
    var textoCreditos = this.add.text(0, this.world.height - ((this.HUDHeight * 0.5) + 20), 'Space Invasion - By Sreveloc',  this.textBoldStyle);
    textoCreditos.x = this.world.width - this.worldOffsetH - textoCreditos.width;
    
    //Eenemies
    this.alienGroup = this.add.group();
    this.alienGroup.enableBody = true;    
    this.createEnemies();
}

Game.prototype.createEnemies = function() {
    // La posicion del primer alien en X la calculamos así: centroaAntallaX - (totalAliens/2 * ancho) + (ancho * 0.5) 
    var startXpos = this.world.centerX - (this.LEVELS_DEFINITION[this.level][0].length/2 * this.enemyWidth) + (this.enemyWidth * 0.5);
    // La posicion en Y de los aliens empieza a partir de 100 + el alto de cada alien + un espacio de 20 pixels
    var startYpos = 100;
    
    for (var i = 0; i < this.LEVELS_DEFINITION[this.level].length; i++) { // filas
        for (var j = 0; j < this.LEVELS_DEFINITION[this.level][i].length; j++) { // columnas
            // El valor 0 es una posicion vacía
            if (this.LEVELS_DEFINITION[this.level][i][j] != 0) {
                var alienName = "alien" + this.LEVELS_DEFINITION[this.   level][i][j];

                var alien = this.alienGroup.create(startXpos + (j * this.enemyWidth), startYpos + (this.enemyHeight * i), alienName, 1);
                alien.anchor.setTo(0.5, 0.5);
                alien.body.moves = false;
                alien.animations.add('step1',[0], 1);
                alien.animations.add('step2',[1], 1);
                alien.play('step1', 1);
                console.log("Creado " + alienName  + "[" + i + "," + j + "]");
            }
        }
    }
}

module.exports = Game;
