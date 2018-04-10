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

    function create() {

        AnimationRegistry(this);


        //keyboard
        keyboardHandler = new KeyboardHandler(this);

        //World
        world = new World(this);
        world.init();

        //camera
        cameraHandler = new cameraHandler(this);
        cameraHandler.init();

        //hud
        hud = new Hud(this);
        hud.init(this);

        //score
        scoreText = this.add.text(cameraHandler.camera.x, cameraHandler.camera.y, 'Score',
            {
                fontFamily: 'Verdana',
                fontWeight: 'bold',
                fontSize: '24px',
                fill: "#64FF2B",
                backgroundColor: '#0F0F0F'

            }).setScrollFactor(0);

    }

    function update(time, delta) {

        // update camera
        cameraHandler.controls.update(delta);
            window.onresize = function ()
        {
            game.renderer.resize(window.innerWidth, window.innerHeight, 1.0);
        }
    }
}