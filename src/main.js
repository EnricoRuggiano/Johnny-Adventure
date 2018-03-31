var controls;
//FLAG
var CAMERA_FLAG = false;

function main() {


    var config = {
        type: Phaser.AUTO,
        width: 1260,
        height: 765,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var score = 0;
    var scoreText;


    function preload() {


        this.load.image('bar', 'assets/1260x765/bar-01.png');
        this.load.image('johnny_std', 'assets/1260x765/JN-STD.png');


        this.load.spritesheet('walk_right', 'assets/1260x765/sprite/walk_right.png', {
            frameWidth: 277,
            frameHeight: 277
        });
        this.load.spritesheet('walk_left', 'assets/1260x765/sprite/walk_left.png', {frameWidth: 277, frameHeight: 277});

    }

    function create() {

        this.add.image(0, 0, 'bar').setOrigin(0, 0);
        this.physics.world.setBounds(0, 0, 1800, 720);
        this.physics.world.setBoundsCollision(true, true, true, true);


        //player
        player = this.physics.add.sprite(154, 520, 'johnny_std');
        player.setCollideWorldBounds(true);


        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('walk_left', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stand',
            frames: [{key: 'johnny_std', frame: null}],
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('walk_right', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });


        //score
        scoreText = this.add.text(32, 32, 'Score 0', {fontsize: '32px', fill: "#FFFFFF"});

        //cursor
        cursors = this.input.keyboard.createCursorKeys();

        //camera
        setup.call(this);
    }

    function update(time, delta) {

        if (cursors.left.isDown) {
            player.setVelocityX(-200);

            player.anims.play('walk_left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(200);

            player.anims.play('walk_right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('stand');
        }

        if(CAMERA_FLAG === true){
            controls.update(delta);
        }

    }
}