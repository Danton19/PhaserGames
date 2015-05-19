var HUD = function(game, player) {
    this.game = game;
    this.player = player;

    this.lifeText = this.game.add.text(this.player.x, this.player.y, "Life");
    this.lifeText.font = 'Press Start 2P';
    this.lifeText.fontSize = 18;
    this.lifeText.fill = 'white';
    this.lifeText.strokeThickness = 2;

    this.healthbarFrame=this.game.add.sprite(this.player.x, this.player.y,'healthBarBG');
    this.healthbarFrame.width=104;
    this.healthbar = this.game.add.sprite(this.player.x, this.player.y,'healthBar');
    this.healthbar.width = this.player.life;  

};

HUD.prototype = Object.create(Phaser.Text.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.update = function() {
    //tweens
    // if(!isTweening(this.healthbarEffects.))
    {
        this.healthbarEffects = this.game.add.tween(this.healthbar).to({width:this.player.life}, 300, Phaser.Easing.Elastic.None);
        this.healthbarEffects.start();
    }
    this.lifeText.x = this.game.camera.x + 10;
    this.lifeText.y = this.game.camera.y + 10;
    this.healthbar.x = this.game.camera.x + 90;
    this.healthbar.y = this.game.camera.y + 12;
    this.healthbarFrame.x = this.game.camera.x + 88;
    this.healthbarFrame.y = this.game.camera.y + 10;
};