import Phaser from 'phaser';
//import Text from '../object/Text.js';
import load_coords from '../utils/load_coords.js';

const dialogBoxStyle = { fillStyle: { color: 0x241C1C, alpha: 0.57 }, lineStyle: { color: 0x241f1c } }

const textStyle = {
  fontFamily: 'Verdana',
  fontWeight: 'bold',
  fontSize: '24px',
  fill: "#64FF2B", 
  stroke: "#000",
  strokeThickness: 5
  //backgroundColor: '#0F0F0F'
};

var text = 'Voluptatem distinctio' +
  'consequatur cumque fugiat aut adipisci non. \n' +
  'Modi voluptates omnis placeat et explicabo. ' +
  'Ut modi odit nobis non. Non ut dolores quos. Dolores possimus minima qui.';


export default class DialogBox {
  constructor(scene) 
  {
    // COORDS
    let json_coords = scene.cache.json.get('coords');
    let COORDS = load_coords(json_coords, "dialogbox");
    let BOX = COORDS.box;
    let INFOTEXT = COORDS.info_text;
    
    // box
    let fillStyle = { color: 0x241C1C, alpha: 0.57 };
    let lineStyle = { lineWidth: BOX.stroke, color: 0x241f1c };

    let box = scene.add.rectangle(BOX.x, BOX.y, BOX.width, BOX.height, fillStyle.color, fillStyle.alpha);
    box.setStrokeStyle(lineStyle.lineWidth, lineStyle.color);
    box.setOrigin(0, 0);
    box.setScrollFactor(0);
    box.depth = BOX.z;

    // zones for the text
    let dialogZone = scene.add.zone(box.x, box.y, box.width, box.height).setOrigin(0, 0);
    let infoZone = scene.add.zone(box.x, box.y, box.width, INFOTEXT.height).setOrigin(0, 0);

    // texts
    let infoText = scene.add.text(0, 0, '', textStyle);
    let dialogText = scene.add.text(0, 0, '', textStyle);

    infoText.setBackgroundColor('#241C1C57');
    infoText.setScrollFactor(0);
    dialogText.setScrollFactor(0);
    dialogText.depth = BOX.z;

    dialogText.setWordWrapWidth(dialogZone.width, true);
    infoText.setWordWrapWidth(infoZone.width, true);
    infoText.depth = BOX.z;


    this.fitFont(dialogText, dialogZone);
    this.fitFont(infoText, infoZone);

    //dialogText.setFixedSize(dialogZone.width, dialogZone.height);

    Phaser.Display.Align.In.TopCenter(infoText, dialogZone);
    Phaser.Display.Align.In.Center(dialogText, dialogZone);

    // bind
    this.box = box;
    this.infoText = infoText;
    this.dialogText = dialogText;
    this.dialogZone = dialogZone;
    this.infoZone = infoZone;

    // hide
    this.setVisible(false);

  }

  fitFont(text, bound) 
  {
    text.setFontSize(24);
    text.setStroke("#000", 5);

    if (text.height < bound.height)
    {
      //console.log(`fit font: ${text.style.fontSize} is ok `);   
      return;
    }
    
    while(text.height > bound.height)
    {
      if(parseInt(text.style.fontSize) - 1 < 0 )
      {
        text.setFontSize(1);  
        text.setStroke("#000", 1);
        break;
      }
      text.setStroke("#000", parseInt(text.style.fontSize)/5);
      text.setFontSize(parseInt(text.style.fontSize) - 5);
      window.gameLog.debug(`called fit font`);
    }
    //console.log(`final fontSize: ${text.style.fontSize}`);
      
  }

  
  
  /*fitFont(text, button)
  {
    let button_ratio = button.width / button.height;
    let text_ratio = text.width / text.height;

    if(text.height > button.height || text.width > button.width )
    {
      text.setDisplaySize(button.width, button.height);
    }
  }*/

  setVisible(bool)
  {
    this.box.setVisible(bool);
    this.infoText.setVisible(bool);
    this.dialogText.setVisible(bool);
  }
}