function DialogHandler() {
    return {
        showDialog: function (game, dialog, gameObject) {

            this.blockScene(game, dialog, gameObject);
            if (gameObject.x >= world.player.sprite.x)
                world.player.sprite.anims.play('talk_right', true);
            else
                world.player.sprite.anims.play('talk_left', true);

            timedEvent = game.time.delayedCall(dialog.time, rollback, [], this);

            function rollback() {
                if (gameObject.x >= world.player.sprite.x)
                    world.player.sprite.anims.play('stand_right', true);
                else
                    world.player.sprite.anims.play('stand_left', true);
                this.releaseScene(game)
            }
        },

        blockScene: function (game, dialog) {
            hud.setVisible(false);
            cameraHandler.camera.startFollow(world.player.sprite);

            // Bug Fix: Walking anim does not Stop
            world.player.sprite.setVelocity(0);

            // stop keyboard and pointer listner
            game.input.mouse.stopListeners();
            game.input.keyboard.stopListeners();

            //update Text dialog
            textHandler.infoText.setText('');
            textHandler.dialogText.setText(dialog.text);
            textHandler.setVisible(true);
            Phaser.Display.Align.In.Center(textHandler.dialogText, textHandler.dialogZone);
        },

        releaseScene: function (game) {
            textHandler.dialogText.setText('');
            textHandler.setVisible(false);

            game.input.mouse.startListeners();
            game.input.keyboard.startListeners();

            hud.setVisible(true);

        },

        talk: function (game, gameObject, key) {
            var random_index = Math.floor(Math.random() * dialogRegistry[key].length);
            this.showDialog(game, dialogRegistry[key][random_index], gameObject);
        },
    }
}