function EventClick(game){
    game.input.on('pointerdown', function(pointer, gameObject){
        var random_index = Math.floor(Math.random() * dialogRegistry.no.length);
        showDialog(game, dialogRegistry.no[random_index], 3000);
    });
}

function EventPointer(game){
    game.input.on('pointerover', function(event, gameObject){
        textHandler.infoText.setText(gameObject[0].name);
    });
}