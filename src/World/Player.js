function Player(game){
    return{
        sprite: game.physics.add.sprite(154, 520, ''),
        score: 0,
        inventory: ['Take', 'Money', 'Dumbbell', 'Floppy Disk'],

        init: function(){
            this.sprite.setCollideWorldBounds(true);
            this.sprite.anims.play('stand_right', true);
            var player = this.sprite;

            keyboardHandler.keyboard.on('keydown', function(event){
                switch (event.key){
                    case 'ArrowRight':
                        player.setVelocityX(200);
                        player.anims.play('walk_right', true);
                        break;
                    case 'ArrowLeft':
                        player.setVelocityX(-200);
                        player.anims.play('walk_left', true);
                        break;
                    case 'v':
                        player.anims.play('talk_right', true);
                        break;
                    case 'c':
                        player.anims.play('talk_left', true);
                        break;
                }
            });

            keyboardHandler.keyboard.on('keyup', function(event){
                switch (event.key){
                    case 'ArrowRight':
                        player.setVelocityX(0);
                        player.anims.play('stand_right', true);
                        break;
                    case 'ArrowLeft':
                        player.setVelocityX(0);
                        player.anims.play('stand_left', true);
                        break;
                    case 'v':
                        player.anims.play('stand_right', true);
                        break;
                    case 'c':
                        player.anims.play('stand_right', true);
                        break;
                }
            })
        }
    }
}