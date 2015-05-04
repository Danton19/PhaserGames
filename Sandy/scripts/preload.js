var BasicGame = {};

BasicGame.Preload = function (game) {
    this.preloadBar = null;
};

BasicGame.Preload.prototype = {
    preload: function () {
        //LEVEL TEST
        this.load.tilemap('level0', 'levels/lvl0.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('dirt', 'images/plainDirt0.png');
        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/ground.png');
        //this.game.load.image('ocean', 'images/ocean.png');
        this.game.load.spritesheet('player', 'images/player.png', 32, 48);
        
        // AUDIO
    },
    
    create: function () {
        this.state.start('game');
    }
};