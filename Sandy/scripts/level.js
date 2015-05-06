var Level = function(game)
{
	//LEVEL TEST
	Phaser.Tilemap.call(this,game,'level0');
    //this.map = this.game.add.tilemap('level0');

    //add the tileset as named in Tiled
    this.addTilesetImage('dirt', 'dirt');
    this.addTilesetImage('sky', 'sky');
    this.addTilesetImage('player', 'player');

    //create layers(bloqued = collision layer)
    this.backgroundlayer = this.createLayer('backgroundLayer');
    this.blockedLayer = this.createLayer('blockLayer');

    //collision on blockedLayer(1300 number get it from level .json file)
    this.setCollisionBetween(1, 1300, true, 'blockLayer');

    //resizes the game world to match the layer dimensions....dont know why JAJA
    this.backgroundlayer.resizeWorld();

};

Level.prototype = Object.create(Phaser.Tilemap.prototype);
Level.prototype.constructor= Level;