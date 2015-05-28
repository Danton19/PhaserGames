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

        //LEVEL 1
        this.load.tilemap('level0', 'levels/lvl0.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level1', 'levels/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('dirt', 'images/plainDirt0.png');
        this.game.load.image('sandFloorSheet', 'images/sandFloorSheet.png');
        this.game.load.spritesheet('door','images/door.png',27,29);
        this.game.load.spritesheet('onlyDoor','images/onlyDoor.png',27,29);
        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/ground.png');
        this.game.load.image('gameOver','images/game-over.png',400,300);
        //this.game.load.spritesheet('heart','images/heartsheet.png',41,35);
        this.game.load.spritesheet('heart','images/heartsheet2.png',123,106);
        //this.game.load.spritesheet('player', 'images/player.png', 32, 48);
        this.game.load.spritesheet('player', 'images/sandysheet2.png', 17, 24);
        this.game.load.image('bullet', 'images/bullet.png');
        // ENEMIES
        this.game.load.spritesheet('darkEnemy','images/enemies/dark_enemy.png', 32, 48);
        this.game.load.spritesheet('crabAttack','images/crabbyattack2.png', 43, 12);

        // MENU
        this.game.load.image('menu_title', 'images/menu/menu_game_title.png');
        this.game.load.image('menu_arrow', 'images/menu/menu_arrow.png');
        this.game.load.image('menu_button1', 'images/menu/menu_button.png');
        this.game.load.image('menu_button2', 'images/menu/menu_button2.png');
        this.game.load.image('menu_button3', 'images/menu/menu_button3.png');

        //HUD
        //healthBar
        this.game.load.image('healthBar', 'images/healthBar.png');
        this.game.load.image('healthBarBG', 'images/healthBarBG.png');
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