var Platform = function(game, platforms, x, y, spriteName) {
    var platform;

    platform = platforms.create(x, y, spriteName);
    platform.body.immovable = true;
    platform.width = game.width;

    return platform;
};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;