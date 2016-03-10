function Game() {
    this.navePlayer;
    this.PLAYER_SPEED = 10;
    
    this.singleEnemy;
    this.enemyWidth = 50;
    this.enemyHeight = 50;
    
    this.level = 0;
    this.levelDef = [
        //level1
        [
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0]
        ],
        //level2
        [],
        //level3
        []
    ];
    
    
    
    this.myTimer;
    this.steps;
}

Game.prototype.create = function () {

    this.navePlayer = this.add.sprite(this.world.centerX, this.world.height - 10, 'navePlayer');
    this.navePlayer.anchor.setTo(0.5, 1);    
    this.level = 0;
    this.buildLevel();     
};

Game.prototype.update = function () {
    this.myTimer += this.time.elapsed;
    
    if (this.myTimer >= 1000) {
        this.myTimer %= 1000;
        this.alienGroup.x += 10; 
    }
    this.checkInput();
   
};

Game.prototype.checkInput = function() {
    if (this.input.activePointer.isDown)
    {
        var targetX = this.input.activePointer.position.x;
        var direction =  targetX >= this.world.centerX ? 1 : -1;
        this.navePlayer.x += this.PLAYER_SPEED * direction;
        console.log("this.navePlayer.x: " + this.navePlayer.x);
    }
    
}    

Game.prototype.buildLevel = function() {    
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
                alien.play('step1', 5);
                console.log("Creado " + alienName  + "[" + i + "," + j + "]");
            }
        }
    }
    console.log("Creado el escuadron de aliens del nivel: " + this.level + 1);
}

module.exports = Game;
