function Zone(game){
    return {
        // left
        jukebox:        game.add.zone(147, 314, 141, 235).setDropZone().setName("Jukebox"),
        plant:          game.add.zone(48, 430, 95, 133).setDropZone().setName("Plant"),
        pool:           game.add.zone(104, 311, 22, 103).setDropZone().setName("Cue"),
        electric:       game.add.zone(305, 478, 30, 26).setDropZone().setName("Electric Socket"),
        tank:           game.add.zone(119, 116, 179, 80).setDropZone().setName("Beer Tank"),
        vhs:            game.add.zone(130, 226, 61, 40).setDropZone().setName("Vhs"),
        bowling:        game.add.zone(195, 244, 31, 25).setDropZone().setName("Bowling Ball"),
        pin:            game.add.zone(228, 214, 18, 54).setDropZone().setName("Bowling Pin"),
        cock:           game.add.zone(265, 217, 78, 60).setDropZone().setName("Chicken"),

        // middle
        support:        game.add.zone(409, 236, 47, 83).setDropZone().setName("Support Us"),
        slip:           game.add.zone(422, 422, 29, 40).setDropZone().setName("Panties"),
        shoe:           game.add.zone(548, 377, 54, 61).setDropZone().setName("Heel shoe"),
        bottleUp:       game.add.zone(473, 250, 55, 48).setDropZone().setName("Liquors"),
        bottleDown:     game.add.zone(466, 313, 60, 49).setDropZone().setName("Liquors"),
        glass:          game.add.zone(562, 222, 70, 39).setDropZone().setName("Glasses"),
        statue:         game.add.zone(550, 283, 38, 78).setDropZone().setName("Statue"),
        cash:           game.add.zone(609, 325, 66, 46).setDropZone().setName("Cash Desk"),
        jug:            game.add.zone(674, 240, 81, 28).setDropZone().setName("Jugs"),

        // right
        cup:            game.add.zone(686, 285, 77, 18).setDropZone().setName("Cups"),
        basket:         game.add.zone(717, 320, 48, 45).setDropZone().setName("Tropical Fruits"),
        bra:            game.add.zone(885, 275, 25, 64).setDropZone().setName("Bra"),
        sign:           game.add.zone(912, 401, 112, 92).setDropZone().setName("Menu Sign"),
        pole:           game.add.zone(1206, 108, 27, 273).setDropZone().setName("Dancing Pole"),
        exit:           game.add.zone(1031, 277, 62, 100).setDropZone().setName("Emergency Exit"),
        employee:       game.add.zone(1544, 164, 94, 79).setDropZone().setName("Employee of the Month"),
        cap:            game.add.zone(1663, 154, 35, 48).setDropZone().setName("Baseball Cap"),
        dos:            game.add.zone(1718, 98, 139, 136).setDropZone().setName("Old Computer"),
        cask:           game.add.zone(1618, 403, 114, 132).setDropZone().setName("Casks"),
        calendar:       game.add.zone(1752, 282, 114, 132).setDropZone().setName("Calendar"),

        init: function(){}
    }
}