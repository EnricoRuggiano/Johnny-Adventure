function preload(){

    // background
    this.load.image('bar', 'assets/1260x765/bar-03.png');

    // ambient
    this.load.image('amaro', 'assets/1260x765/objects/amaro.png');
    this.load.image('8ball', 'assets/1260x765/objects/8ball.png');
    this.load.image('banana', 'assets/1260x765/objects/banana.png');
    this.load.image('beer', 'assets/1260x765/objects/beer.png');
    this.load.image('filo', 'assets/1260x765/objects/filo.png');
    this.load.image('forbici_cut', 'assets/1260x765/objects/forbici_cut.png');

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

    // Johnny
    this.load.image('johnny_std', 'assets/1260x765/JN-STD.png');

    this.load.spritesheet('walk_right', 'assets/1260x765/sprite/walk_right.png', {
        frameWidth: 277,
        frameHeight: 277
    });
    this.load.spritesheet('walk_left', 'assets/1260x765/sprite/walk_left.png', {
        frameWidth: 277,
        frameHeight: 277
    });
}