function EventPointer(game){
    game.input.on('pointerover', function(event, gameObject){
        textHandler.infoText.setText(gameObject[0].name);
    });
}