/**
* @author Julien CLEREL @JuloxRox
* original filter https://github.com/evanw/glfx.js/blob/master/src/filters/warp/bulgepinch.js by Evan Wallace : http://madebyevan.com/
*/

/**
* @filter Bulge / Pinch
* @description Bulges or pinches the image in a circle.
* @param center The x and y coordinates of the center of the circle of effect.
* @param radius The radius of the circle of effect.
* @param strength -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
*
* @class BulgePinch
* @extends AbstractFilter
* @constructor
*/
Phaser.Filter.BulgePinch = function (game) {

    Phaser.Filter.call(this, game);    
    
    this.uniforms.radius    = { type: '1f', value: 0.1 };
    this.uniforms.strength  = { type: '1f', value: 0.0 };
    this.uniforms.center    = { type: 'v2', value: {x: 640, y: 360} }
        
    this.fragmentSrc = [
        
            "precision mediump float;",
            "uniform float radius;",
            "uniform float strength;",
            "uniform vec2 center;",
            "uniform sampler2D uSampler;",
            "uniform vec4 dimensions;",
            "varying vec2 vTextureCoord;",

            "void main(void) {",
                "vec2 coord = vTextureCoord * dimensions.xy;",
                "coord -= center;",
                "float distance = length(coord);",
                "if (distance < radius) {",
                    "float percent = distance / radius;",
                    "if (strength > 0.0) {",
                        "coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);",
                    "} else {",
                        "coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);",
                    "}",
                "}",
                "coord += center;",
                "gl_FragColor = texture2D(uSampler, coord / dimensions.xy);",
                "vec2 clampedCoord = clamp(coord, vec2(0.0), dimensions.xy);",
                "if (coord != clampedCoord) {",
                    "gl_FragColor.a *= max(0.0, 1.0 - length(coord - clampedCoord));",
                "}",
            "}"
        ];
};

Phaser.Filter.BulgePinch.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BulgePinch.prototype.constructor = Phaser.Filter.BulgePinch;


Object.defineProperty(Phaser.Filter.BulgePinch.prototype, 'radius', {

    get: function() {
        return this.uniforms.radius.value;
    },

    set: function(value) {
        this.uniforms.radius.value = value;
    }
});

Object.defineProperty(Phaser.Filter.BulgePinch.prototype, 'strength', {

    get: function() {
        return this.uniforms.strength.value;
    },

    set: function(value) {
        this.uniforms.strength.value = value;
    }
});

Object.defineProperty(Phaser.Filter.BulgePinch.prototype, 'center', {

    get: function() {
        return this.uniforms.center.value;
    },

    set: function(value) {
        this.uniforms.center.value = value;
    }
});