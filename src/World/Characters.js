function Characters(game){
    return{
        kora: game.add.sprite(1392.92, 332.89).setInteractive().setOrigin(0, 0),
        init: function(){
            this.kora.anims.play('kora', true)
        }
    }
}