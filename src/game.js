function Game() {
    this.navePlayer;
    this.cursors;
    this.fireButton;
    this.PLAYER_MAX_SPEED = 10;
    this.playerCurrentSpeed;
    this.playerCurrentDirection;
    this.lives;
    
    this.singleEnemy;
    this.enemyWidth;
    this.enemyHeight;
    this.enemyDir;
    this.enemySpeed;
    
    this.level;
    this.myTimer;
    this.steps;
    
    this.worldOffsetH;
    this.worldOffsetV;
    this.worldLimit;
    
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
}

Game.prototype.create = function () {
    this.init();    
    this.buildLevel();     
};

Game.prototype.init = function() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.playerCurrentSpeed = 0;
    this.lives = 3;
    
    this.singleEnemy;
    this.enemyWidth = 60;
    this.enemyHeight = 50;
    this.enemyDir = 1;
    this.enemySpeed = 25;
    
    this.level = 0;
    this.myTimer = 0;
    this.steps = 1;
    
    this.worldOffsetH = 40;
    this.worldOffsetV = 20;
    this.worldLimit = this.world.width - this.worldOffsetH;
}

Game.prototype.update = function () {
    this.myTimer += this.time.elapsed;
    
    if (this.myTimer >= 1000) {
        this.myTimer %= 1000;
        
        var goDown = false;
        var alienIncH = this.enemyDir * this.enemySpeed;
        
        var that = this;
        this.alienGroup.forEach( function(alien) {
            if (alien.x + alienIncH <= that.worldOffsetH || alien.x + alienIncH >= that.worldLimit ) {
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
    this.checkInput();
};

Game.prototype.checkInput = function() {
    var isMoving = false; 
    if (this.input.activePointer.isDown)
    {
        var targetX = this.input.activePointer.position.x;
        this.playerCurrentDirection =  targetX >= this.world.centerX ? 1 : -1;        
        isMoving = true;
    }
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

Game.prototype.movePlayer = function() {

    var inc = this.playerCurrentSpeed * this.playerCurrentDirection;

    if (this.navePlayer.x + inc >= this.worldOffsetH && this.navePlayer.x + inc  <= this.world.width - this.worldOffsetH) {
        this.navePlayer.x += inc;
    }
}

Game.prototype.fireBullet = function() {
    
}

Game.prototype.buildLevel = function() { 
    // Creamos el player
    this.navePlayer = this.add.sprite(this.world.centerX, this.world.height - this.worldOffsetV, 'navePlayer');
    this.navePlayer.anchor.setTo(0.5, 1);    
    
    // La posicion del primer alien en X la calculamos así: centroaAntallaX - (totalAliens/2 * ancho) + (ancho * 0.5) 
    var startXpos = this.world.centerX - (this.LEVELS_DEFINITION[this.level][0].length/2 * this.enemyWidth) + (this.enemyWidth * 0.5);
   
    // La posicion en Y de los aliens empieza a partir de 100 + el alto de cada alien + un espacio de 20 pixels
    var startYpos = 100;            
    
    this.alienGroup = this.add.group();
    this.alienGroup.enableBody = true;
    
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
    console.log("Creado el escuadron de aliens del nivel: " + this.level + 1);
}

module.exports = Game;
