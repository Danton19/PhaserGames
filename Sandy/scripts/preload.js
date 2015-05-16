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

        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //LEVEL TEST
        this.load.tilemap('level0', 'levels/lvl0.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('dirt', 'images/plainDirt0.png');
        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/ground.png');
        //this.game.load.spritesheet('heart','images/heartsheet.png',41,35);
        this.game.load.spritesheet('heart','images/heartsheet2.png',123,106);
        //this.game.load.spritesheet('player', 'images/player.png', 32, 48);
        this.game.load.spritesheet('player', 'images/sandysheet.png', 17, 24);
        // ENEMIES
        this.game.load.spritesheet('darkEnemy','images/enemies/dark_enemy.png', 32, 48);

        // MENU
        this.game.load.image('menu_title', 'images/menu/menu_game_title.png');
        this.game.load.image('menu_arrow', 'images/menu/menu_arrow.png');
        this.game.load.image('menu_button1', 'images/menu/menu_button.png');
        this.game.load.image('menu_button2', 'images/menu/menu_button2.png');
        this.game.load.image('menu_button3', 'images/menu/menu_button3.png');
        
        // AUDIO
    },
    
    create: function () {
        this.asset.cropEnabled = false;
    },

    update: function() {
      if(!!this.ready) {
        this.game.state.start('menu');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
    }
};