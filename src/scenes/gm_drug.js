import GmScene        from './template/gm.js'
import GmDrugEvents   from '../events/gmdrug_events.js'
import DialogBox      from '../dialogs/dialogBox.js'

export default class GmDrugScene extends GmScene 
{
  constructor() 
  {
    super('gm_drug');
  }

  preload() 
  {
    window.gameLog.debug("gm scene - gm_drug");
  }

  create() 
  {
    // load json
    this.loadJson('gm_drug');

    // background
    this.addBackground('background');

    // player
    let saveGame = {};
    this.addPlayer(saveGame);

    // images
    this.addImage('spratz');

    // Dead Zone
    this.addDeadZone("dead_zone_0");
    this.addDeadZone("dead_zone_1");

    this.addDialogAsset("spratz_dialog",      "image");
    this.addDialogAsset("spratz_dialog_back", "image");

    // Physics
    this.addPhysics();

    // Camera
    this.addCamera();

    // dialog box
    this.dialogBox = new DialogBox(this);

    // events
    this.gm_events = new GmDrugEvents(this);

  }

  // @After json background
  addPhysics() 
  {
    let COORDS = this.scene_jsons.json_coords;
    let GAME_WIDTH = this.scene_jsons.GAME_WIDTH;
    let GAME_HEIGHT = this.scene_jsons.GAME_HEIGHT;
    let background = this.background;

    this.physics.world.setBounds(
      COORDS.bounds.x,
      0,
      COORDS.bounds.width,
      COORDS.bounds.height);

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
    scene_camera.setBounds(-220, 0, 1500, GAME_HEIGHT);
    scene_camera.startFollow(this.player.sprite);
  }
}
