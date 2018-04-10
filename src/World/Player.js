function Player(game){
    return{
        sprite: game.physics.add.sprite(154, 520, 'johnny_std'),
        inventory: ['hand_item', 'money_item', 'gym_item', 'ibm_item'],
        init: function(){
            this.sprite.setCollideWorldBounds(true);
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
                }
            });

            keyboardHandler.keyboard.on('keyup', function(event){
                switch (event.key){
                    case 'ArrowRight':
                        player.setVelocityX(0);
                        player.anims.play('stand', true);
                        break;
                    case 'ArrowLeft':
                        player.setVelocityX(0);
                        player.anims.play('stand', true);
                        break;
                }
            })
        }
    }
}