var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
    var GAME_WIDTH = this.game.width;
    var GAME_HEIGHT = this.game.height;

    this.goFullScreen();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE); 

    //LEVEL TEST
    this.map = this.game.add.tilemap('level0');

    //add the tileset as named in Tiled
    this.map.addTilesetImage('dirt', 'dirt');
    this.map.addTilesetImage('sky', 'sky');
    this.map.addTilesetImage('player', 'player');

    //create layers(bloqued = collision layer)
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockLayer');

    //collision on blockedLayer(1300 nunmber get it from level .json file)
    this.map.setCollisionBetween(1, 1300, true, 'blockLayer');

    //resizes the game world to match the layer dimensions....dont know why JAJA
    this.backgroundlayer.resizeWorld();

    //finally add player (over everything else)
    this.player = new Player(this.game);

    // CAMERA
    this.game.world.setBounds(0, 0, this.backgroundlayer.width, GAME_HEIGHT);
    this.game.camera.follow(this.player);
};

GameState.prototype.update = function() {
    //this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
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