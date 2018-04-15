function Zone(game){
    return {
        // left
        jukebox:        game.add.zone(147, 314, 141, 235).setInteractive(),
        plant:     	    game.add.zone(48, 430, 95, 133).setInteractive(),
        pool:    		game.add.zone(104, 311, 22, 103).setInteractive(),
        electric:       game.add.zone(305, 478, 30, 26).setInteractive(),
        tank:           game.add.zone(119, 116, 179, 80).setInteractive(),
        vhs:            game.add.zone(130, 226, 61, 40).setInteractive(),
        bowling:        game.add.zone(195, 244, 31, 25).setInteractive(),
        pin:            game.add.zone(228, 214, 18, 54).setInteractive(),
        cock:           game.add.zone(265, 217, 78, 60).setInteractive(),

        // middle
        support:        game.add.zone(409, 236, 47, 83).setInteractive(),
        slip:           game.add.zone(422, 422, 29, 40).setInteractive(),
        shoe:           game.add.zone(548, 377, 54, 61).setInteractive(),
        bottleUp:       game.add.zone(473, 250, 55, 48).setInteractive(),
        bottleDown:     game.add.zone(466, 313, 60, 49).setInteractive(),
        glass:          game.add.zone(562, 222, 70, 39).setInteractive(),
        statue:         game.add.zone(550, 283, 38, 78).setInteractive(),
        cash:           game.add.zone(609, 325, 66, 46).setInteractive(),
        jug:            game.add.zone(674, 240, 81, 28).setInteractive(),

        // right
        cup:            game.add.zone(686, 285, 77, 18).setInteractive(),
        basket:         game.add.zone(717, 320, 48, 45).setInteractive(),
        bra:            game.add.zone(885, 275, 25, 64).setInteractive(),
        sign:           game.add.zone(912, 401, 112, 92).setInteractive(),
        pole:           game.add.zone(1206, 108, 27, 273).setInteractive(),
        exit:           game.add.zone(1031, 277, 62, 100).setInteractive(),
        employee:       game.add.zone(1544, 164, 94, 79).setInteractive(),
        cap:            game.add.zone(1663, 154, 35, 48).setInteractive(),
        dos:            game.add.zone(1718, 98, 139, 136).setInteractive(),
        cask:           game.add.zone(1618, 403, 114, 132).setInteractive(),
        calendar:       game.add.zone(1752, 282, 114, 132).setInteractive(),

        init: function(){
            var game = this;
            this.jukebox.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Jukebox');
            });
            this.plant.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Plant');
            });
            this.pool.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Pool');
            });
            this.electric.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Electric Socket');
            });
            this.tank.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Beer Tank');
            });

            this.vhs.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('VHS');
            });
            this.bowling.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Bowling Ball');
            });
            this.pin.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Boowling Pin');
            });
            this.cock.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Chicken');
            });

            this.support.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Support Us!');
            });
            this.slip.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Panties');
            });
            this.shoe.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Hell Shoe');
            });
            this.bottleUp.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Liquors');
            });
            this.bottleDown.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Liquors');
            });
            this.glass.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Glasses');
            });
            this.statue.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Statue');
            });
            this.cash.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Cash Desk');
            });
            this.jug.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Jugs');
            });
            this.cup.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Cups');
            });
            this.basket.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText("Tropical Fruit's basket");
            });
            this.bra.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Bra');
            });
            this.sign.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText("Menu sign");
            });
            this.pole.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Dancing Pole');
            });
            this.exit.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Exit');
            });
            this.employee.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Employee of the Month');
            });
            this.cap.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Cap');
            });
            this.dos.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Old Computer');
            });
            this.calendar.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Calendar');
            });
            this.cask.on("pointerdown", function(){
                scoreText.x = window.innerWidth/2;
                scoreText.y = window.innerHeight*2/3;
                scoreText.setText('Cask');
            });
        }
    }
}