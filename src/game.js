function Game() {
    this.navePlayer;
    this.singleEnemy;
    this.level;
    this.levelDef = [
        //level1
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0],
        ],
        //level2
        [],
        //level3
        []
    ]
}

Game.prototype.create = function () {
    this.input.onDown.add(this.onInputDown, this);
    
    this.navePlayer = this.add.sprite(this.world.centerX, this.world.height - 50, 'player').anchor.setTo(0.5);
    
    this.level = 0;
    this.buildLevel();
};

Game.prototype.buildLevel = function() {
    
    // La posicion del primer alien en X la calculamos así: centroaAntallaX - (totalAliens/2 * ancho) + (ancho * 0.5) 
    var startXpos = this.world.centerX - (this.levelDef[this.level][0].length/2 * 100) + 50;
    // La posicion en Y de los aliens empieza a partir de 100 + el alto de cada alien + un espacio de 20 pixels
    var startYpos = 200;
            
    this.alienGroup = this.add.group();
    this.alienGroup.enableBody = true;
    for (var i = 0; i < this.levelDef[this.level].length; i++) { // filas
        for (var j = 0; j < this.levelDef[this.level][i].length; j++) { // columnas
            // El valor 0 es una posicion vacía
            if (this.levelDef[this.level][i][j] != 0) {
                var alienName = "alien" + this.levelDef[this.level][i][j];

                var alien = this.alienGroup.create(startXpos + (j * 100), startYpos + (100 * i), alienName, 1);
                alien.anchor.setTo(0.5, 0.5);
                alien.body.moves = false;
                alien.animations.add('step1',[0], 1);
                alien.animations.add('step2',[1], 1);
                alien.play('step1', 5);
                console.log("Creado " + alienName  + "[" + i + "," + j + "]");
            }
            //console.log("[i,j] = [" + i + "," + j + "]");
        }
    }
    console.log("Creado el escuadron de aliens del nivel: " + this.level);
}

Game.prototype.update = function () {};

Game.prototype.onInputDown = function () {
  this.game.state.start('menu');
};

module.exports = Game;
