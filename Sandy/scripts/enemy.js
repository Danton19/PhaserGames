var Enemy = function(game) {
    // CONSTANTS
    this.SPEED = 100;
    this.NEXT_STATE_TIMELAPSE = 800;

    // VARIABLES
    this.life = 100;
    this.states = ['moveLeft', 'stop', 'moveRight', 'stop'];
    this.currentStateCounter = 0;
    this.nextStateTime = 0;

    Phaser.Sprite.call(this, game, 600, 300, 'darkEnemy');
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.bounce.y = 0.0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = false;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    this.game.add.existing(this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(game) {
    this.decidePath();
};

Enemy.prototype.decidePath = function(game) {
    var now = this.game.time.now;
    
    if (now > this.nextStateTime) {
        var statesLength = this.states.length;

        // http://www.gamedev.net/topic/642433-modulus-operator-usage/
        var nextStateIndex = this.currentStateCounter % statesLength;
        this[this.states[nextStateIndex]]();

        this.currentStateCounter++;
        this.nextStateTime = now + this.NEXT_STATE_TIMELAPSE;
    };
};

Enemy.prototype.stop = function(game) {
    this.animations.stop();
    this.body.velocity.x = 0;
};

Enemy.prototype.moveLeft = function(game) {
    this.animations.play("left");
    this.body.velocity.x = -this.SPEED;
};

Enemy.prototype.moveRight = function(game) {
    this.animations.play("right");
    this.body.velocity.x = this.SPEED;
};