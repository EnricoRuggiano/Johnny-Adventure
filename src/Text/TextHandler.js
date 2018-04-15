function TextHandler(game){

    const dialogZone_X = window.innerWidth/12;
    const dialogZone_Y = window.innerHeight * 3/4 - window.innerHeight/24;
    const dialogZone_weight = window.innerWidth - 2 * dialogZone_X;
    const dialogZone_height = window.innerHeight/4;

    const scoreZone_X = cameraHandler.camera.x;
    const scoreZone_Y = cameraHandler.camera.y;
    const scoreZone_weight = dialogZone_weight;
    const scoreZone_height = window.innerWidth/12;

    const infoZone_X = dialogZone_X;
    const infoZone_Y = dialogZone_Y;
    const infoZone_weight = dialogZone_weight;
    const infoZone_height = window.innerWidth/12;

    var text = 'Voluptatem distinctio' +
        'consequatur cumque fugiat aut adipisci non. \n' +
        'Modi voluptates omnis placeat et explicabo. ' +
        'Ut modi odit nobis non. Non ut dolores quos. Dolores possimus minima qui.';

    const config =
        {
            fontFamily: 'Verdana',
            fontWeight: 'bold',
            fontSize: '24px',
            fill: "#64FF2B",
            stroke: "#000",
            strokeThickness: 5,
            //backgroundColor: '#0F0F0F'
        };

    return {
        dialogBox:  game.add.graphics({ fillStyle: {color: 0x241C1C, alpha: 0.57}, lineStyle: {color: 0x241f1c}}),

        dialogZone: game.add.zone(dialogZone_X, dialogZone_Y, dialogZone_weight, dialogZone_height).setOrigin(0,0),
        scoreZone: game.add.zone(scoreZone_X, scoreZone_Y, scoreZone_weight, scoreZone_height).setOrigin(0,0),
        infoZone: game.add.zone(infoZone_X, infoZone_Y, infoZone_weight, infoZone_height).setOrigin(0,0),

        scoreText : game.add.text(scoreZone_X, scoreZone_Y, 'Score', config),
        infoText:   game.add.text(0, 0, 'Lorem Ipsum', config).setOrigin(0,0),
        dialogText: game.add.text(0, 0, '', config).setOrigin(0,0),

        fitFont: function(text, bound){
            if(text.height < bound.height)
                return;
            text.setStroke("#000", parseInt(text.style.fontSize)/5);
            text.setFontSize(parseInt(text.style.fontSize) - 1);
            this.fitFont(text, bound);
        },

        setVisible: function(bool){
            this.dialogBox.setVisible(bool);
            this.dialogText.setVisible(bool);
        },

        init: function(){

            this.dialogBox.fillRectShape(this.dialogZone);
            this.dialogBox.strokeRectShape(this.dialogZone);
            this.dialogBox.setScrollFactor(0);

            this.scoreText.setScrollFactor(0);
            this.infoText.setScrollFactor(0);
            this.scoreText.setBackgroundColor('#241C1C57');
            this.infoText.setBackgroundColor('#241C1C57');

            this.dialogText.setScrollFactor(0);

            this.dialogText.setWordWrapWidth(this.dialogZone.width);
            this.fitFont(this.dialogText, this.dialogZone);
            this.scoreText.setWordWrapWidth(this.scoreZone.width);
            this.fitFont(this.scoreText, this.scoreZone);
            this.infoText.setWordWrapWidth(this.infoZone.width);
            this.fitFont(this.infoText, this.infoZone);

            Phaser.Display.Align.In.TopCenter(this.infoText, this.dialogZone);

            this.dialogText.setText(text);
            Phaser.Display.Align.In.Center(this.dialogText, this.dialogZone);
            this.setVisible(false);
        }
    }
}