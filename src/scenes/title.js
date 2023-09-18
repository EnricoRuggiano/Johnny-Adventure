/**
* This is main title scene.
* - the player should be able to select the chapters
* - load saved game
* - start new game
* - extra and stuff...
* @after - boot
*
*
* */

import Phaser from 'phaser';
import ProgressBar from '../objects/progress_bar.js';
import Button from '../objects/button.js';
import Box from '../objects/box.js';
import GalleryBox from '../objects/gallerybox.js'
import Text from '../objects/text.js'
import Grid from '../objects/grid.js';

import gameConfig from '../utils/game_config.js';
import resize from '../utils/resize.js';
import loader from '../utils/load_assets.js';
import load_dialog from '../utils/load_dialog.js';
import load_coords from '../utils/load_coords.js';
import create_animation from '../utils/animation.js';
import create_header from '../objects/header_banner.js';

// game config width, height
//GAME_WIDTH = GAME_WIDTH;// = GAME_WIDTH;
//GAME_HEIGHT = GAME_HEIGHT;// = GAME_HEIGHT;

function hideText(textsArray, bool) {
  for (let btn of textsArray) {
    btn.setVisible(bool);
  }
}

function changeLanguage(language, texts, scene) {
  window.language = language;
  let json_dialog = scene.cache.json.get('dialog');
  let DIALOGS = load_dialog(json_dialog, "title", language);

  for (let [key, value] of Object.entries(texts)) {
    for (let t of value) {
      t.text = DIALOGS[t.name];
      // should resize ?
    }
  }
}

export default class TitleScene extends Phaser.Scene {

  constructor() {
    super({ key: 'title' });
  }

  preload() {

  }

  create() {
    let json_dialog = this.cache.json.get('dialog');
    let json_coords = this.cache.json.get('coords');
    let DIALOGS = load_dialog(json_dialog, "title");
    let COORDS = load_coords(json_coords, "title");

    // animation
    this.anims.create(create_animation('title', COORDS.johnny.frameRate, COORDS.johnny.nFrames));

    let background = this.add.image(0, 0, "loading_screen");
    let sprite = this.add.sprite(0, 0, "title0");
    let logo = this.add.image(0 , 0, "logo");

    background.x = COORDS.background.x;
    background.y = COORDS.background.y;
    sprite.x = COORDS.johnny.x;
    sprite.y = COORDS.johnny.y;
    logo.x = COORDS.logo.x;
    logo.y = COORDS.logo.y;
    
    // johnny sprite
    //let sprite = this.add.sprite(BACK_JOHNNY.x, BACK_JOHNNY.y, BACK_JOHNNY.firstFrame);
    //resize(sprite, 1, 0.35);

    sprite.play('title');

    // play music
    this.audio = this.sound.add('jingle');
    this.audio.play("", { loop: true });

    // gallery
    let gallery = new GalleryBox(this);
    gallery.setVisible(false);
    let btn_gallery_exit = gallery.buttons.gallery_exit;
    let btn_gallery_text = gallery.buttons.gallery_text;
    
    // manifest 
    let manifestJson = load_coords(json_coords, "manifest");
    let manifest = new Box(this, manifestJson, true);
    manifest.BoxSetVisible(false);
    this.manifest = manifest;
    let btn_manifest_exit = manifest.buttons.manifest_exit;
    let btn_manifest_text = manifest.buttons.manifest_text;
    
    // start text
    let btn_tle = new Text(this, 0, 0, DIALOGS.btn_tle);
    let btn_str = new Text(this, 0, 0, DIALOGS.btn_str);
    let btn_lod = new Text(this, 0, 0, DIALOGS.btn_lod);
    let btn_shw = new Text(this, 0, 0, DIALOGS.btn_shw);
    let btn_mnf = new Text(this, 0, 0, DIALOGS.btn_mnf);
    let btn_opt = new Text(this, 0, 0, DIALOGS.btn_opt);
    let btn_opt0 = new Text(this, 0, 0, DIALOGS.btn_opt0);
    let btn_opt1 = new Text(this, 0, 0, DIALOGS.btn_opt1);
    let btn_opt2 = new Text(this, 0, 0, DIALOGS.btn_opt2);

    btn_tle.set_text(true);
    btn_str.set_text(true);
    btn_lod.set_text(true);
    btn_shw.set_text(true);
    btn_mnf.set_text(true);
    btn_opt.set_text(true);
    btn_opt0.set_text(true);
    btn_opt1.set_text(true);
    btn_opt2.set_text(true);

    //bind buttons
    this.menu = {
      main: [btn_str, btn_lod, btn_shw, btn_mnf, btn_opt],
      options: [btn_opt0, btn_opt1, btn_opt2],
      gallery: [btn_gallery_exit, btn_gallery_text],
      manifest: [btn_manifest_exit, btn_manifest_text]
    };

    this.gallery = gallery;

    this.opt_lang_i = 0;
    window.language = window.languages[this.opt_lang_i];

    btn_tle.resize_text(COORDS.btn_tle.x, COORDS.btn_tle.y, COORDS.btn_tle.width, COORDS.btn_tle.height);
    btn_str.resize_text(COORDS.btn_str.x, COORDS.btn_str.y, COORDS.btn_str.width, COORDS.btn_str.height);
    btn_lod.resize_text(COORDS.btn_lod.x, COORDS.btn_lod.y, COORDS.btn_lod.width, COORDS.btn_lod.height);
    btn_shw.resize_text(COORDS.btn_shw.x, COORDS.btn_shw.y, COORDS.btn_shw.width, COORDS.btn_shw.height);
    btn_mnf.resize_text(COORDS.btn_mnf.x, COORDS.btn_mnf.y, COORDS.btn_mnf.width, COORDS.btn_mnf.height);
    btn_opt.resize_text(COORDS.btn_opt.x, COORDS.btn_opt.y, COORDS.btn_opt.width, COORDS.btn_opt.height);
    btn_opt0.resize_text(COORDS.btn_opt0.x, COORDS.btn_opt0.y, COORDS.btn_opt0.width, COORDS.btn_opt0.height);
    btn_opt1.resize_text(COORDS.btn_opt1.x, COORDS.btn_opt1.y, COORDS.btn_opt1.width, COORDS.btn_opt1.height);
    btn_opt2.resize_text(COORDS.btn_opt2.x, COORDS.btn_opt2.y, COORDS.btn_opt2.width, COORDS.btn_opt2.height);

    btn_tle.setOrigin(0, 0);
    btn_str.setOrigin(0, 0);
    btn_lod.setOrigin(0, 0);
    btn_shw.setOrigin(0, 0);
    btn_mnf.setOrigin(0, 0);
    btn_opt.setOrigin(0, 0);

    btn_tle.x = COORDS.btn_tle.x;
    btn_str.x = COORDS.btn_str.x;
    btn_lod.x = COORDS.btn_lod.x;
    btn_shw.x = COORDS.btn_shw.x
    btn_mnf.x = COORDS.btn_mnf.x
    btn_opt.x = COORDS.btn_opt.x
    btn_opt0.x = COORDS.btn_opt0.x
    btn_opt1.x = COORDS.btn_opt1.x
    btn_opt2.x = COORDS.btn_opt2.x

    btn_tle.y = COORDS.btn_tle.y;
    btn_str.y = COORDS.btn_str.y;
    btn_lod.y = COORDS.btn_lod.y;
    btn_shw.y = COORDS.btn_shw.y
    btn_mnf.y = COORDS.btn_mnf.y
    btn_opt.y = COORDS.btn_opt.y
    btn_opt0.y = COORDS.btn_opt0.y
    btn_opt1.y = COORDS.btn_opt1.y
    btn_opt2.y = COORDS.btn_opt2.y

    btn_tle.name = "btn_tle";
    btn_str.name = "btn_str";
    btn_lod.name = "btn_lod";
    btn_shw.name = "btn_shw";
    btn_mnf.name = "btn_mnf";
    btn_opt.name = "btn_opt";
    btn_opt0.name = "btn_opt0";
    btn_opt1.name = "btn_opt1";
    btn_opt2.name = "btn_opt2";
    btn_gallery_exit.name = "btn_opt2";
    btn_gallery_text.name = "btn_shw";
    btn_manifest_exit.name = "btn_opt2";
    btn_manifest_text.name = "btn_mnf";

    // callbacks
    let start_txt_callback = function () {
      let future_scn = ['gm_bar', 'gm_harem', 'gm_drug', 'title'];
      this.scene.start('load', { nxt_scn:'gm_bar', future_scn: future_scn});
    };

    let load_txt_callback = function () {
      //this.scene.start('load', { nxt_scn: 'mn_room' });
    };

    let in_manifest_callback = function () {
      this.manifest.BoxSetVisible(true);
      hideText(this.menu.main, false);
    };

    let out_manifest_callback = function () {
      this.manifest.BoxSetVisible(false);
      hideText(this.menu.main, true);
    };

    let in_gallery_callback = function () {
      this.gallery.setVisible(true);
      hideText(this.menu.main, false);
    };

    let out_gallery_callback = function () {
      this.gallery.setVisible(false);
      hideText(this.menu.main, true);
    };

    let in_option_callback = function () {
      hideText(this.menu.main, false);
      hideText(this.menu.options, true);
    };

    let out_option_callback = function () {
      hideText(this.menu.main, true);
      hideText(this.menu.options, false);
    };

    let opt_change_language = function ()
    {
      this.opt_lang_i++;
      (this.opt_lang_i >= window.languages.length)? this.opt_lang_i = 0: this.opt_lang_i = this.opt_lang_i;
      changeLanguage(window.languages[this.opt_lang_i], this.menu, this);
    };

    hideText(this.menu.options, false);

    // set effects
    btn_str.set_effect(start_txt_callback, this);
    btn_lod.set_effect(load_txt_callback, this);
    btn_shw.set_effect(in_gallery_callback, this);
    btn_mnf.set_effect(in_manifest_callback, this);
    btn_opt.set_effect(in_option_callback, this);
    btn_opt0.set_effect(opt_change_language, this);
    btn_opt1.set_effect(opt_change_language, this);
    btn_opt2.set_effect(out_option_callback, this);
    btn_gallery_exit.set_effect(out_gallery_callback, this);
    btn_manifest_exit.set_effect(out_manifest_callback, this);

    // debug grid
    if (window.debugMode) {
      this.grid = new Grid(this);
    }
  }
}
