/*
sprite class:
- inventory
- score
- sprite of the sprite
- inputs
*/

import Phaser from 'phaser';
import gameConfig from '../utils/game_config.js';

export default class Player
{
  constructor(scene, x, y, texture)
  {
    this.sprite = scene.physics.add.sprite(154, 520, '');
    initAnimation(scene);
    debugClicks(scene, this);

    this.sprite.setCollideWorldBounds(true);
    this.sprite.anims.play('stand_right', true);

    // inventory
    this.inventory = ["hand", "money", "ibm", "gym"];

    // bind as sprite
    scene.player = this;
  }

  // examine object
  examine(scene, gameObject)
  {
    // rollback function when anim is endend
    let end_examine = function rollback() 
    {
      if (gameObject.x >= this.sprite.x)
      {
        this.sprite.anims.play('stand_right', true);
      }    
      else
      {
        this.sprite.anims.play('stand_left', true);
      }

      // hide dialog box
      scene.dialogBox.dialogText.setText('');
      scene.dialogBox.dialogText.setVisible(false);
      scene.dialogBox.box.setVisible(false);
      scene.releaseScene()
    };

    let VOICES = scene.scene_jsons.json_voice;
    let interactions = VOICES[gameObject.name];
    if(!interactions)
    {
      window.gameLog.debug(`${gameObject.name} interactions not implemented`);
      return;
    }

    // block scene
    scene.blockScene();

    // right or left talk
    if (gameObject.x >= this.sprite.x)
    {
      this.sprite.anims.play('talk_right', true);
    }
    else
    {
      this.sprite.anims.play('talk_left', true);
    }


    // get random element from array
    let index = Math.floor(Math.random() * interactions.length);
    let interaction = interactions[index];
    window.gameLog.debug(`examine interaction - used ${index} over ${interactions.length}`);
    let interval = interaction.time;

    scene.time.delayedCall(interval, end_examine, [], this);
   
    // set dialog text
    scene.dialogBox.dialogText.setText(interaction.text);
    scene.dialogBox.fitFont(scene.dialogBox.dialogText, scene.dialogBox.dialogZone);
    Phaser.Display.Align.In.Center(scene.dialogBox.dialogText, scene.dialogBox.dialogZone);
    scene.dialogBox.dialogText.setVisible(true);
    scene.dialogBox.box.setVisible(true);
    
  }

  sayNo(scene, item, dropZone)
  {
    // rollback function when anim is endend
    let end_examine = function rollback() 
    {
      if (dropZone.x >= this.sprite.x)
      {
        this.sprite.anims.play('stand_right', true);
      }    
      else
      {
        this.sprite.anims.play('stand_left', true);
      }

      // hide dialog box
      scene.dialogBox.dialogText.setText('');
      scene.dialogBox.dialogText.setVisible(false);
      scene.dialogBox.box.setVisible(false);
      scene.releaseScene()
    };

    let VOICES = scene.scene_jsons.json_voice_player;
    let interactions = VOICES['no'];
    if(!interactions)
    {
      window.gameLog.debug(`${gameObject.name} interactions not implemented`);
      return;
    }

    // block scene
    scene.blockScene();

    // right or left talk
    if (dropZone.x >= this.sprite.x)
    {
      this.sprite.anims.play('talk_right', true);
    }
    else
    { 
      window.gameLog.debug('saying no on the left');
    
      //console.log(this.sprite.anims);
      this.sprite.anims.play('talk_left', true);
    }

    // get random element from array
    let index = Math.floor(Math.random() * interactions.length);
    let interaction = interactions[index];
    window.gameLog.debug(`examine interaction - used ${index} over ${interactions.length}`);
    let interval = interaction.time;

    scene.time.delayedCall(interval, end_examine, [], this);
   
    // set dialog text
    scene.dialogBox.dialogText.setText(interaction.text);
    scene.dialogBox.fitFont(scene.dialogBox.dialogText, scene.dialogBox.dialogZone);
    Phaser.Display.Align.In.Center(scene.dialogBox.dialogText, scene.dialogBox.dialogZone);
    scene.dialogBox.dialogText.setVisible(true);
    scene.dialogBox.box.setVisible(true);
  }
}

// init the animations
function initAnimation(scene)
{
  scene.anims.create({
    key: 'walk_left',
    frames: scene.anims.generateFrameNumbers('walk_left', {start: 0, end: 7}),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'stand_right',
    frames: scene.anims.generateFrameNumbers('talk_right', {start: 9, end: 9})
  });

  scene.anims.create({
    key: 'stand_left',
    frames: scene.anims.generateFrameNumbers('talk_left', {start: 0, end: 0})
  });

  scene.anims.create({
    key: 'talk_right',
    frames: scene.anims.generateFrameNumbers('talk_right', {start: 0, end: 8}),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'talk_left',
    frames: scene.anims.generateFrameNumbers('talk_left', {start: 1, end: 9}),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'walk_right',
    frames: scene.anims.generateFrameNumbers('walk_right', {start: 0, end: 7}),
    frameRate: 10,
    repeat: -1
  });
}

function debugClicks(scene, player)
{
  if(window.debugMode)
  {
    let [GAME_WIDTH, GAME_HEIGHT] = gameConfig();
    let DEBUG_POINTER =
    {
      x : 0,
      y : GAME_HEIGHT * 0.1 * 0.25 * 2,
      text : `Xdiff: ${0} - pointerX: ${null} - spriteX: ${null}`,
      style :
      {
        fontSize: GAME_HEIGHT * 0.1 * 0.25,
        color: '#0020C2',
      }
    };
    player.debugPointer = scene.add.text(DEBUG_POINTER.x, DEBUG_POINTER.y,
      DEBUG_POINTER.text, DEBUG_POINTER.style);
  }
}
