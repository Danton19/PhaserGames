var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
    var GAME_WIDTH = this.game.width;
    var GAME_HEIGHT = this.game.height;

    this.goFullScreen();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE); 
    // Level creation
    this.level = new Level(this.game);
    // Player
    //this.player = new Player(this.game);
    // CAMERA
    this.game.camera.follow(this.level.player);
    this.game.camera.checkWorldBounds = true;
};

GameState.prototype.update = function() {
    //collide(object1, object2, collideCallback, processCallback, callbackContext)

    this.game.physics.arcade.collide(this.level.enemies, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.enemies, this.level.player);
    this.game.physics.arcade.collide(this.level.player, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.items, this.level.blockedLayer);
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