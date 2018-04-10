function World(game){
    return {
        physics: game.physics,
        scenario: Scenario(game),
        characters: Characters(game),
        player: Player(game),
        zone: Zone(game),
        init: function(){

            this.physics.world.setBounds(0, 0, 1655, 720);
            this.physics.world.setBoundsCollision(true, true, true, true);

            this.scenario.init();
            this.zone.init();
            this.characters.init();
            this.player.init();
            this.scenario.front_init();
        }
    }
}