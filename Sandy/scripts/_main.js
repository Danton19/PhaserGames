var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
    var GAME_WIDTH = this.game.width;
    var GAME_HEIGHT = this.game.height;

    this.goFullScreen();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'sky');

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    this.ground = new Platform(this.game, this.platforms, 0, GAME_HEIGHT - 64, 'ground');
    this.ground = new Platform(this.game, this.platforms, 0, GAME_HEIGHT, 'ocean');
    this.player = new Player(this.game);

    // CAMERA
    this.game.world.setBounds(0, 0, 3000, GAME_HEIGHT * 1.10);
    this.game.camera.follow(this.player);
};

GameState.prototype.update = function() {
    this.game.physics.arcade.collide(this.player, this.platforms);
};

GameState.prototype.goFullScreen = function() {
	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.forceLandscape = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setScreenSize(true);
};

GameState.prototype.reStart = function() {
    this.create();
};