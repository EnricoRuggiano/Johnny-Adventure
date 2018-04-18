function Characters(game){
    return{
        kora: game.add.sprite(1392.92, 332.89).setInteractive().setOrigin(0, 0),
        scarlet: game.add.sprite(505.22, 284.33).setInteractive().setOrigin(0, 0),
        jim: game.add.sprite(658.56, 302.88).setInteractive().setOrigin(0, 0),
        sara: game.add.sprite(784.36, 275.31).setInteractive().setOrigin(0, 0),

        init: function(){
            this.kora.anims.play('kora', true);
            this.scarlet.anims.play('scarlet', true);
            this.jim.anims.play('jim', true);
            this.sara.anims.play('sara', true);
        }
    }
}