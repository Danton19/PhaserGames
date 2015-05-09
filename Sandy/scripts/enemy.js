var Enemy = function(game) {
    // CONSTANTS
    this.SPEED = 100;

    // VARIABLES
    this.life = 100;

    Phaser.Sprite.call(this, game, 550, 300, 'darkEnemy');
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
    this.move(game);
};

Enemy.prototype.move = function(game) {
    // TODO: Improve movement AI
    this.animations.play("left");
    this.body.velocity.x = -this.SPEED;
};

// Enemy.addEnemy = function(theGame, enemies) {
//     if (theGame.game.time.now > nextEnemyTime)
//     {
//         nextEnemyTime = theGame.game.time.now + 900;
//         enemies.add(new Enemy(theGame, enemies));
//     }
// };

// Enemy.enemyKill = function(enemy, bullet) {
//     slashSnd.play();
    
//     enemies.remove(enemy); // Better than "enemy.kill();" , unless we wanted to keep the sprite for using it in the future
//     enemiesKilled += 1;
    
//     bullet.kill();
//     score += 10;
//     scoreText.text = 'Score: ' + score;
//     enemiesKilledText.text = 'Enemies killed: ' + enemiesKilled + '/' + KILL_COUNT_TO_WIN;
    
//     if(enemiesKilled >= KILL_COUNT_TO_WIN) {
//         this.gameOver(this.playerWins = true); // player wins
//     }
// };