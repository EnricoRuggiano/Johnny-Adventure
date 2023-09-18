/**
here we load everything and is a simple black screen, with logo
*/
import Phaser from 'phaser';
import loader from '../utils/load_assets.js';

export default class BootScene extends Phaser.Scene
{
  constructor()
  {
    super({key: 'boot'});
  }

  preload()
  {
    this.load.json('assets',   'assets/json/assets.json');
    this.load.json('coords',   'assets/json/coords.json');
    this.load.json('voice',    'assets/json/voice.json' );
    this.load.json('dialog',   'assets/json/dialog.json');
    this.load.svg('load_icon', 'assets/svg/logo.svg');
    
    window.gameLog.debug("boot scene - preload");
    loader.load_fonts();
  }

  create()
  {
    this.scene.start('load', { nxt_scn: 'title', future_scn: [] });
    window.gameLog.debug("boot scene - create");
  }
}
