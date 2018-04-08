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

    function create() {

        AnimationRegistry(this);

        //score
        scoreText = this.add.text(32, 32, 'Score 0', {fontsize: '32px', fill: "#FFFFFF"});

        //keyboard
        keyboardHandler = new KeyboardHandler(this);

        //World
        world = new World(this);
        world.init();

        //camera
        cameraHandler = new cameraHandler(this);
        cameraHandler.init();
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