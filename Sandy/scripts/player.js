var UP_KEY = Phaser.Keyboard.UP;
var LEFT_KEY = Phaser.Keyboard.LEFT;
var RIGHT_KEY = Phaser.Keyboard.RIGHT;

var Player = function(game) {

    Phaser.Sprite.call(this, game, 100, 100, 'player');
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.bounce.y = 0.0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = false;
    
    //  Our two animations, walking left and right.
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    // GAME VARIABLES
    this.life = 100;

    this.game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    this.handleKeys();  
};

Player.prototype.handleKeys = function () {

    // keep the key from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([UP_KEY, LEFT_KEY, RIGHT_KEY]);

    upKeyPressed = this.game.input.keyboard.isDown(UP_KEY);
    leftKeyPressed = this.game.input.keyboard.isDown(LEFT_KEY);
    rightKeyPressed = this.game.input.keyboard.isDown(RIGHT_KEY);

    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;

    if (upKeyPressed) {
        this.jump();
    };

    if (leftKeyPressed) {
        this.moveLeft();
    } else if (rightKeyPressed) {
        this.moveRight();
    } else {
        this.standStill();
    }
};

Player.prototype.jump = function() {

    //  Allow the player to jump only if they are touching the ground.
    if (this.body.touching.down)
    {
        this.body.velocity.y = -500;
    }
};

Player.prototype.moveLeft = function() {

    this.body.velocity.x = -150;
    this.animations.play('left');
}

Player.prototype.moveRight = function() {

    this.body.velocity.x = 150;
    this.animations.play('right');
}

Player.prototype.standStill = function() {
    
    this.animations.stop();
    this.frame = 4;
}