import Phaser from 'phaser';
import Logger from 'js-logger'
import BootScene    from './scenes/boot';
import LoaderScene  from './scenes/load.js';
import TitleScene   from './scenes/title.js';
import GmBarScene   from './scenes/gm_bar.js';
import GmHaremScene from './scenes/gm_harem.js';
import GmDrugScene from  './scenes/gm_drug.js';

//import {gameConfig} from './utils/game_config.js';

// add phaser config
var gameConfig =
{
  width: 1280,
  height: 720,
  type: Phaser.WEBGL,
  scene: [ BootScene, LoaderScene, TitleScene, GmBarScene, GmHaremScene, GmDrugScene],
  physics : { default: 'arcade', arcade: { debug: false }},
  "render.transparent"    : true,
  version: 1.0
}

window.addEventListener('load', function() {

  // Graphics Debug
  window.debugMode = false;

  // Logger Debug
  window.gameLog = Logger;
  window.gameLog.useDefaults();
  window.gameLog.setLevel(Logger.WARN);

  if (window.debugMode)
  {
    window.gameLog.setLevel(Logger.DEBUG);
  }

  window.languages = ["ENG", "ITA"];
  window.game = new Phaser.Game(gameConfig);
});
