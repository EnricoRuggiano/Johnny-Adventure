function main() {

    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
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


        this.load.image('bar', 'assets/1260x765/bar-03.png');
        this.load.image('johnny_std', 'assets/1260x765/JN-STD.png');


        this.load.spritesheet('walk_right', 'assets/1260x765/sprite/walk_right.png', {
            frameWidth: 277,
            frameHeight: 277
        });
        this.load.spritesheet('walk_left', 'assets/1260x765/sprite/walk_left.png', {frameWidth: 277, frameHeight: 277});

		 // ambient
		
		 this.load.image('amaro', 'assets/1260x765/objects/amaro.png')
		 this.load.image('8ball', 'assets/1260x765/objects/8ball.png');
         this.load.image('banana', 'assets/1260x765/objects/banana.png')
		 this.load.image('beer', 'assets/1260x765/objects/beer.png');
		 this.load.image('filo', 'assets/1260x765/objects/filo.png')
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


		  // ambient
		
        this.add.image(484.26, 318.80, 'amaro').setOrigin(0, 0);
        this.add.image(242.93, 247.0, '8ball').setOrigin(0, 0);
		  this.add.image(1590, 202.56, 'banana').setOrigin(0, 0);
        this.add.image(817.61, 341.28, 'beer').setOrigin(0, 0);
        this.add.image(158.01, 239, 'filo').setOrigin(0, 0);
        this.add.image(577.53, 333.01, 'forbici_cut').setOrigin(0, 0);
		  

		  this.anims.create({
				key: 'insegna1',
            frames: this.anims.generateFrameNumbers('insegna1', {start: 0, end: 7}),
            frameRate: 8,
            repeat: -1
		  });

			 this.anims.create({
				key: 'insegna2',
            frames: this.anims.generateFrameNumbers('insegna2', {start: 0, end: 7}),
            frameRate: 8,
            repeat: -1
		  });

		   this.anims.create({
				key: 'insegna3',
            frames: this.anims.generateFrameNumbers('insegna3', {start: 0, end: 8}),
            frameRate: 8,
            repeat: -1
		  });


		  var insegna1 = this.physics.add.sprite(486, 80).setOrigin(0, 0);
		  insegna1.anims.play('insegna1', true);
	
        var insegna2 = this.physics.add.sprite(1620, 222).setOrigin(0, 0);
		  insegna2.anims.play('insegna2', true);

		  var insegna3 = this.physics.add.sprite(1460, 209.15).setOrigin(0, 0);
		  insegna3.anims.play('insegna3', true);

			// CHARACTERS		  
			
			 this.anims.create({
				key: 'kora',
            frames: this.anims.generateFrameNumbers('kora_idle', {start: 0, end: 15}),
            frameRate: 8,
            repeat: -1
		  });
		  
	     kora = this.physics.add.sprite(1392.92, 332.89).setOrigin(0, 0);
		  kora.anims.play('kora', true);
		


		  //score
        scoreText = this.add.text(32, 32, 'Score 0', {fontsize: '32px', fill: "#FFFFFF"});

        //cursor
        cursors = this.input.keyboard.createCursorKeys();

        //camera
        camera = new cameraHandler(this);
        camera.init();

    }

    function update(time, delta) {

		 this.physics.world.collide(player, kora);

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

        if(camera.controls){
            camera.controls.update(delta);
        }

        window.onresize = function ()
        {
            game.renderer.resize(window.innerWidth, window.innerHeight, 1.0);
        }
    }
}