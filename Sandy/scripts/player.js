var Player = function(game,x,y,sprite) {
    // CONSTANTS
    this.X_VELOCITY = 150;
    this.JUMP_VELOCITY = 600;
    this.FIRE_RATE = 300;
    this.MAX_LIFE = 100;

    // VARIABLES
    this.life = this.MAX_LIFE;
    this.nextFire = 0;
    this.facing = "right";

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

    //bullets group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

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
    var ctrlKeyPressed = this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL);

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

    if (ctrlKeyPressed) {
        this.shoot();
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
    this.facing = "left";
}

Player.prototype.moveRight = function() {
    this.body.velocity.x = this.X_VELOCITY;
    this.animations.play('right');
    this.facing = "right";
}

Player.prototype.standStill = function() {
    this.animations.stop();
    if (this.facing === "right") {
        this.frame = 3;
    } else {
        this.frame = 4;
    }
}

Player.prototype.run = function() {
    this.body.velocity.x *= 2;
}

Player.prototype.getItem = function(player, item) {
    if (player.life + item.lifeToHeal >= player.MAX_LIFE)
        player.life = 100;
    else
        player.life += item.lifeToHeal;

    item.destroy();
}

Player.prototype.receiveHit = function(damage) {
    this.life -= damage;
}

Player.prototype.shoot = function() {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.FIRE_RATE;

        var bullet = this.bullets.getFirstDead();

        bullet.reset(this.x, this.y);

        var bulletXTarget = this.facing === 'right' ? this.x + 1 : this.x - 1;

        this.game.physics.arcade.moveToXY(bullet, bulletXTarget, this.y, 500);
    }
}