Phaser.Filter.BulgePinchFilter = function (game) {

    Phaser.Filter.call(this, game);
    
    this.uniforms.radius = { type: '1f', value: 600 };
    this.uniforms.strength = { type: '1f', value: 0.8 };
    this.uniforms.center = { type: 'v2', value: {x: 640, y: 360} };
    this.uniforms.texSize= { type: 'v2', value: {x: 640, y:360 } };
        
    this.fragmentSrc = [
        'precision mediump float;',
        'uniform float radius;',
        'uniform float strength;',
        'uniform vec2 center;',
        'uniform sampler2D uSampler;',
        'uniform vec2 texSize;',
        'varying vec2 vTextureCoord;',

        // Main filter
        "void main(void) {",
        
            'vec2 coord = vTextureCoord * texSize;',
            'coord -= center;',
            'float distance = length(coord);',
            'if (distance < radius) {',
                'float percent = distance / radius;',
                'if (strength > 0.0) {',
                    'coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);',
                '} else {',
                    'coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);',
                '}',
            '}',
            'coord += center;',
            'gl_FragColor = texture2D(uSampler, coord / texSize);',
            'vec2 clampedCoord = clamp(coord, vec2(0.0), texSize);',
            'if (coord != clampedCoord) {',
                'gl_FragColor.a *= max(0.0, 1.0 - length(coord - clampedCoord));',
            '}',
        '}'
    ];
};

Phaser.Filter.BulgePinchFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BulgePinchFilter.prototype.constructor = Phaser.Filter.FilmGrain;

Object.defineProperty(Phaser.Filter.BulgePinchFilter.prototype, 'radius', {

    get: function() {
        return this.uniforms.radius.value;
    },

    set: function(value) {
        this.uniforms.radius.value = value;
    }

});

Object.defineProperty(Phaser.Filter.BulgePinchFilter.prototype, 'strength', {

    get: function() {
        return this.uniforms.strength.value;
    },

    set: function(value) {
        this.uniforms.strength.value = Math.max(0, Math.min(value, 1));
    }

});