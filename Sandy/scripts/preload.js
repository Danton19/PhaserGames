var BasicGame = {};

BasicGame.Preload = function (game) {
    this.preloadBar = null;
};

BasicGame.Preload.prototype = {
    preload: function () {

        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/ground.png');
        this.game.load.spritesheet('player', 'images/player.png', 32, 48);
        
        // AUDIO
    },
    
    create: function () {
        this.state.start('game');
    }
};