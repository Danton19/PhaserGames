var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
    this.goFullScreen();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');

    //GROUND // TODO: Move to different class as in player // see: http://www.codevinsky.com/phaser-2-0-tutorial-flappy-bird-part-2/
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    this.ground.body.immovable = true;
    this.ground.width = this.game.width;
    
    // create a new Player object
    this.player = new Player(this.game);
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