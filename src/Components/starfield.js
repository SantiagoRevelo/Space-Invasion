function Starfield(game, distance, speed, max) {
    this.distance   = distance  || 300;
    this.speed      = speed     || 2;
    this.max        = max       || 300;
    
    this.stars;
    
    this.xx = [];
    this.yy = [];
    this.zz = [];
    
    this.gameCtx = game; 
    this.create();
};

Starfield.prototype.create = function () {
    if (this.renderType === Phaser.WEBGL)
    {
       this.max = 2000;
    }
    
    var sprites = this.gameCtx.add.spriteBatch();

    this.stars = [];

    for (var i = 0; i < this.max; i++)
    {
        this.xx[i] = Math.floor(Math.random() * 800) - 400;
        this.yy[i] = Math.floor(Math.random() * 600) - 300;
        this.zz[i] = Math.floor(Math.random() * 1700) - 100;

        var star = this.gameCtx.make.sprite(0, 0, 'star');
        star.anchor.set(0.5);
       // star.perspective = 1;

        sprites.addChild(star);

        this.stars.push(star);
    }
};

Starfield.prototype.update = function() {
    for (var i = 0; i < this.max; i++)
    {
        this.stars[i].perspective = this.distance / (this.distance - this.zz[i]);
        this.stars[i].x = this.gameCtx.world.centerX + this.xx[i] * this.stars[i].perspective;
        this.stars[i].y = this.gameCtx.world.centerY + this.yy[i] * this.stars[i].perspective;

        this.zz[i] += this.speed;

        if (this.zz[i] > 290)
        {
            this.zz[i] -= 600;
        }

        this.stars[i].alpha = Math.min(this.stars[i].perspective / 2, 1);
        this.stars[i].scale.set(this.stars[i].perspective / 2);
        this.stars[i].rotation += 0.2;
    }
};