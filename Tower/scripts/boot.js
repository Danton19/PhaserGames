BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {
        this.game.load.image('preloader', 'images/preloader.png');
    },

    create: function () {
        this.game.stage.backgroundColor = 0x666699;

        this.state.start('preload');
    }
};