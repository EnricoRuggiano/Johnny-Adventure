/* progress bar */

import Phaser from 'phaser';
import Text from './text.js';

export default class ProgressBar {
    constructor(scene, bar_x, bar_y, bar_width, bar_height, offset_x,
        offset_y, stroke, is_vertical, text_x, text_y, text_string){

        let x = bar_x - offset_x;
        let y = bar_y - offset_y;
        let width = bar_width + offset_x * 2;
        let height = bar_height + offset_y * 2;

        this.rectangle = new Phaser.GameObjects.Rectangle(scene, x, y, width, height);
        this.rectangle_bar = new Phaser.GameObjects.Rectangle(scene, bar_x, bar_y, bar_width, bar_height);
        this.progressbar_graphics = scene.add.graphics();
        this.progressbar_graphics_percentage = scene.add.graphics();
        this.is_vertical = is_vertical;
        this.set_graphics(this.progressbar_graphics, x, y, width, height, this.rectangle, stroke);

        if(text_x && text_y && text_string){

            let bar_text = new Text(scene, text_x, text_y + offset_y, text_string);
            //let bar_text = text.create_text(scene, text_x, text_y + offset_y, text_string);
            bar_text.set_text(false);
            //    window.innerWidth, window.innerHeight * 0.2);
            this.text = bar_text;
        }
   }

    set_graphics(progressbar_graphics, x, y, width, height, rectangle, stroke){

        // Graphics fill
        progressbar_graphics.fillGradientStyle(0x009900, 0x009900, 0x004d00, 0x004d00, 0.8);
        progressbar_graphics.fillRectShape(rectangle);

        // Inside Border black
        progressbar_graphics.lineStyle(stroke, 0x000000, 0.8);
        let insideBorder = progressbar_graphics.strokeRect(x, y, width, height); // can specify also radius

        // Border yellow
        progressbar_graphics.lineStyle(stroke * 2, 0xffcc00, 0.8);
        let border = progressbar_graphics.strokeRect(x - stroke , y - stroke, width + stroke * 2, height + stroke* 2); // can specify also radius

        // Outside Border
        progressbar_graphics.lineStyle(stroke, 0x001a00, 0.8);
        let outsideBorder = progressbar_graphics.strokeRect(x - 2 * stroke , y - 2 * stroke, width + stroke * 4, height + stroke* 4); // can specify also radius

    }

    /*set_text(text){
        text.setOrigin(0.5, 0.5);
        text.setStroke('#000000', 10);
        text.setShadow(2, 2, '#333333', 2, true, false);
        this.resize(text);
    }
*/
    resize_text(text){
        let textRatio = text.width / text.height;
        let width = window.innerWidth - text.x;

        text.displayWidth = width;
        text.displayHeight = width / textRatio;
    }

    update_progress(progress){

        let progress_bar = this;
        let bar = this.rectangle_bar;
        let graphics = this.progressbar_graphics_percentage;

        if(progress_bar.is_vertical){
            var x = bar.x;
            var y = bar.y + bar.height;
            var width = bar.width;
            var height = -bar.height * progress;
        }
        else {
            var x = bar.x;
            var y = bar.y;
            var width = bar.width * progress;
            var height = bar.height;
        }

        graphics.clear();
        graphics.depth = 10;
        graphics.fillStyle(0xcc0000, 0.8);
        graphics.fillRect(x, y, width, height);
    }

    clear(){
        this.rectangle.destroy();
        this.rectangle_bar.destroy();
        this.progressbar_graphics.destroy();
        this.progressbar_graphics_percentage.destroy();
        delete this.is_vertical;
    }
}
