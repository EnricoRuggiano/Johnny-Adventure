function cameraHandler(game){
    return {
        camera: game.cameras.main,
        controls: new Phaser.Cameras.Controls.Smoothed({
            camera:     game.cameras.main,
            up:         keyboardHandler.key.camera_Up,
            left:       keyboardHandler.key.camera_Left,
            right:      keyboardHandler.key.camera_Right,
            down:       keyboardHandler.key.camera_Down,
   //         zoomIn:     keyboardHandler.key.zoom_In,
            zoomOut:    keyboardHandler.key.zoom_Out,
            zoomSpeed:  0.005,
            acceleration: 0.20,
            drag:       0.0005,
            maxSpeed:   0.20  // same as acceleration
        }),
        init: function(){
            this.camera.setBounds(0, 0, 1800, 800);
            this.camera.startFollow(world.player.sprite);

            var cameraHandler = this;
            keyboardHandler.keyboard.on('keydown_T', function(event) {
                cameraHandler.camera.startFollow(world.player.sprite);
            });
            keyboardHandler.keyboard.on('keydown_R', function(event) {
                cameraHandler.camera.stopFollow(world.player.sprite);
            });
            keyboardHandler.keyboard.on('keydown_X', function(event) {
                cameraHandler.camera.setZoom(1);;
            });
        }
    }
}