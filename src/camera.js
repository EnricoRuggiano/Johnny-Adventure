
function zoomIn(){
    camera.setZoom(2);
}

function zoomOut(){
    camera.setZoom(0.5);
}

function resetCamera(){
    camera.setZoom(1);
}

function loadSettings(callback, context){

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'src/settings/keyboard.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            console.log(this);
            callback(xobj.responseText, context);
        }
    };
    xobj.send(null);
}

function setup(){
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(this.physics.world.bounds);


    var lambda = function mapControls(response, context) {

        var fun = 'Phaser.Input.Keyboard.KeyCodes.';

        var up_key = fun + JSON.parse(response).camera_Up;
        var left_key = fun + JSON.parse(response).camera_Left;
        var right_key = fun + JSON.parse(response).camera_Right;
        var down_key = fun + JSON.parse(response).camera_Down;

        var zoom_In = fun + JSON.parse(response).zoom_In;
        var zoom_Out = fun + JSON.parse(response).zoom_Out;


        var controlConfig = {

            camera: context.cameras.main,
            //up: context.input.keyboard.addKey(eval(up_key)),
            up: context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),
            left: context.input.keyboard.addKey(eval(left_key)),
            right: context.input.keyboard.addKey(eval(right_key)),
            down: context.input.keyboard.addKey(eval(down_key)),
            zoomIn: context.input.keyboard.addKey(eval(zoom_In)),
            zoomOut: context.input.keyboard.addKey(eval(zoom_Out)),
            acceleration: 0.00,
            drag: 0.0005,
            maxSpeed: 0.5
        };
       controls = new Phaser.Cameras.Controls.Smoothed(controlConfig);
       CAMERA_FLAG = true;
    };
    loadSettings(lambda, this);
}