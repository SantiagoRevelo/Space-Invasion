function Game() {
    this.navePlayer;
    this.PLAYER_SPEED = 10;
    
    this.singleEnemy;
    this.enemyWidth = 50;
    this.enemyHeight = 50;
    this.enemyDir = 1;
    this.alienSpeed = 10;
    
    this.level = 0;
    this.levelDef = [
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
    
    this.worldOffsetH;
    this.worldOffsetV;
    this.worldLimit;
    this.myTimer;
    this.steps;
}

Game.prototype.create = function () {
    
    
    this.level = 0;
    
    this.worldOffsetH = 40;
    this.worldOffsetV = 20;
    this.worldLimit = this.world.width - this.worldOffsetH;
    this.myTimer = 0;
    this.steps = 1;
    
    
    
    this.buildLevel();     
};

Game.prototype.update = function () {
    this.myTimer += this.time.elapsed;
    
    if (this.myTimer >= 800) {
        this.myTimer %= 800;
        
        var goDown = false;
        var alienIncH = this.enemyDir * this.alienSpeed;
        
        
        for (var i=0; i < this.alienGroup.length && !goDown; i++) {
            if (this.alienGroup.children[i].x + alienIncH <= this.worldOffsetH) {
                goDown = true;
                console.log("godown");
            }
            if (this.alienGroup.children[i].x + alienIncH >= this.worldLimit ) {
                goDown = true;
                console.log("godown");
            }
        }
                
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
    if (this.input.activePointer.isDown)
    {
        var targetX = this.input.activePointer.position.x;
        var direction =  targetX >= this.world.centerX ? 1 : -1;
        var inc = this.PLAYER_SPEED * direction;
        
        if (this.navePlayer.x + inc >= this.worldOffsetH && this.navePlayer.x + inc  <= this.world.width - this.worldOffsetH) {
            this.navePlayer.x += this.PLAYER_SPEED * direction;
        }
        console.log("this.navePlayer.x: " + this.navePlayer.x);
    }    
}    

Game.prototype.buildLevel = function() { 
    // Creamos el player
    this.navePlayer = this.add.sprite(this.world.centerX, this.world.height - this.worldOffsetV, 'navePlayer');
    this.navePlayer.anchor.setTo(0.5, 1);    
    
    // La posicion del primer alien en X la calculamos así: centroaAntallaX - (totalAliens/2 * ancho) + (ancho * 0.5) 
    var startXpos = this.world.centerX - (this.levelDef[this.level][0].length/2 * this.enemyWidth) + (this.enemyWidth * 0.5);
   
    // La posicion en Y de los aliens empieza a partir de 100 + el alto de cada alien + un espacio de 20 pixels
    var startYpos = 100;            
    
    this.alienGroup = this.add.group();
    this.alienGroup.enableBody = true;
    
    for (var i = 0; i < this.levelDef[this.level].length; i++) { // filas
        for (var j = 0; j < this.levelDef[this.level][i].length; j++) { // columnas
            // El valor 0 es una posicion vacía
            if (this.levelDef[this.level][i][j] != 0) {
                var alienName = "alien" + this.levelDef[this.   level][i][j];

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
