'use strict';

/**
*  Plugin for shake effect for camera
*/

Phaser.Plugin.CameraShake = function(game, parent) {
    Phaser.Plugin.call(this, game, parent);

    //settings by default
    this._settings = {
        //shake screen
        shakeRange: 20,
        shakeCount: 10,
        shakeInterval: 20,
        randomShake: false,
        randomizeInterval: true,
        shakeAxis: 'xy', //xy x y
    };
    this.game.camera.bounds = null;
    this.shaking = false;
    
    /**
    * camera shake function
    */
    this._shakeCamera = function () {
        this.temp_cnt = this._settings.shakeCount;
        //this.camera_current_position =  this.game.camera; 
        this.shake_timer = this.game.time.create(false);

        this.shake_timer.loop(this._settings.randomizeInterval ? (Math.random() * this._settings.shakeInterval + this._settings.shakeInterval) : this._settings.shakeInterval, function () {
            if (this._settings.shakeCount <= 0) {
                //if shake end set camera to default position
                this.game.camera.position = {x: 0, y: 0};//this.camera_current_position;
                //stop shake timer
                this.shake_timer.stop();
                //restore value of shakeCount
                this._settings.shakeCount = this.temp_cnt;
                // let shaking again
                this.shaking = false;
                return;
            }
            
            var shift1, shift2;
            
            if (this._settings.randomShake) {
                // if uneven shifts in the coordinates
                var shift1 = this.game.rnd.integerInRange(-this._settings.shakeRange * 0.5, this._settings.shakeRange * 0.5);
                var shift1 = this.game.rnd.integerInRange(-this._settings.shakeRange * 0.5, this._settings.shakeRange * 0.5);
            }
            else {
                // if regulart shifts
                if (this._settings.shakeCount % 2) {
                    shift1 = shift2 = -this._settings.shakeRange * 0.5;
                }
                else {
                    shift1 = shift2 = this._settings.shakeRange * 0.5;
                }
            }
            
            if (this._settings.shakeAxis != "y") this.game.camera.x += shift1;
            if (this._settings.shakeAxis != "x") this.game.camera.y += shift2;
            
            this._settings.shakeCount--;
            console.log(this._settings.shakeCount);
        }, this);
        
        this.shake_timer.start();
        
        
    };
};

Phaser.Plugin.CameraShake.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.CameraShake.prototype.constructor = Phaser.Plugin.CameraShake;

/**
 * Change default settings object values with passed object value.
 *
 * @method Phaser.Plugin.CameraShake#setup
 * @param {object} [obj] - Passed object to merge
 */
Phaser.Plugin.CameraShake.prototype.setup = function (obj) {
    this._settings = Phaser.Utils.extend(false, this._settings, obj);
};

Phaser.Plugin.CameraShake.prototype.shake = function() {
    if (!this.shaking) {
        this._shakeCamera();
        this.shaking = true;
    }
}