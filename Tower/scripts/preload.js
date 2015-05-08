var BasicGame = {};

BasicGame.Preload = function (game) {
    this.asset = null;
    this.ready = false;
};

BasicGame.Preload.prototype = {
    preload: function () {
        // PRELOAD
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/platform.png');
        this.game.load.spritesheet('dude', 'images/dude.png', 32, 48);
        this.game.load.image('reset', 'images/reset.png');
        this.game.load.image('arrow','images/arrow.png');
        this.game.load.image('bullet','images/bullet.png');
        this.game.load.image('tower','images/Tower.png');
        
        // AUDIO
        //  Firefox doesn't support mp3 files, so use ogg
        this.game.load.audio('boden', ['audio/bodenstaendig_2000_in_rock_4bit.ogg']);
        this.game.load.audio('gameOverSnd', ['audio/Death.ogg']);
        this.game.load.audio('slashSnd', ['audio/Slash8-Bit.ogg']);
        this.game.load.audio('swishSnd', ['audio/Soft_Airy_Swish.ogg']);
    },

    create: function () {
        this.asset.cropEnabled = false;
    },

    update: function() {
      if(!!this.ready) {
        this.game.state.start('game');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
    }
};