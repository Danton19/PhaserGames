BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {
    	this.game.load.image('preloader', 'images/preloader.png');
    },

    create: function () {
        this.game.stage.backgroundColor = 0x112233;

        // TODO: See if I can move this
		//this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.state.start('preload');
    }
};