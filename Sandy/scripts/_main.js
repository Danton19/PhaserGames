var lifeText = null;

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

    // CAMERA
    this.game.camera.follow(this.level.player);
    this.game.camera.checkWorldBounds = true;

    // HUD
    this.hud = new HUD(this.game, this.level.player);
};

GameState.prototype.update = function() {
    //collide(object1, object2, collideCallback, processCallback, callbackContext)
    
    this.game.physics.arcade.collide(this.level.enemies, this.level.player);
    this.game.physics.arcade.collide(this.level.enemies, this.level.player.bullets, this.bulletHitsEnemy);
    this.game.physics.arcade.collide(this.level.enemies, this.level.enemies);
    this.game.physics.arcade.overlap(this.level.player, this.level.items, this.level.player.getItem);
    
    // COLLISIONS WITH LAYERS
    this.game.physics.arcade.collide(this.level.enemies, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.player, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.player.bullets, this.level.blockedLayer, this.bulletHitsLayer);
    this.game.physics.arcade.collide(this.level.items, this.level.blockedLayer);

    // TODO: Fix the automatic update, so we don't have to call it manually here
    this.hud.update();
};

GameState.prototype.goFullScreen = function() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.forceLandscape = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.setMaximum();
    this.game.scale.setScreenSize(true);
    this.game.scale.refresh();
};

GameState.prototype.reStart = function() {
    this.create();
};


// TODO: See the way to move this functions to respective objects
GameState.prototype.bulletHitsEnemy = function(enemy, bullet) {
    enemy.kill();
    bullet.kill();
};

GameState.prototype.bulletHitsLayer = function(bullet) {
    bullet.kill();
};