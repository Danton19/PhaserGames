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
    this.items = this.game.add.group();
    this.items.enableBody = true;
    this.createItems();

};

Level.prototype = Object.create(Phaser.Tilemap.prototype);
Level.prototype.constructor= Level;

Level.prototype.createItems=function() {
    //create items
    var item;    
    result = this.findObjectsByType('item', this, 'objectLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
};

Level.prototype.findObjectsByType = function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
};

Level.prototype.createFromTiledObject= function(element, group) {
    //var sprite = group.create(new Item(this.game,element.x, element.y, element.properties.sprite));
       var sprite=group.add(new Item(this.game,element.x, element.y, element.properties.sprite));

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  };