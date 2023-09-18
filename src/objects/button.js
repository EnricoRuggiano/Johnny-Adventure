import Phaser from 'phaser';
import Text from './text.js';

export default class Button {

    constructor(scene, x, y, stroke, width, height, string, callback)
    {
        this.rectangle = new Phaser.GameObjects.Rectangle(scene, x, y, width, height);
        let rectangle = this.rectangle;

        rectangle.setInteractive();
        this.graphics = scene.add.graphics();
        this.effects = scene.add.graphics();
        this.effects.depth = 0;

        this.set_graphics(this.graphics, x, y, width, height, rectangle, stroke);
        this.flag = false;

        // button has some text inside
        if(string)
        {
            this.text = new Text(scene, x, y, string);
            //set_text = ();
            //resize_text = Text.resize_text();
            let text = this.text;

            // text button settings
            text.set_text(true);
            text.resize_text(x, y, width, height);

            // clicking on the button text triggers an event
            if(callback)
            {
                text.on('pointerdown', callback, scene);
            }
        }

        // add some effects on the buttons
        rectangle.on('pointerover', this.pointerover_effect, this);
        rectangle.on('pointerout', this.pointerout_effect, this);
   }

    set_graphics(graphics, x, y, width, height, rectangle, stroke){

        // Graphics fill
        graphics.fillGradientStyle(0x009900, 0x009900, 0x004d00, 0x004d00, 0.8);
        graphics.fillRectShape(rectangle);

        // Inside Border black
        graphics.lineStyle(stroke, 0x000000, 0.8);
        let insideBorder = graphics.strokeRect(x, y, width, height); // can specify also radius

        // Border yellow
        graphics.lineStyle(stroke * 2, 0xffcc00, 0.8);
        let border = graphics.strokeRect(x - stroke , y - stroke, width + stroke * 2, height + stroke* 2); // can specify also radius

        // Outside Border
        graphics.lineStyle(stroke, 0x001a00, 0.8);
        let outsideBorder = graphics.strokeRect(x - 2 * stroke , y - 2 * stroke, width + stroke * 4, height + stroke* 4); // can specify also radius
    }

    setVisible(bool)
    {
        this.is_visible(bool);
    }


    setDepth(depth)
    {
        this.graphics.depth = depth;
        this.rectangle.depth = depth;
        if(this.text)
        {
            this.text.depth = depth;
        }
    }

    is_visible(bool)
    {
        this.graphics.setVisible(bool);
        this.rectangle.setVisible(bool);
        window.gameLog.debug(`button - set visible - ${this.graphics.constructor.name}: ${bool}`);
        window.gameLog.debug(`button - set visible - ${this.rectangle.constructor.name}: ${bool}`);

        if(this.text)
        {
            this.text.setVisible(bool);
            //this.text.setText("");
            this.text.updateText();
            //this.text.active = true;
            window.gameLog.debug(`button - set visible - ${this.text.constructor.name}: ${bool}`);
        }
    }

    pointerover_effect()
    {
        let text = this.text;
        let effects = this.effects;
        let rectangle = this.rectangle;

        effects.fillGradientStyle(0x008000, 0x008000, 0x003300, 0x003300, 0.5);
        effects.fillRectShape(rectangle);

        window.gameLog.debug(`button - pointerover_effect - ${this.constructor.name}`);
        //window.gameLog.debug(`button - pointerover_effect - ${this.effects.constructor.name}`);
        //window.gameLog.debug(`button - pointerover_effect - ${this.rectangle.constructor.name}`);

        if(text)
        {
          text.pointerover_effect();
        }
    }

    pointerout_effect()
    {
        let effects = this.effects;
        let text = this.text;
        window.gameLog.debug(`button - pointerout_effect - ${this.constructor.name}`);
        //window.gameLog.debug(`button - pointerout_effect - ${this.effects.constructor.name}`);
        effects.clear();

        if(text)
        {
          text.pointerout_effect();
        }
    }

   deactivable(scene, x, y, width, height){

        var graphics = scene.add.graphics();
        var rectangle = this.getChildren()[0];
        var text = this.getChildren()[1];
        graphics.depth = 0;

        graphics.fillGradientStyle(0x008000, 0x008000, 0x003300, 0x003300, 0.5);
        graphics.fillRectShape(rectangle);
        text.depth = 10;
        text.setTint(0xffffcc);
        text.setStroke('#000000', 5);
        text.setShadow(2, 2, '#666600');

        text.setInteractive(false);
        rectangle.setInteractive(false);

        text.on('cumming', function(event){

            graphics.clear();
            text.depth = 0;
            text.clearTint();
            text.setStroke('#000000', 10);
            text.setShadow(2, 2, '#333333', 2, true, false);
            text.setInteractive();
            rectangle.setInteractive();
        }, text, graphics, rectangle);
    }
}
