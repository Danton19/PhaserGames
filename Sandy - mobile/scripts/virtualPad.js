var VirtualPad = function(game, player) {
    
    //this.game = game;
    this.player = player;
    this.moveL = true;
    // create our virtual game controller buttons 
    this.buttonjump = new Phaser.Button(game, 600, 500, 'btn-a', null, this);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    this.buttonjump.fixedToCamera = true;
    this.buttonjump.events.onInputDown.add(function(){this.jump=true;});
    this.buttonjump.events.onInputUp.add(function(){this.jump=false;});

    this.buttonAttack = game.add.button(700, 500, 'btn-b', null, this);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    this.buttonAttack.fixedToCamera = true;
    this.buttonAttack.events.onInputDown.add(function(){this.attack=true;});
    this.buttonAttack.events.onInputUp.add(function(){this.attack=false;});

    this.buttonleft = game.add.button(0, 20, 'btn-left', null, this);
    this.buttonleft.inputEnabled = true;
    this.buttonleft.fixedToCamera = true;
    this.buttonleft.events.onInputOver.add(function(){this.moveL=true;});
    this.buttonleft.events.onInputOut.add(function(){this.moveL=false;});
    this.buttonleft.events.onInputDown.add(function(){this.moveL=true;});
    this.buttonleft.events.onInputUp.add(function(){this.moveL=false;});

    this.buttonright = game.add.button(160, 472, 'btn-right', null, this);
    this.buttonright.fixedToCamera = true;
    this.buttonright.events.onInputDown.add(function(){this.moveR=true;});
    this.buttonright.events.onInputUp.add(function(){this.moveR=false;});

    //game.add.existing(this);
};

VirtualPad.prototype = Object.create(Phaser.Text.prototype);
VirtualPad.prototype.constructor = VirtualPad;

VirtualPad.prototype.update = function(game) {

    if(this.moveL){
        this.player.moveLeft();
    }
    if(this.moveR){
        this.player.moveRight();
    }
    if(this.jump){
        this.player.jump();
    }
    if(this.attack){
        this.player.shot();
    }
};