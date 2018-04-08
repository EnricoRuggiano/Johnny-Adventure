function World(game){
    return {
        physics: game.physics,
        scenario: Scenario(game),
        characters: Characters(game),
        player: Player(game),
        init: function(){

            this.physics.world.setBounds(0, 0, 1800, 720);
            this.physics.world.setBoundsCollision(true, true, true, true);

            this.scenario.init();
            this.characters.init();
            this.player.init();
        }
    }
}