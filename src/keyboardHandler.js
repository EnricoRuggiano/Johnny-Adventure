function KeyboardHandler(game) {
    return {
        cursor: game.input.keyboard.createCursorKeys(),
        keyboard:game.input.keyboard,
        key: game.input.keyboard.addKeys(
            {
                camera_Up: Phaser.Input.Keyboard.KeyCodes.W,
                camera_Left: Phaser.Input.Keyboard.KeyCodes.A,
                camera_Down: Phaser.Input.Keyboard.KeyCodes.S,
                camera_Right: Phaser.Input.Keyboard.KeyCodes.D,
                camera_fix: Phaser.Input.Keyboard.KeyCodes.R,
                zoom_In: Phaser.Input.Keyboard.KeyCodes.X,
                zoom_Out: Phaser.Input.Keyboard.KeyCodes.Z
            }
        )
    }
}