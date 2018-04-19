function EventClick(game){
    game.input.on('pointerdown', function(event, gameObject){
        var random_index = Math.floor(Math.random() * dialogRegistry.no.length);
        if(gameObject[0])
            showDialog(game, dialogRegistry.no[random_index], gameObject[0]);
    });
}

function EventPointer(game){
    game.input.on('pointerover', function(event, gameObject){
        textHandler.infoText.setText(gameObject[0].name);
    });
}