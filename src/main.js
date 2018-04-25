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

        //text
        textHandler = new TextHandler(this);
        textHandler.init();

        //events
        dialogRegistry = new DialogRegistry();
        initEvents(this);
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