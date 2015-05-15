var HUD = function(game, player) {
    this.game = game;
    this.player = player;

    this.lifeText = this.game.add.text(this.player.x, this.player.y, "Life: ");
    this.lifeText.font = 'Press Start 2P';
    this.lifeText.fontSize = 30;
    this.lifeText.fill = 'white';
    this.lifeText.strokeThickness = 2;
};

HUD.prototype = Object.create(Phaser.Text.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.update = function() {
    this.lifeText.setText('Life: ' + this.player.life);
    this.lifeText.x = this.game.camera.x + 10;
    this.lifeText.y = this.game.camera.y + 10;
};