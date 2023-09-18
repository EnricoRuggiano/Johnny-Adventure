import Phaser from 'phaser';
import Button from './button.js';
import Text from './text.js';
import load_dialog from '../utils/load_dialog.js';

export default class Box extends Phaser.GameObjects.Rectangle
{
    constructor(scene, config_json, manifest){
        
        let BOX = config_json.box;
        let INNERBOX = config_json.inner_box;
        let SIDEBOX = config_json.side_box;
        let BUTTONUP = config_json.button_up;
        let BUTTONDOWN = config_json.button_down;

        //let padding_x = (BOX.width - INNERBOX.width)/2;
        //let padding_y = (BOX.height - INNERBOX.height)/2;
        
        INNERBOX.width = BOX.width - 2 * INNERBOX.offset_x;
        INNERBOX.height = BOX.height - 2 * INNERBOX.offset_y;
        INNERBOX.x = BOX.x + INNERBOX.offset_x;
        INNERBOX.y = BOX.y + INNERBOX.offset_y;
        
        SIDEBOX.width = Math.abs(BOX.width - INNERBOX.width - INNERBOX.offset_x - 2 * SIDEBOX.offset_x);
        SIDEBOX.height = INNERBOX.height - 2 * SIDEBOX.offset_y;
        SIDEBOX.x = INNERBOX.x + INNERBOX.width + SIDEBOX.offset_x;
        SIDEBOX.y = INNERBOX.y + SIDEBOX.offset_y; 
        
        BUTTONDOWN.x = SIDEBOX.x;
        BUTTONDOWN.y = SIDEBOX.y + SIDEBOX.height + BUTTONDOWN.offset_y;
        
        BUTTONUP.x = SIDEBOX.x;
        BUTTONUP.y = SIDEBOX.y - BUTTONUP.offset_y - BUTTONUP.height; 
        
        //INNERBOX.x = BOX.x + padding_x;
        //INNERBOX.y = BOX.y + padding_y;        
        //INNERBOX.width = INNERBOX.width - padding_x;
        //INNERBOX.height = INNERBOX.height - padding_y;


        let fillStyle = { color: 0x241C1C, alpha: 0.57 };
        let lineStyle = { lineWidth: BOX.stroke, color: 0x241f1c };
        let inner_fillStyle = { color: 0x917c6f, alpha: 0.39 };
        let inner_lineStyle = { lineWidth: INNERBOX.stroke, color: 0x241f1c };
  

        super(scene, BOX.x, BOX.y, BOX.width, BOX.height, fillStyle.color, fillStyle.alpha);
        this.setStrokeStyle(lineStyle.lineWidth, lineStyle.color);
        this.setOrigin(0, 0);

        let inner_box = scene.add.rectangle(INNERBOX.x, INNERBOX.y, 
            INNERBOX.width, INNERBOX.height, inner_fillStyle.color, inner_fillStyle.alpha);
        inner_box.setStrokeStyle(inner_lineStyle.lineWidth, inner_lineStyle.color);
        inner_box.setOrigin(0, 0);
        
        let side_box = scene.add.rectangle(SIDEBOX.x, SIDEBOX.y,
            SIDEBOX.width, SIDEBOX.height, inner_fillStyle.color, inner_fillStyle.alpha);
        side_box.setStrokeStyle(inner_lineStyle.lineWidth, inner_lineStyle.color);
        side_box.setOrigin(0, 0);

        //let graphics = scene.add.graphics();
        //let effects = scene.add.graphics();
        
        // set effects
        //this.set_graphics(graphics, x, y, width, height, this, stroke);

        // buttons
        let button_up = new Button(scene, BUTTONUP.x, 
            BUTTONUP.y, BUTTONUP.stroke, BUTTONUP.width, BUTTONUP.height, "⮝");
        let button_down = new Button(scene, BUTTONDOWN.x, 
            BUTTONDOWN.y, BUTTONDOWN.stroke, BUTTONDOWN.width, BUTTONDOWN.height, "⮟");
    
        //let button_down = new Button(scene, button_json.x, 
        //    button_json.y, button_json.stroke, button_json.width, button_json.height, "⇩");
        button_up.setDepth(10);
        button_down.setDepth(10);
        
        if(manifest)
        {
            let json_dialog = scene.cache.json.get('dialog');
            let DIALOGS = load_dialog(json_dialog, "title", window.language);
            let MANIFEST_TXT = config_json.manifest_text;
            let MANIFEST_EXIT = config_json.manifest_exit;
            let manifest_text = new Text(scene, 0, 0, DIALOGS.btn_mnf, 10);
            let manifest_exit = new Text(scene, 0, 0, DIALOGS.btn_opt2, 10);
    
            manifest_text.set_text(true);
            manifest_exit.set_text(true);
            manifest_text.resize_text(MANIFEST_TXT.x,MANIFEST_TXT.y, MANIFEST_TXT.width, MANIFEST_TXT.height);
            manifest_exit.resize_text(MANIFEST_EXIT.x,MANIFEST_EXIT.y, MANIFEST_EXIT.width, MANIFEST_EXIT.height);
            
            this.buttons = {manifest_text: manifest_text, manifest_exit:manifest_exit};
            
            // manifest text
            var MANIFEST = config_json.manifest_dialog;
            DIALOGS = load_dialog(json_dialog, "manifest", window.language);
            //let manifest_dialog = new Text(scene, MANIFEST.x, MANIFEST.y, DIALOGS.manifest, 12);
            let warpWidth = MANIFEST.width;

            let manifest_dialog = scene.add.text(0, 0, DIALOGS.manifest, 
                { fontFamily: 'Arial', color: '#00ff00'});

            manifest_dialog.setWordWrapWidth(warpWidth, true);
            manifest_dialog.setOrigin(0, 0);
            manifest_dialog.x = MANIFEST.x;
            manifest_dialog.y = MANIFEST.y;
            manifest_dialog.depth = 12;
            
            let shape = scene.make.graphics();
            shape.beginPath();
            shape.fillRect(MANIFEST.x, MANIFEST.y, MANIFEST.width, MANIFEST.height);
            let mask = shape.createGeometryMask();
            manifest_dialog.setMask(mask);
            //manifest_dialog.setCrop(0, 0, MANIFEST.width, MANIFEST.height);
            
            this.manifest = manifest_dialog;
            this.manifest.maxY = MANIFEST.y;
            this.manifest.minY = -5 * MANIFEST.height;
            
            // set event
            let callback_up = function()
            {
                if(this.manifest.y <= this.manifest.maxY)
                    this.manifest.y = this.manifest.y + 20;
                //console.log(this.manifest.y);
            }
            let callback_down = function()
            {
                if(this.manifest.y >= this.manifest.minY)
                    this.manifest.y = this.manifest.y - 20;
                //console.log(this.manifest.y);
            }
            
            button_up.text.on("pointerdown", callback_up, this);
            button_down.text.on("pointerdown", callback_down, this);
        }

        // bind  
        this.inner_box = inner_box;
        this.side_box = side_box;
        this.button_up = button_up;
        this.button_down = button_down;

        // add to display list
        scene.add.displayList.add(this);
   }
    
    set_graphics(graphics, x, y, width, height, rectangle, stroke){
        
        // Graphics fill 
        graphics.fillStyle(0x241C1C, 0.57); 
        graphics.fillRectShape(rectangle);
      
        // Inside Border black
        graphics.lineStyle(stroke, 0x000000, 0.4);
        let insideBorder = graphics.strokeRect(x, y, width, height); // can specify also radius
    }

    BoxSetVisible(bool)
    {
        this.setVisible(bool);
        this.inner_box.setVisible(bool);
        this.side_box.setVisible(bool);
        this.button_up.setVisible(bool);
        this.button_down.setVisible(bool);

        if(this.buttons)
        {
            this.buttons.manifest_exit.setVisible(bool);
            this.buttons.manifest_text.setVisible(bool);
            this.manifest.setVisible(bool);
        }
    }
} 
