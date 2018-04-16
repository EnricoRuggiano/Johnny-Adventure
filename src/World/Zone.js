function Zone(game){
    return {
        // left
        jukebox:        game.add.zone(147, 314, 141, 235).setInteractive().setName("Jukebox"),
        plant:          game.add.zone(48, 430, 95, 133).setInteractive().setName("Plant"),
        pool:           game.add.zone(104, 311, 22, 103).setInteractive().setName("Pool"),
        electric:       game.add.zone(305, 478, 30, 26).setInteractive().setName("Electric Socket"),
        tank:           game.add.zone(119, 116, 179, 80).setInteractive().setName("Beer Tank"),
        vhs:            game.add.zone(130, 226, 61, 40).setInteractive().setName("Vhs"),
        bowling:        game.add.zone(195, 244, 31, 25).setInteractive().setName("Bowling Ball"),
        pin:            game.add.zone(228, 214, 18, 54).setInteractive().setName("Bowling Pin"),
        cock:           game.add.zone(265, 217, 78, 60).setInteractive().setName("Chicken"),

        // middle
        support:        game.add.zone(409, 236, 47, 83).setInteractive().setName("Support Us"),
        slip:           game.add.zone(422, 422, 29, 40).setInteractive().setName("Panties"),
        shoe:           game.add.zone(548, 377, 54, 61).setInteractive().setName("Heel shoe"),
        bottleUp:       game.add.zone(473, 250, 55, 48).setInteractive().setName("Liquors"),
        bottleDown:     game.add.zone(466, 313, 60, 49).setInteractive().setName("Liquors"),
        glass:          game.add.zone(562, 222, 70, 39).setInteractive().setName("Glasses"),
        statue:         game.add.zone(550, 283, 38, 78).setInteractive().setName("Statue"),
        cash:           game.add.zone(609, 325, 66, 46).setInteractive().setName("Cash Desk"),
        jug:            game.add.zone(674, 240, 81, 28).setInteractive().setName("Jugs"),

        // right
        cup:            game.add.zone(686, 285, 77, 18).setInteractive().setName("Cups"),
        basket:         game.add.zone(717, 320, 48, 45).setInteractive().setName("Tropical Fruits"),
        bra:            game.add.zone(885, 275, 25, 64).setInteractive().setName("Bra"),
        sign:           game.add.zone(912, 401, 112, 92).setInteractive().setName("Menu Sign"),
        pole:           game.add.zone(1206, 108, 27, 273).setInteractive().setName("Dancing Pole"),
        exit:           game.add.zone(1031, 277, 62, 100).setInteractive().setName("Emergency Exit"),
        employee:       game.add.zone(1544, 164, 94, 79).setInteractive().setName("Employee of the Month"),
        cap:            game.add.zone(1663, 154, 35, 48).setInteractive().setName("Baseball Cap"),
        dos:            game.add.zone(1718, 98, 139, 136).setInteractive().setName("Old Computer"),
        cask:           game.add.zone(1618, 403, 114, 132).setInteractive().setName("Casks"),
        calendar:       game.add.zone(1752, 282, 114, 132).setInteractive().setName("Calendar"),

        init: function(){}
    }
}