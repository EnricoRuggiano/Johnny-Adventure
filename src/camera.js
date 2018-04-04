
function cameraHandler(game){
    return {

        camera: game.cameras.main,
        input: game.input,
        controls: false,
        path: 'src/settings/keyboard.json',

        follow: function(actor) {
            this.camera, startFollow(actor)
        },
        unfollow: function(actor) {
            this.camera.stopFollow(actor);
        },
        loadConfig: function(){

            var request = new XMLHttpRequest();
            var context = this;

            request.open('GET', this.path, true);
            request.responseType = 'json';
            request.send(null);

            request.onload = function(){
                mapControls(context, request.response)
            }
        },
        init: function(){
            //this.cameras.main.startFollow(player);
            this.camera.setBounds(0, 0, 1800, 800);
            this.camera.setZoom(1.2);
            this.loadConfig();
        }
    }
}

function mapControls (context, response){

    var fun = 'Phaser.Input.Keyboard.KeyCodes.';

    var up_key = fun + response.camera_Up;
    var left_key = fun + response.camera_Left;
    var right_key = fun + response.camera_Right;
    var down_key = fun + response.camera_Down;
    var zoom_In = fun + response.zoom_In;
    var zoom_Out = fun + response.zoom_Out;

    var config = {
        camera:     context.camera,
        up:         context.input.keyboard.addKey(eval(up_key)),
        left:       context.input.keyboard.addKey(eval(left_key)),
        right:      context.input.keyboard.addKey(eval(right_key)),
        down:       context.input.keyboard.addKey(eval(down_key)),
        zoomIn:     context.input.keyboard.addKey(eval(zoom_In)),
        zoomOut:    context.input.keyboard.addKey(eval(zoom_Out)),
        zoomSpeed:  0.005,
        acceleration: 0.30,
        drag:       0.0005,
        maxSpeed:   0.30  // same as acceleration
    };
    context.controls = new Phaser.Cameras.Controls.Smoothed(config);
};