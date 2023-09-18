import GmScene        from './template/gm.js'
import GmHaremEvents  from '../events/gmharem_events.js'
import DialogBox      from '../dialogs/dialogBox.js'

export default class GmHaremScene extends GmScene 
{
  constructor() 
  {
    super('gm_harem');
  }

  preload() 
  {
    window.gameLog.debug("gm scene - gm_harem");
  }

  create() 
  {
    // load json
    this.loadJson('gm_harem');

    // background
    this.addBackground('harem_back');

    // player
    let saveGame = {};
    this.addPlayer(saveGame);

    // images
    this.addImage('magnolia');
    this.addImage('tiger');
    this.addImage('harem_env_0');
    this.addImage('harem_env_1');

    // Dead Zone
    this.addDeadZone("dead_zone_0");
    this.addDeadZone("dead_zone_1");

    this.addDialogAsset("magnolia_dialog",      "image");
    this.addDialogAsset("magnolia_dialog_back", "image");

    // Physics
    this.addPhysics();

    // Camera
    this.addCamera();

    // dialog box
    this.dialogBox = new DialogBox(this);

    // events
    this.gm_events = new GmHaremEvents(this);

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
    scene_camera.setBounds(0, 0, background.displayWidth, GAME_HEIGHT);
    scene_camera.startFollow(this.player.sprite);
  }
}
