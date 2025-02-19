var Level = function(game)
{
	//LEVEL TEST
	//Phaser.Tilemap.call(this,game,'level0');
    Phaser.Tilemap.call(this,game,'level1');
    //this.map = this.game.add.tilemap('level0');

    //add the tileset as named in Tiled
    this.addTilesetImage('sandFloorSheet', 'sandFloorSheet');
    this.addTilesetImage('sky', 'sky');
    this.addTilesetImage('player', 'player');

    //create layers(bloqued = collision layer)
    this.backgroundlayer = this.createLayer('backgroundLayer');
    this.blockedLayer = this.createLayer('blockLayer');

    //collision on blockedLayer(1300 number get it from level .json file)
    this.setCollisionBetween(1, 2000, true, 'blockLayer');

    //resizes the game world to match the layer dimensions....dont know why JAJA
    this.backgroundlayer.resizeWorld();  
    this.items = this.game.add.group();
    this.items.enableBody = true;
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    //winpointDoor creation
    this.winPointPos=this.findObjectsByType('point',this, 'objectLayer');
    this.winPoint=this.game.add.sprite(this.winPointPos[0].x,this.winPointPos[0].y,this.winPointPos[0].properties.sprite,0);
    this.game.physics.arcade.enableBody(this.winPoint);
    this.winPoint.scale.setTo(2,2);
    this.winPoint.animations.add('open', [0, 1, 2], 8, false);
    //player creation
    this.playerPos=this.findObjectsByType('player',this, 'objectLayer');
    this.player=new Player(this.game,this.playerPos[0].x,this.playerPos[0].y,this.playerPos[0].properties.sprite);
    //rest of the objects
    this.createObjects('item',this.items);
    this.createObjects('enemy',this.enemies);

};

Level.prototype = Object.create(Phaser.Tilemap.prototype);
Level.prototype.constructor = Level;

Level.prototype.createObjects = function(type,group) {
    //create items
    var item;    
    result = this.findObjectsByType(type, this, 'objectLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, group);
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

Level.prototype.createFromTiledObject = function(element, group) {
    var sprite
    if(group==this.items)
       sprite=group.add(new Item(this.game,element.x, element.y, element.properties.sprite));
    else
        sprite=group.add(new Enemy(this.game,this.player,element.x, element.y, element.properties.sprite));

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
};