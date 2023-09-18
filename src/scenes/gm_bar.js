import GmScene   from './template/gm.js'
import GmBarEvents  from '../events/gmbar_events.js'
import DialogBox from '../dialogs/dialogBox.js'

export default class GmBarScene extends GmScene 
{
  constructor() 
  {
    super('gm_bar');
  }

  preload() 
  {
    window.gameLog.debug("gm scene - gm_bar");
  }

  create() 
  {
    // load json
    this.loadJson('gm_bar');

    // background
    this.addBackground("gm_back");

    // player
    let saveGame = {};
    this.addPlayer(saveGame);

    // sprites
    this.addSprite("nurse_c", "nurse", 12, 29);

    // images
    this.addImage("jim");
    this.addImage("sara");
    //this.addImage("scarlet"); 
    this.addImage("env_0");
    this.addImage("env_1");
    this.addImage("env_2");
    this.addImage("env_3");
    this.addImage("env_4");
    this.addImage("env_5");
    this.addImage("env_6");
    this.addImage("itm_0");
    this.addImage("itm_1");
    this.addImage("itm_2");
    this.addImage("itm_3");
    this.addImage("itm_4");
    this.addImage("itm_5");
    
    // zones
    this.addZone("zon_0");
    this.addZone("zon_1");
    this.addZone("zon_2");
    this.addZone("zon_3");
    this.addZone("zon_4");
    this.addZone("zon_5");
    this.addZone("zon_6");
    this.addZone("zon_7");
    this.addZone("zon_8");
    this.addZone("zon_9");
    this.addZone("zon_10");
    this.addZone("zon_11");

    // dialog
    this.addDeadZone("dead_zone_0");
    this.addDeadZone("dead_zone_1");
    this.addDeadZone("dead_zone_2");

    this.addDialogAsset("kora_dialog",      "image");
    this.addDialogAsset("kora_dialog_back", "image");

    // Physics
    this.addPhysics();

    // Camera
    this.addCamera();

    // dialog box
    this.dialogBox = new DialogBox(this);

    // events
    this.gm_events = new GmBarEvents(this);

  }

  // @After json background
  addPhysics() 
  {
    let COORDS = this.scene_jsons.json_coords;
    let GAME_WIDTH = this.scene_jsons.GAME_WIDTH;
    let GAME_HEIGHT = this.scene_jsons.GAME_HEIGHT;
    let background = this.background;

    this.physics.world.setBounds(COORDS.bounds.x, COORDS.bounds.y,COORDS.bounds.width, COORDS.bounds.height);
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  // @After json player background
  addCamera() 
  {
    // coords
    let COORDS = this.scene_jsons.json_coords;
    let GAME_WIDTH = this.scene_jsons.GAME_WIDTH;
    let GAME_HEIGHT = this.scene_jsons.GAME_HEIGHT;
    let background = this.background;

    // camera
    let scene_camera = this.cameras.main;
    scene_camera.setSize(GAME_WIDTH, GAME_HEIGHT);
    scene_camera.setBounds(COORDS.bounds.x, 0, background.displayWidth, GAME_HEIGHT);
    scene_camera.startFollow(this.player.sprite);
  }
}