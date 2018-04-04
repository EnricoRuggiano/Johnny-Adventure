path = 'src/settings/keyboard.json';

function follow(){
    this.cameras.main.startFollow(player);
};


function unfollow(){
    this.cameras.main.stopFollow(player);
};

function loadSettings(callback, context){

    var request = new XMLHttpRequest();

    request.open('GET', path, true);
    request.responseType = 'json';
    request.send(null);

    request.onload = function () {
        if (request.readyState == 4 && request.status == "200") {
            callback(request.response, context);
        }
    };
}

function setup(){
    //this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 1800, 800);

    this.cameras.main.setZoom(1.2);

    var lambda = function mapControls(response, context) {

        var fun = 'Phaser.Input.Keyboard.KeyCodes.';

        var up_key = fun + response.camera_Up;
        var left_key = fun + response.camera_Left;
        var right_key = fun + response.camera_Right;
        var down_key = fun + response.camera_Down;

        var zoom_In = fun + response.zoom_In;
        var zoom_Out = fun + response.zoom_Out;


        var controlConfig = {

            camera: context.cameras.main,
            up: context.input.keyboard.addKey(eval(up_key)),
            left: context.input.keyboard.addKey(eval(left_key)),
            right: context.input.keyboard.addKey(eval(right_key)),
            down: context.input.keyboard.addKey(eval(down_key)),
            zoomIn: context.input.keyboard.addKey(eval(zoom_In)),
            zoomOut: context.input.keyboard.addKey(eval(zoom_Out)),
            zoomSpeed: 0.005,
            acceleration: 0.30,
            drag: 0.0005,
            maxSpeed: 0.30  // same as acceleration
        };
       controls = new Phaser.Cameras.Controls.Smoothed(controlConfig);
       CAMERA_FLAG = true;
    };
    loadSettings(lambda, this);
}