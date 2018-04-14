function HudItem(game, cell_x, cell_y, key_item){
    return {
        gameObject: game.add.image(cell_x, cell_y, key_item).setName(key_item).setInteractive().setOrigin(0, 0),
        init: function(){

            // drag on event
            game.input.setDraggable(this.gameObject);

            game.input.on('drag', function (pointer, gameObject, dragX, dragY) {

                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            // drag end
            game.input.on('dragend', function (pointer, gameObject) {

                gameObject.x = gameObject.data.fix_x;
                gameObject.y = gameObject.data.fix_y;
            });
        },
        fixPosition: function(){
            this.gameObject.data = {
                fix_x: this.gameObject.x,
                fix_y: this.gameObject.y
            };
        }
    }
}