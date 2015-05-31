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
    
    this.game.physics.arcade.collide(this.level.enemies, this.level.player.bullets, this.bulletHitsEnemy);
    this.game.physics.arcade.collide(this.level.enemies, this.level.player);
    this.game.physics.arcade.collide(this.level.enemies, this.level.enemies);
    this.game.physics.arcade.overlap(this.level.player, this.level.items, this.level.player.getItem);
    
    // COLLISIONS WITH LAYERS
    this.game.physics.arcade.collide(this.level.enemies, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.player, this.level.blockedLayer);
    this.game.physics.arcade.collide(this.level.player.bullets, this.level.blockedLayer, this.bulletHitsLayer);
    this.game.physics.arcade.collide(this.level.items, this.level.blockedLayer);
    
    //level win trigger
    this.game.physics.arcade.overlap(this.level.player, this.level.winPoint,this.winLevel,null,this);

    // TODO: Fix the automatic update, so we don't have to call it manually here
    this.hud.update();

    //GameOver
    if(this.level.player.life <= 0)
        this.gameOver();

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
    enemy.destroy();
    bullet.kill();
};

GameState.prototype.bulletHitsLayer = function(bullet) {
    bullet.kill();
};

//render bodies for testing
/*GameState.prototype.render=function () {

    this.game.debug.bodyInfo(this.level.player);
    this.game.debug.bodyInfo(this.level.winPoint);

};*/
GameState.prototype.gameOver= function(){
    this.level.player.destroy(true);
    this.gameOverImg = this.game.add.image(150,50,'gameOver');
    this.gameOverImg.fixedToCamera = true;
    this.gameOverImg.alpha = 0;
    this.game.add.tween(this.gameOverImg).to( { alpha: 1 }, 14000, "Linear", true);
};

GameState.prototype.winLevel=function () {
    if (this.level.player.body.onFloor() && this.level.player.x>=this.level.winPoint.x+27 && this.level.player.x <= this.level.winPoint.x+30){
        this.game.input.keyboard.reset();
        this.game.input.keyboard.enabled=false;
        this.level.player.body.velocity.x=0;
        //null door body,function run just once
        this.level.winPoint.body=null;
        //animations to finish
        anim=this.level.winPoint.animations.play('open');
        anim.onComplete.add(function(){

            this.closeDoor=this.game.add.sprite(this.level.winPointPos[0].x,this.level.winPointPos[0].y,'onlyDoor',2);
            this.closeDoor.scale.setTo(2,2);
            this.closeDoor.animations.add('close',[2,1,0],8,false);
            closeAnim=this.closeDoor.animations.play('close');
            closeAnim.onComplete.add(function(){

                this.winText=this.game.add.text(150,150,'CONGRATULATIONS!');
                this.winText.font = 'Press Start 2P';
                this.winText.fill = 'white';
                this.winText.strokeThickness = 2;
                this.winText.fixedToCamera=true;
                this.winText.alpha = 0.1;
                this.game.add.tween(this.winText).to( { alpha: 1 }, 2000, "Linear", true);
                this.level.player.destroy();
                this.game.input.keyboard.enabled=true;

            },this);

        }, this);
    }
};