import gameConfig  from '../../utils/game_config.js';
import EventDispatcher from "./event_dispatcher";

// init player events
// init inventory events

export default class GmEvents
{
  constructor(scene)
  {
    initPlayerEvents(scene);
    initInventoryEvents(scene);
    initObjectsEvents(scene);
  }

  initStartDialogEvent(scene, event, eventGameObjects)
  {
    let emitter = EventDispatcher.getInstance();
    
    let GAME_WIDTH, GAME_HEIGHT;
    [GAME_WIDTH, GAME_HEIGHT] = gameConfig();


    emitter.on(event, function ()
    {    
      // set visible off all others assets of the scene
      for (let gameObject of scene.children.getAll())
      {
        gameObject.setVisible(false);
      }

      // set visible all stuff of the dialog
      for (let e of eventGameObjects)
      {
        e.setVisible(true);
      }

      // set camera focus standard window
      let scene_camera = scene.cameras.main;
      scene_camera.stopFollow();
      scene_camera.centerOn(GAME_WIDTH/2, GAME_HEIGHT/2);  
    });
  }

  initEndDialogEvent(scene, event, eventGameObjects)
  {
    let emitter = EventDispatcher.getInstance();

    emitter.on(event, function ()
    { 
      // set visible off all others assets of the scene
      for (let gameObject of scene.children.getAll())
      {
        gameObject.setVisible(true);

      }

      // hide dialogBox
      scene.dialogBox.box.setVisible(false);
      scene.dialogBox.dialogZone.setVisible(false);

      // set visible all stuff of the dialog
      for (let e of eventGameObjects)
      {
        e.setVisible(false);
      }

      // camera return to follow player
      let scene_camera = scene.cameras.main;
      scene_camera.startFollow(scene.player.sprite);
    });
  }
};

function initPlayerEvents(scene)
{
  let player = scene.player;
  let sprite = player.sprite;

  scene.input.on('pointerdown', function(pointer, gameObject)
    {
      //console.log(gameObject[0])
      if(gameObject[0])
      {
        return;
      }

      let mouseX = pointer.worldX;
      let xDiff = mouseX - sprite.x;

      // lets debug pointer clicks
      if(window.debugMode)
      {
        let objPlayer = this.scene.player;
        let diff = Math.round(xDiff * 0.1 * 100) / 100;
        let roundMouseX = Math.round(mouseX * 0.1 * 100) / 100;
        let roundPlayerX = Math.round(sprite.x * 0.1 * 100) / 100;
        objPlayer.debugPointer.setText(`POINTERDOWN diff: ${diff}; player: ${roundPlayerX}; mouse: ${roundMouseX}`);
        window.gameLog.debug(`POINTERDOWN diff: ${diff}; player: ${roundPlayerX}; mouse: ${roundMouseX}`);
      }

      if(Math.sign(xDiff) === 1)
      {
        sprite.setVelocityX(200);
        sprite.anims.play('walk_right', true);
      }
      else
      {
        sprite.setVelocityX(-200);
        sprite.anims.play('walk_left', true);
      }
    });

    scene.input.on('pointerup', function(pointer)
    {
      let mouseX = pointer.worldX;
      let xDiff = mouseX - sprite.x;

      // lets debug pointer clicks
      if(window.debugMode)
      {
        let objPlayer = this.scene.player;
        let diff = Math.round(xDiff * 0.1 * 100) / 100;
        let roundMouseX = Math.round(mouseX * 0.1 * 100) / 100;
        let roundPlayerX = Math.round(sprite.x * 0.1 * 100) / 100;
        objPlayer.debugPointer.setText(`POINTERUP diff: ${diff}; player: ${roundPlayerX}; mouse: ${roundMouseX}`);
        window.gameLog.debug(`POINTERUP diff: ${diff}; player: ${roundPlayerX}; mouse: ${roundMouseX}`);
      }

      if(Math.sign(xDiff) === 1)
      {
        sprite.setVelocityX(0);
        sprite.anims.play('stand_right', true);
      }
      else
      {
        sprite.setVelocityX(0);
        sprite.anims.play('stand_left', true);
      }
    });

    // if keyboard is found
    scene.input.keyboard.on('keydown', function(event)
    {
      switch (event.key)
      {
        case 'ArrowRight':
        {
          sprite.setVelocityX(200);
          sprite.anims.play('walk_right', true);
          break;
        }
        case 'ArrowLeft':
        {
          sprite.setVelocityX(-200);
          sprite.anims.play('walk_left', true);
          break;
        }
      /*  case 'v':
        {
          sprite.anims.play('talk_right', true);
          break;
        }
        case 'c':
        {
          sprite.anims.play('talk_left', true);
          break;
        }*/
      }
    });

    scene.input.keyboard.on('keyup', function(event)
    {
      switch (event.key)
      {
        case 'ArrowRight':
        {
          sprite.setVelocityX(0);
          sprite.anims.play('stand_right', true);
          break;
        }
        case 'ArrowLeft':
        {
          sprite.setVelocityX(0);
          sprite.anims.play('stand_left', true);
          break;
        }
        /*case 'v':
        {
          sprite.anims.play('stand_right', true);
          break;
        }
        case 'c':
        {
          sprite.anims.play('stand_right', true);
          break;
        }*/
      }
    });
}

function initInventoryEvents(scene)
{
  let GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  // drag on
  scene.input.on('drag', function (pointer, gameObject, dragX, dragY)
  {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  // drag enter
  scene.input.on('dragenter', function (pointer, gameObject, dropZone) 
  {
    window.gameLog.debug(`DRAGENTER of ${gameObject.name} on ${dropZone.name}`);

    let json_dialog = scene.scene_jsons.json_dialog;
    let json_dialog_hud = scene.scene_jsons.json_dialog_hud;
    
    let hud_content = json_dialog_hud[gameObject.name] || gameObject.name;
    let drop_content = json_dialog[dropZone.name] || dropZone.name;
    let hud_use = json_dialog_hud["use"] || "Use";
    let hud_with = json_dialog_hud["with"] || "with";
    scene.dialogBox.infoText.setText((hud_use + " " + hud_content + " " + hud_with + " " +  drop_content));
    scene.dialogBox.fitFont(scene.dialogBox.infoText, scene.dialogBox.infoZone);
    Phaser.Display.Align.In.Center(scene.dialogBox.infoText, scene.dialogBox.infoZone);
  });
  
  // drag leave
  scene.input.on('dragleave', function (pointer, gameObject, dropZone) 
  {
    window.gameLog.debug(`DRAGLEAVE of ${gameObject.name} on ${dropZone.name}`);
    scene.dialogBox.infoText.setText('');
    //scene.dialogBox.fitFont(scene.dialogBox.infoText, scene.dialogBox.infoZone);
    //Phaser.Display.Align.In.Center(scene.dialogBox.infoText, scene.dialogBox.infoZone);
  });

  // drop
  scene.input.on('drop', function (pointer, item, dropZone) 
  {
    let action_name = item.name + "_" + dropZone.name;

    window.gameLog.debug(`DROP ACTION: ${action_name}`);  
    
    // depends on the object (?)
    /*switch (action_name)
    {
      case "take_zon_0": 
      {
        window.gameLog.debug(`TAKING A PLANT!`);
        break;
      }

      default:
      {
        scene.player.sayNo(scene, item, dropZone); 
      }
    }*/
    //scene.player.sayNo(scene, item, dropZone);
    //scene.player.sprite.anims.play('talk_right', true);
    scene.player.sayNo(scene, item, dropZone);

  });


  // drag end
  scene.input.on('dragend', function (pointer, gameObject, event, e)
  {
    window.gameLog.debug(`DRAGEND`);  
    gameObject.x = gameObject.input.dragStartX;
    gameObject.y = gameObject.input.dragStartY;

    // console.log(pointer);
    // console.log(event);
    // console.log(e);

    //initPlayerEvents(scene);
    //initObjectsEvents(scene);

    //pointer.event.stopPropagation();

    //scene.input.off('pointerdown');
    //scene.input.off('pointerup');
    //scene.input.stopPropagation();
    //initPlayerEvents(scene);
    //initObjectsEvents(scene);
  });

  let objects = scene.hud.objects;
  for (let gameObject of objects)
  {
    // cancel player events
    gameObject.on('pointerdown', function(p, lx, ly, event)
    {
      window.gameLog.debug(`POINTERDOWN on game object`);
      scene.input.off('pointerdown');
      scene.input.off('pointerup');
    });

    // reinit player events
    gameObject.on('pointerup', function(p, lx, ly, event)
    {
      window.gameLog.debug(`POINTERUP on game object`);
      event.stopPropagation();
      initPlayerEvents(scene);
      initObjectsEvents(scene);
    });
  }

  // HUD arrows events
  let arrowLeft = scene.hud.arrows.arrowLeft;
  let arrowRight = scene.hud.arrows.arrowRight;

  arrowLeft.on('pointerdown', function(p, lx, ly, event)
  {
    window.gameLog.debug(`POINTERDOWN on arrow`);
    scene.input.off('pointerdown');
    scene.input.off('pointerup');
    scene.hud.shiftLeft();
  });

  // reinit player events
  arrowLeft.on('pointerup', function(p, lx, ly, event)
  {
    window.gameLog.debug(`POINTERUP on arrow`);
    initPlayerEvents(scene);
    initObjectsEvents(scene);
  });

  arrowRight.on('pointerdown', function()
  {
    window.gameLog.debug(`POINTERDOWN on arrow`);
    scene.input.off('pointerdown');
    scene.input.off('pointerup');
    scene.hud.shiftRight();
  });

  // reinit player events
  arrowRight.on('pointerup', function()
  {
    window.gameLog.debug(`POINTERUP on arrow`);
    initPlayerEvents(scene);
    initObjectsEvents(scene);
  });

  // item button event
  let itemButton = scene.hud.button;
  itemButton.on( 'pointerover', function(p, lx, ly, event)
  {
    window.gameLog.debug(`POINTEROVER on item button`);
    
    let tweens_up = scene.hud.tweens_up;
    for (let tween of tweens_up)
    {
      tween.restart();
    }
    event.stopPropagation();

    // // scene.input.off('pointerdown');
    // scene.input.off('pointerup');
    //scene.hud.setVisible();
  });
  
  itemButton.on( 'pointerout', function(p, lx, ly, event)
  {
    window.gameLog.debug(`POINTERLEAVE on item button`);

    if(p.worldY >= GAME_HEIGHT * 0.80)
    {
      // skip if i clicking
      return;
    }    

    let tweens_down = scene.hud.tweens_down;
    for (let tween of tweens_down)
    {
      tween.restart();
    }

   //scene.tweens.timeScale=0;
    //scene.input.off('pointerdown');
    //scene.input.off('pointerup');
    //scene.hud.setVisible();
  });
  let itemBg = scene.hud.background;
  itemBg.setInteractive();
  itemBg.on('pointerout', function(p, lx, ly, event){
    window.gameLog.debug(`POINTERLEAVE on item button`);

    if(p.worldY >= GAME_HEIGHT * 0.80)
    {
      // skip if i clicking
      return;
    }    

    let tweens_down = scene.hud.tweens_down;
    for (let tween of tweens_down)
    {
      tween.restart();
    }
  })
  
  itemButton.on( 'pointerdown', function()
  {
    window.gameLog.debug(`POINTERDOWN on item button`);
    scene.input.off('pointerdown');
    scene.input.off('pointerup');
    scene.hud.setVisible();
  });

  // reinit player events
  itemButton.on('pointerup', function()
  {
    window.gameLog.debug(`POINTERUP on item button`);
    initPlayerEvents(scene);
    initObjectsEvents(scene);
  });
}

function initObjectsEvents(scene)
{
  let GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  scene.input.on('pointerover', function(event, gameObject)
  {
    let json_dialog = scene.scene_jsons.json_dialog;
    let text_content = json_dialog[gameObject[0].name];
    let json_dialog_hud = scene.scene_jsons.json_dialog_hud;
    let text_content_hud = json_dialog_hud[gameObject[0].name];

    // check in hud
    if(!text_content)
    {  
      text_content = text_content_hud;
    }

    // if no dialog is mapped in the json use object name
    if(!text_content)
    {
      text_content = gameObject[0].name;
    }
    
    window.gameLog.debug(`over ${gameObject[0].name} info is ${text_content}`);
    scene.dialogBox.infoText.setText(text_content);
    scene.dialogBox.fitFont(scene.dialogBox.infoText, scene.dialogBox.infoZone);
    Phaser.Display.Align.In.Center(scene.dialogBox.infoText, scene.dialogBox.infoZone);
    scene.dialogBox.infoText.setVisible(true);
  });
  
  scene.input.on('pointerout', function(p)
  {
    //scene.dialogBox.infoText.setText('');
    scene.dialogBox.infoText.setVisible(false);
  });

  scene.input.on('pointerdown', function (pointer, gameObject) 
  {
    if (gameObject[0] /*&& Object.values(scene.world.zone).includes(gameObject[0])*/) 
    {
      scene.player.examine(scene, gameObject[0]); 
    
      //console.log(pointer);
      pointer.event.stopPropagation();
      //initPlayerEvents();
      //initObjectsEvents();
    }
  });
}