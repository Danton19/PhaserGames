var lifeText = null;

var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
    var GAME_WIDTH = this.game.width;
    var GAME_HEIGHT = this.game.height;

    // this.goFullScreen();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE); 

    // Level creation
    this.level = new Level(this.game);

    // CAMERA
    this.game.camera.follow(this.level.player);
    this.game.camera.checkWorldBounds = true;

    // HUD // TODO: Move all hud logic to separate class
    this.createHUD();
};

GameState.prototype.update = function() {
    //collide(object1, object2, collideCallback, processCallback, callbackContext)
    this.game.physics.arcade.collide(this.level.enemies, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.enemies, this.level.player);
    this.game.physics.arcade.collide(this.level.enemies, this.level.enemies);
    this.game.physics.arcade.collide(this.level.player, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.items, this.level.blockedLayer);

    this.updateHUD();
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

GameState.prototype.createHUD = function() {
    lifeText = this.game.add.text(this.level.player.x, this.level.player.y, "Life: ");
    lifeText.font = 'Press Start 2P';
    lifeText.fontSize = 30;
    lifeText.fill = 'white';
    lifeText.strokeThickness = 2;
}

GameState.prototype.updateHUD = function() {
    lifeText.setText('Life: ' + this.level.player.life);
    lifeText.x = this.game.camera.x + 10;
    lifeText.y = this.game.camera.y + 10;
}