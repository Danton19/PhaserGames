BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {
    },

    create: function () {
        this.game.stage.backgroundColor = 0x112233;

        this.state.start('preload');
    }
};