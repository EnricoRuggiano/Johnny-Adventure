/* game text object*/
import Phaser from 'phaser';

let my_style = {
    fontFamily: "Lemon",
    fontSize: 60,
    color: '#ffff99'
};

export default class Text extends Phaser.GameObjects.Text
{
    // WorkAround
    //  new Text() != scene.add.text().
    constructor(scene, x, y, text, depth)
    {
      
      //return scene.add.text(x, y, text, my_style);
      super(scene, x, y, text, my_style);
      if(depth)
        this.depth = depth;

      scene.add.displayList.add(this);
    }

    set_text(interactive)
    {
      let text = this;
      text.setOrigin(0.5, 0.5);
      text.setStroke('#000000', 10);
      text.setShadow(2, 2, '#333333', 2, true, false);

      if(interactive === true)
      {
        text.setInteractive();
      }
    }

    resize_text(x, y, width, height)
    {
      let text = this;

        let button_ratio = width / height;
        let text_ratio = text.width / text.height;

        if(text_ratio <= button_ratio)
        {
            text.displayWidth = height * text_ratio;
            text.displayHeight = height;
            text.x = x + width * 0.5;
            text.y = y + height * 0.5;
        }
        else
        {
            text.displayWidth = height * button_ratio;
            text.displayHeight = height;
            text.x = x + width * 0.5;
            text.y = y + height * 0.5;
        }
    }

    pointerout_effect()
    {
      let text = this;
      //text.depth = 0;
      text.clearTint();
      text.setStroke('#000000', 10);
      text.setShadow(2, 2, '#333333', 2, true, false);
      window.gameLog.debug(`text - pointerout_effect - ${this.constructor.name}`);
    }

    pointerover_effect()
    {
      let text = this;
      //text.depth = 10;
      text.setTint(0xffffcc);
      text.setShadow(2, 2, '#666600');
      text.setStroke('#000000', 5);
      window.gameLog.debug(`text - pointerover_effect - ${this.constructor.name}`);
    }

    set_effect(callback, scene)
    {
      this.on('pointerover', this.pointerover_effect, this);
      this.on('pointerout', this.pointerout_effect, this);
      
      if(callback && scene)
      {
        this.on('pointerdown', callback, scene);
      }
    }
  }
