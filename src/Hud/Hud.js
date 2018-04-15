function Hud(game) {

    const width_factor = window.innerWidth/8;
    const height_factor = window.innerHeight/4;

    const background_x = 0;
    const background_y = cameraHandler.camera.height - height_factor;
    const background_width = window.innerWidth;
    const background_height = height_factor;

    const cell_width = height_factor;
    const cell_margin_x = 20;

    function calculateListWidth(){
        var difference = window.innerWidth - width_factor - cell_margin_x;
        return Math.floor(difference / (cell_width + cell_margin_x)) * cell_width;
    }

    const list_x = width_factor;
    const list_y = background_y;
    const list_width = calculateListWidth();
    const list_height = window.innerHeight/6;
;
    const margin_y = 26; //height_factor * 0.2; // 10


    return {
        background:         new Phaser.Geom.Rectangle(background_x, background_y, background_width, background_height),
        list:               new Phaser.Geom.Rectangle(list_x, list_y + margin_y, list_width + width_factor,  list_height - 10),
        arrow_l:            null,
        arrow_r:            null,
        graphicsBackground: game.add.graphics({ fillStyle: {color: 0x241C1C, alpha: 0.57}, lineStyle: {color: 0x241f1c}}),
        graphicsList:       game.add.graphics({ fillStyle: {color: 0x917c6f, alpha: 0.39}, lineStyle: {color: 0x241f1c}}),

        cellArray: [],
        hudItemArray: [],
        itemOffset:   0,

        resize: function(object, scale, bound_x, bound_y){
          if(object.displayWidth > bound_x || object.displayHeight > bound_y){
              object.scaleX = scale;
              object.scaleY = scale;
              this.resize(object, scale - 0.1, bound_x, bound_y)
          }
        },
        translate: function(object, bound_x) {
            if (object.displayWidth - object.x < bound_x/2) {
                object.setOrigin(0.5, 0);
                object.x += bound_x/2;
            }
        },

        createRect: function(x, offsetY, width){
            return new Phaser.Geom.Rectangle(x, list_y + 26 + offsetY, width, list_height - 14 - offsetY)
        },

        spawnItem: function(){

            var width = cell_width;
            var x = width_factor + cell_margin_x;

            for(var i = 0; i < list_width/cell_width; i++){
                var rect = this.createRect(x, 4, width);

                var cell = game.add.graphics({ fillStyle: {color: 0x000000, alpha: 0.34}, lineStyle: {color: 0x000000}});
                cell.fillRectShape(rect);
                cell.strokeRectShape(rect);
                cell.setScrollFactor(0, 0);
                this.cellArray.push(rect);
                x += width + cell_margin_x;
            }
        },

        shiftRightItems: function(){
            this.itemOffset += 1;
            (this.itemOffset > world.player.inventory.length-1)? this.itemOffset = 0: 0;
            this.mapItem();
        },

        shiftLeftItems: function(){
            this.itemOffset -= 1;
            (this.itemOffset < 0)? this.itemOffset = world.player.inventory.length-1: 0;
            this.mapItem();
        },

        setArrowClick: function(){
            this.arrow_l.on('pointerdown', function(){
                this.clearItems();
                this.shiftLeftItems()
            }, this);
            this.arrow_r.on('pointerdown', function(){
                this.clearItems();
                this.shiftRightItems()
            }, this);
        },

        drawObject: function(cell, key_item){
            var hudItem = new HudItem(game, cell.x, cell.y, key_item);

            this.resize(hudItem.gameObject, 0.9, cell.width, cell.height);
            this.translate(hudItem.gameObject, cell.width);

            hudItem.gameObject.setScrollFactor(0, 0);
            hudItem.fixPosition();
            hudItem.init();

            this.hudItemArray.push(hudItem);
            },
        clearItems: function(){
            this.hudItemArray.forEach(function(value, index, array){
                delete array[index].gameObject.data;
                array[index].gameObject.destroy();
            });
            this.hudItemArray.splice(0, this.hudItemArray.length - 1);
        },

        mapItem: function(){
            this.cellArray.forEach(function callback(value, index, cellArray){
               this.drawObject(cellArray[index], world.player.inventory[index + this.itemOffset]);
            }, this);
        },

        init: function () {
            this.graphicsBackground.fillRectShape(this.background);
            this.graphicsBackground.strokeRectShape(this.background);
            this.graphicsBackground.setScrollFactor(0, 0);

            this.graphicsList.fillRectShape(this.list);
            this.graphicsList.strokeRectShape(this.list);
            this.graphicsList.setScrollFactor(0, 0);

            this.arrow_l = game.add.image(5, list_y + 26, 'arrow_l').setInteractive().setOrigin(0, 0).setScrollFactor(0, 0);
            this.arrow_r = game.add.image(5, list_y  + 26 + (list_height - 10)*0.5, 'arrow_r').setInteractive().setOrigin(0, 0).setScrollFactor(0, 0);

            this.resize(this.arrow_l, 0.9, width_factor, (list_height - 10)*0.5);
            this.resize(this.arrow_r, 0.9, width_factor, (list_height - 10)*0.5);

            this.translate(this.arrow_l, width_factor - 10);
            this.translate(this.arrow_r, width_factor - 10);

            this.spawnItem();
            this.mapItem();
            this.setArrowClick();
        }
    }
}