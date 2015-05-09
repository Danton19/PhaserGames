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
    
    // Enemies
    this.enemies = this.game.add.group();
    this.enemies.add(new Enemy(this.game));
    
    // Finally add player (over everything else)
    this.player = new Player(this.game);

    // CAMERA
    this.game.world.setBounds(0, 0, 3000, GAME_HEIGHT);
    this.game.camera.follow(this.player);
};

GameState.prototype.update = function() {
    this.game.physics.arcade.collide(this.enemies, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.enemies, this.player);//, this.player.damageHit, null, this); // TODO: Investigar que hace el parametro que esta en null
    //this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.player, this.level.blockedLayer);

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