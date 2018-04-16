function showDialog(game, text, time){

    hud.setVisible(false);
    cameraHandler.camera.startFollow(world.player.sprite);

    textHandler.infoText.setText('');
    textHandler.setVisible(true);
    textHandler.dialogText.setText(text);
    Phaser.Display.Align.In.Center(textHandler.dialogText, textHandler.dialogZone);


    world.player.sprite.anims.play('talk_right', true);
    timedEvent = game.time.delayedCall(time, rollback, [], this);

    function rollback() {
        world.player.sprite.anims.play('stand_right', true);
        textHandler.dialogText.setText('');
        textHandler.setVisible(false);
        hud.setVisible(true);
    }
}
