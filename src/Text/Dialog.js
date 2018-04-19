function showDialog(game, dialog, gameObject){

    blockScene(game);
    if(gameObject.x >= world.player.sprite.x)
        world.player.sprite.anims.play('talk_right', true);
    else
        world.player.sprite.anims.play('talk_left', true);

    timedEvent = game.time.delayedCall(dialog.time, rollback, [], this);

    function rollback() {
        if(gameObject.x >= world.player.sprite.x)
            world.player.sprite.anims.play('stand_right', true);
        else
            world.player.sprite.anims.play('stand_left', true);
        releaseScene(game)
    }

    function blockScene(game){
        hud.setVisible(false);
        cameraHandler.camera.startFollow(world.player.sprite);

        // Bug Fix: Walking anim does not Stop
        world.player.sprite.setVelocity(0);

        // stop listner
        game.input.mouse.stopListeners();
        game.input.keyboard.stopListeners();

        textHandler.infoText.setText('');
        textHandler.setVisible(true);
        textHandler.dialogText.setText(dialog.text);
        Phaser.Display.Align.In.Center(textHandler.dialogText, textHandler.dialogZone);
    };

    function releaseScene(game){
        textHandler.dialogText.setText('');
        textHandler.setVisible(false);

        game.input.mouse.startListeners();
        game.input.keyboard.startListeners();

        hud.setVisible(true);

    };
}
