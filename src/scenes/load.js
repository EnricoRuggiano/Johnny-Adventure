import Phaser from  'phaser';
import loader      from '../utils/load_assets.js';
import gameConfig  from '../utils/game_config.js';
import ProgressBar from '../objects/progress_bar.js';
import Button      from '../objects/button.js';
import Text        from '../objects/text.js';
import Grid        from '../objects/grid.js';

// get some objects coords
function coords()
{
  let GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  // progress bar
  let offset_y = GAME_HEIGHT * 0.015;
  let bar_x = GAME_WIDTH * 0.15;
  let bar_width = GAME_WIDTH * 0.7 ;
  let bar_height = GAME_HEIGHT * 0.035;
  let bar_y = GAME_HEIGHT * 0.7 - bar_height - 2 * offset_y;
  let bar_offset_x = bar_width * 0.025;
  let bar_offset_y = bar_height * 0.5;
  let bar_stroke = bar_width * 0.003;

  // button
  let button_width = GAME_WIDTH * 0.25;
  let button_height = GAME_HEIGHT * 0.1;
  let button_x = GAME_WIDTH * 0.5 - button_width * 0.5;
  let button_y = GAME_HEIGHT * 0.7 - bar_height - 4 * offset_y;// indow.innerHeight * 0.75;
  let button_stroke = button_width * 0.01;
  let button_text = "Start";
  /*let button_callback = function(){
      this.scene.start('title', []);
  };*/

  let BAR =
  {
    x: bar_x,
    y: bar_y,
    width: bar_width,
    height: bar_height,
    offset_x: bar_offset_x,
    offset_y: bar_offset_y,
    stroke: bar_stroke,
  };

  let BUTTON =
  {
    x: button_x,
    y: button_y,
    width: button_width,
    height: button_height,
    stroke: button_stroke,
    text: button_text
  };

  // background gradient
  let GRADIENT =
  {
    x: 0,
    y: 0,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    lineWidth: 0,
    topLeft: 0x131313,
    topRight: 0x131313,
    bottomLeft: 0x000000,
    bottomRight:  0x000000,
    alpha: 1
  };

  // app icon
  let ICON =
  {
    x: GAME_WIDTH * 0.5,
    y: GAME_HEIGHT * 0.5
  };

  return [BAR, BUTTON, GRADIENT, ICON ];
}

export default class LoadScene extends Phaser.Scene 
{
  constructor()
  {
      super({key: 'load'});
  }

  init(data)
  {
    //this.scenes_to_load = ['gm_bar', 'gm_harem', 'gm_drug', 'mn_room', 'title'];
    this.next_scene     = data["nxt_scn"];
    this.scenes_to_load = data["future_scn"]
    window.gameLog.debug(`load scene - init - next scene to load ${this.next_scene}`);
  }

  preload()
  {

    let json = this.cache.json.get('assets');

    // load assets for scenes
    let next_scene     = this.next_scene;
    let scenes_to_load = this.scenes_to_load;

    for (let scene of scenes_to_load)
    {
      loader.load_assets(json, scene, 'audio', this);
      loader.load_assets(json, scene, 'svg', this);
      loader.load_assets(json, scene, 'image', this);

      window.gameLog.debug(`load scene - init - preload scene ${scene}`);
    }

    // load assets also for next scene
    if(!scenes_to_load.includes(next_scene))
    {
      loader.load_assets(json, next_scene, 'audio', this);
      loader.load_assets(json, next_scene, 'svg', this);
      loader.load_assets(json, next_scene, 'image', this);

      window.gameLog.debug(`load scene - init - preload scene ${next_scene}`);

    }

    // load generic stuff for "gm_" scenes 
    loader.load_assets(json, "hud", 'image', this);
    loader.load_assets(json, "hud", 'svg'  , this);
    loader.load_assets(json, "player", 'spritesheet', this);

    // render some game objects
    let BAR, BUTTON, GRADIENT, ICON;
    [BAR, BUTTON, GRADIENT, ICON] = coords(this);

    // gradient
    let gradient = this.add.graphics();
    gradient.fillGradientStyle(GRADIENT.topLeft, GRADIENT.topRight,
      GRADIENT.bottomLeft, GRADIENT.bottomRight, GRADIENT.alpha);
    gradient.fillRect(GRADIENT.x, GRADIENT.y,
      GRADIENT.width, GRADIENT.height);

    // bar
    this.progress_bar = new ProgressBar(this, BAR.x, BAR.y, BAR.width, BAR.height,
            BAR.offset_x, BAR.offset_y, BAR.stroke);

    // debug grid
    if(window.debugMode)
    {
      this.grid = new Grid(this);
    }

    // Events
    this.load.on(  'progress', this.progress_bar.update_progress, this.progress_bar);
    this.load.once('complete', function () 
    {
          this.load.off('progress', this.progress_bar.update_progress);
          this.progress_bar.clear();
          delete this.progress_bar;

          // button callback
          let button_callback = function()
          {
              this.scene.start(next_scene, []);
          };

          this.start_button = new Button(this, BUTTON.x, BUTTON.y, BUTTON.stroke,
                  BUTTON.width, BUTTON.height, BUTTON.text, button_callback);

    }, this);
  }
}
