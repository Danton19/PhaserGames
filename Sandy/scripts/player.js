var Player = function(game,x,y,sprite) {
    // CONSTANTS
    this.X_VELOCITY = 150;
    this.JUMP_VELOCITY = 500;

    // VARIABLES
    this.life = 100;

    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.bounce.y = 0.0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = false;
    
    // Our two animations, walking left and right.
   /* this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);*/
    this.animations.add('left', [7, 6, 5, 6], 10, true);
    this.animations.add('right', [0, 1, 2, 1], 10, true);
    this.scale.setTo(2,2);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(game) {
    this.handleKeys(game);
};

Player.prototype.handleKeys = function () {
    var upKeyPressed = this.cursors.up.isDown;
    var spacebarKeyPressed = this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    var leftKeyPressed = this.cursors.left.isDown;
    var rightKeyPressed = this.cursors.right.isDown;
    var shiftKeyPressed = this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);

    // Reset the players velocity (movement)
    this.body.velocity.x = 0;

    if (upKeyPressed || spacebarKeyPressed) {
        this.jump();
    };

    if (leftKeyPressed) {
        this.moveLeft();
    } else if (rightKeyPressed) {
        this.moveRight();
    } else {
        this.standStill();
    }

    if (shiftKeyPressed) {
        this.run();
    }
};

Player.prototype.jump = function() {
    //  Allow the player to jump only if they are touching the ground.
    if (this.body.onFloor())
    {
        this.body.velocity.y = -this.JUMP_VELOCITY;
    }
};

Player.prototype.moveLeft = function() {
    this.body.velocity.x = -this.X_VELOCITY;
    this.animations.play('left');
}

Player.prototype.moveRight = function() {
    this.body.velocity.x = this.X_VELOCITY;
    this.animations.play('right');
}

Player.prototype.standStill = function() {
    this.animations.stop();
    //this.frame = 4;
    this.frame = 3;
}

Player.prototype.run = function() {
    this.body.velocity.x *= 2;
}

Player.prototype.getItem = function(player, item) {
    player.life += item.lifeToHeal;
    item.destroy();
}

Player.prototype.receiveHit = function(damage) {
    this.life -= damage;
}
