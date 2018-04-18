function Scenario(game){
    return{
        background: game.add.image(0, 0, 'bar').setOrigin(0, 0),
        amaro:      null,
        ball:       null,
        banana:     null,
        beer:       game.add.image(817.61, 341.28, 'beer').setInteractive().setOrigin(0, 0).setName("Beer"),
        filo:       null,
        scissors:   null,
        table:      null,
        insegna1:   game.add.sprite(486, 80).setInteractive().setOrigin(0, 0).setName("Bar Sign"),
        insegna2:   game.add.sprite(1620, 222).setInteractive().setOrigin(0, 0).setName("Flamingo Sign"),
        insegna3:   game.add.sprite(1460, 209.15).setInteractive().setOrigin(0, 0).setName("Love Sign"),

        init: function(){
            this.insegna1.anims.play('insegna1', true);
            this.insegna2.anims.play('insegna2', true);
            this.insegna3.anims.play('insegna3', true);
        },

        front_init: function(){
            this.amaro  =   game.add.image(484.26, 318.80, 'amaro').setInteractive().setOrigin(0, 0).setName("Whisky");
            this.ball   =   game.add.image(242.93, 247.0, '8ball').setInteractive().setOrigin(0, 0).setName("8 Ball");
            this.banana =   game.add.image(1590, 202.56, 'banana').setInteractive().setOrigin(0, 0).setName("Banana Peel");
           // this.beer   =   game.add.image(817.61, 341.28, 'beer').setInteractive().setOrigin(0, 0).setName("Beer");
            this.filo   =   game.add.image(158.01, 239, 'filo').setInteractive().setOrigin(0, 0).setName("Film");
            this.scissors=  game.add.image(577.53, 333.01, 'forbici_cut').setInteractive().setOrigin(0, 0).setName("Scissors");
            this.table  =   game.add.image(1485.71 , 543.94, 'front_table').setInteractive().setOrigin(0, 0).setName("Table");
        }
    }
}