function preload(){

    // background
    this.load.image('bar', 'assets/1260x765/bar.png');

    // ambient
    this.load.image('amaro', 'assets/1260x765/objects/amaro.png');
    this.load.image('8ball', 'assets/1260x765/objects/8ball.png');
    this.load.image('banana', 'assets/1260x765/objects/banana.png');
    this.load.image('beer', 'assets/1260x765/objects/beer.png');
    this.load.image('filo', 'assets/1260x765/objects/filo.png');
    this.load.image('forbici_cut', 'assets/1260x765/objects/forbici_cut.png');
    this.load.image('front_table', 'assets/1260x765/objects/front_table.png');

    // hud
    this.load.image('arrow_l', 'assets/1260x765/hud/arrow_left.png');
    this.load.image('arrow_r', 'assets/1260x765/hud/arrow_right.png');
    this.load.image('Take', 'assets/1260x765/hud/hand_item.png');
    this.load.image('Money', 'assets/1260x765/hud/money_item.png');
    this.load.image('Dumbbell', 'assets/1260x765/hud/gym_item.png');
    this.load.image('Floppy Disk', 'assets/1260x765/hud/ibm_item.png');
    this.load.image('Whisky', 'assets/1260x765/hud/amaro_item.png');
    this.load.image('8 Ball', 'assets/1260x765/hud/8ball_item.png');
    this.load.image('Banana Peel', 'assets/1260x765/hud/banana_item.png');
    this.load.image('Beer', 'assets/1260x765/hud/beer_item.png');
    this.load.image('Film', 'assets/1260x765/hud/filo_item.png');
    this.load.image('Scissors', 'assets/1260x765/hud/forbici_item.png');


    this.load.spritesheet('insegna1', 'assets/1260x765/sprite/insegna1.png', {
        frameWidth: 325,
        frameHeight: 95
    });
    this.load.spritesheet('insegna2', 'assets/1260x765/sprite/insegna2.png', {
        frameWidth: 86.09,
        frameHeight: 151
    });
    this.load.spritesheet('insegna3', 'assets/1260x765/sprite/insegna3.png', {
        frameWidth: 101.34,
        frameHeight: 95.58
    });

    // CHARACTERS
    this.load.spritesheet('kora_idle', 'assets/1260x765/sprite/kora_idle.png', {
        frameWidth: 251.23 ,
        frameHeight: 305
    });

    this.load.image('scarlet_test', 'assets/1260x765/sprite/scarlet.png');
    this.load.image('jim_test', 'assets/1260x765/sprite/jim.png');
    this.load.image('sara_test', 'assets/1260x765/sprite/sara.png');

    // Johnny
    this.load.spritesheet('talk_right', 'assets/1260x765/sprite/talk_right.png', {
        frameWidth: 152.5000,
        frameHeight: 294
    });

    this.load.spritesheet('talk_left', 'assets/1260x765/sprite/talk_left.png', {
        frameWidth: 152.9700,
        frameHeight: 294
    });

    this.load.spritesheet('walk_right', 'assets/1260x765/sprite/walk_right.png', {
        frameWidth: 278.50000,
        frameHeight: 281
    });
    this.load.spritesheet('walk_left', 'assets/1260x765/sprite/walk_left.png', {
        frameWidth: 277.87,
        frameHeight: 281
    });
}