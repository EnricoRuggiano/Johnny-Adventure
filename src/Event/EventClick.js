function eventClick(game) {
    game.input.on('pointerdown', function (event, gameObject) {
        console.log(gameObject[0]);
        if (gameObject[0] && Object.values(world.zone).includes(gameObject[0])){
            switch (gameObject[0].name) {
                case 'Jukebox':
                    talk(game, gameObject[0], 'Jukebox');
                    break;
                case 'Plant':
                    talk(game, gameObject[0], 'Plant');
                    break;
                default:
                    talk(game, gameObject[0], 'no');
            }
        }
    });
}

function eventPointOver(game){
    game.input.on('pointerover', function(event, gameObject){
        textHandler.infoText.setText(gameObject[0].name);
        textHandler.fitFont(textHandler.infoText, textHandler.infoZone);
        Phaser.Display.Align.In.Center(textHandler.infoText, textHandler.infoZone);
    });

    game.input.on('pointerout', function(event, gameObject){
        textHandler.infoText.setText('');
    });
}