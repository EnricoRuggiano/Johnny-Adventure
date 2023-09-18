/**
  this is a template scene for adventure game
   - point and clicks
   - inventory
 */

 import Phaser      from 'phaser';
 import resize      from '../../utils/resize.js';
 import gameConfig  from '../../utils/game_config.js';
 import load_coords from '../../utils/load_coords.js';
 import load_dialog from '../../utils/load_dialog.js';
 import load_voice  from '../../utils/load_voice.js';
 import animation   from '../../utils/animation.js'
 import Grid        from '../../objects/grid.js'
 import Player      from '../../player/player.js'
 import Hud         from '../../player/hud.js'
 
 export default class GmScene extends Phaser.Scene
 {
   constructor(key)
   {
     super({key: key});
   
     // get player savegame
   }

   preload()
   {
     window.gameLog.debug(`preloading ${key} scene`);
   }

   loadJson(key)
   {
    let json_dialog = this.cache.json.get('dialog');
    let json_coords = this.cache.json.get('coords');
    let json_voice = this.cache.json.get('voice');

    // dialog
    let DIALOGS = load_dialog(json_dialog, key, window.language);
    let HUD_DIALOGS = load_dialog(json_dialog, "hud", window.language);
    window.gameLog.debug(`${key} scene - dialog json is ${DIALOGS}`);
    
    // voices
    let VOICES = load_voice(json_voice, key, window.language);
    let PLAYER_VOICES = load_voice(json_voice, "player", window.language);
    window.gameLog.debug(`${key} scene - voice json is ${VOICES}`);
    
    // coords
    let COORDS = load_coords(json_coords, key);
    window.gameLog.debug(`${key} scene - voice json is ${COORDS}`);
    
    // game config
    let GAME_WIDTH, GAME_HEIGHT;
    [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

    // bind to this object
    this.scene_jsons = {};
    this.scene_jsons.json_dialog = DIALOGS;
    this.scene_jsons.json_dialog_hud = HUD_DIALOGS;
    this.scene_jsons.json_coords = COORDS;
    this.scene_jsons.json_voice = VOICES;
    this.scene_jsons.json_voice_player = PLAYER_VOICES;

    this.scene_jsons.GAME_WIDTH = GAME_WIDTH;
    this.scene_jsons.GAME_HEIGHT = GAME_HEIGHT;
  }

  addBackground(key)
  {
    let COORDS = this.scene_jsons.json_coords;  
    let background = this.add.image(0, 0, key);
    background.x = COORDS[key].x;
    background.y = COORDS[key].y;
    background.depth = COORDS[key].z;
    background.setName(key);

    this.background = background; 
    window.gameLog.debug(`${key} scene - added background ${key}`);

    // debug grid
    if(window.debugMode)
    {
      this.grid = new Grid(this);
    }
    return background;
  }


  addPlayer(jsonSaveGame)
  {
   let COORDS = this.scene_jsons.json_coords;
   let player = new Player(this, COORDS.player.x, COORDS.player.y, "");
   //resize(player.sprite, 1, COORDS.player.resize);
   player.sprite.x = COORDS.player.x;
   player.sprite.y = COORDS.player.y;
   player.sprite.depth = COORDS.player.z;
  
   // bind player
   this.player = player;

   // HUD
   this.hud = new Hud(this, this.player);

  }

   // @ After json are loaded  
   addImage(key)
   {
    let COORDS = this.scene_jsons.json_coords;  
    let image = this.add.image(0, 0, key);
    //resize(image, 1, COORDS[key].resize);
    image.x = COORDS[key].x;
    image.y = COORDS[key].y;
    image.depth = COORDS[key].z;
    image.setName(key);
    window.gameLog.debug(`${key} scene - added image ${key}`);
    return image;
  }

   // @ After json are loaded
   addZone(key)
   {
    let COORDS = this.scene_jsons.json_coords;
    
    let zone = this.add.zone(COORDS[key].x, COORDS[key].y, COORDS[key].width, COORDS[key].height);
    zone.setOrigin(0, 0);
    zone.setName(key);
    zone.setDropZone();

    window.gameLog.debug(`${key} scene - added zone ${key}`);

    // debug zone
    if(window.debugMode)
    {
      let style = { fillStyle: {color: 0x66ff99, alpha: 0.30}, lineStyle: {color: 0x006600}};
      let debug = this.add.graphics(style);
      debug.fillRectShape(zone);
      debug.strokeRectShape(zone);
    }
    return zone;
   }

   addSprite(key, key2, framerate, fps)
   {
    // coords
    let COORDS = this.scene_jsons.json_coords;

    // create animation
    this.anims.create(animation(key, framerate, fps));
    
    let sprite = this.add.sprite(0, 0, key + '0').play(key);
    //resize(sprite, 1, COORDS[key2].resize);
    sprite.x = COORDS[key2].x;
    sprite.y = COORDS[key2].y;
    sprite.depth = COORDS[key2].z;
    sprite.setName(key2);

    return sprite;
   }

/*   // @After json background
   addPhysics()
   {
    let COORDS = this.scene_jsons.json_coords;
    let GAME_WIDTH  = this.scene_jsons.GAME_WIDTH;
    let GAME_HEIGHT = this.scene_jsons.GAME_HEIGHT;
    let background = this.background;

    this.physics.world.setBounds(GAME_WIDTH/2 - background.displayWidth/2,
      0, background.displayWidth - COORDS.bounds.width, COORDS.bounds.height);
    this.physics.world.setBoundsCollision(true, true, true, true);
   }

   // @After json player background
   addCamera()
   {
    // coords
    let COORDS = this.scene_jsons.json_coords;
    let GAME_WIDTH  = this.scene_jsons.GAME_WIDTH;
    let GAME_HEIGHT = this.scene_jsons.GAME_HEIGHT;
    let background = this.background;

    // camera
    let scene_camera = this.cameras.main;
    scene_camera.setSize(GAME_WIDTH, GAME_WIDTH);
    scene_camera.setBounds(GAME_WIDTH/2 - background.displayWidth/2, 0, background.displayWidth, background.height);
    scene_camera.startFollow(player.sprite);
   }
*/

  // @ After json are loaded  
  addDialogAsset(key, type, other)
  {
    let asset;
    switch(type)
    {
      case "image":
      {
        asset = this.addImage(key);
        break;
      }
      case "sprite":
      {
        asset = this.addSprite(key, other[0], other[1], other[2]);
        break;
      }
      case "background":
      {
        asset = this.addBackground(key); 
        break;
      }
    }
    asset.setVisible(false);
    return asset;
  }

   // @ After json are loaded
   addDeadZone(key)
   {
    let COORDS = this.scene_jsons.json_coords;
    
    let zone = this.add.zone(COORDS[key].x, COORDS[key].y, COORDS[key].width, COORDS[key].height);
    zone.setOrigin(0, 0);
    zone.setName(key);
    zone.setInteractive();
    
    window.gameLog.debug(`${key} scene - added Dead zone ${key}`);

    // debug zone
    if(window.debugMode)
    {
      let style = { fillStyle: {color: 0xdc0b39, alpha: 0.60}, lineStyle: {color: 0x9e0000}};
      let debug = this.add.graphics(style);
      debug.fillRectShape(zone);
      debug.strokeRectShape(zone);
    }
    return zone;
   }

   // block scenes interactions
  blockScene()
  {
    // hide hud
    this.hud.setVisible(false, true);

    this.dialogBox.infoText.setVisible(false);

    // stop player
    this.player.sprite.setVelocity(0);
    
    // stop keyboard and pointer
    this.input.mouse.stopListeners();
    this.input.keyboard.stopListeners();

  }

  // release scene interactions
  releaseScene()
  {
    // show hud
    this.hud.setVisible(true, true);

    this.dialogBox.infoText.setVisible(true);

    // restart leyboard and pointer
    this.input.mouse.startListeners();
    this.input.keyboard.startListeners();
  }
 }
