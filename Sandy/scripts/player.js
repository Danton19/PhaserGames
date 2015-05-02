var Player = function(game) {
    var player;

    player = game.add.sprite(100, 100, 'player');
    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5);

    // player.body.bounce.y = 0.0;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = false;

    player.life = 100;
    
    return player;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;