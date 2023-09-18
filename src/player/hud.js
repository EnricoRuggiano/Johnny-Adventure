import Phaser from 'phaser';
import Button from '../objects/button.js';
import gameConfig from '../utils/game_config.js';
import load_coords from '../utils/load_coords.js';
import load_dialog from '../utils/load_dialog.js';
import { resize, constrainWidth, constrainHeight, constrain } from '../utils/resize.js';

export default class Hud {
  constructor(scene, player) {
    // get hud config
    let HUD = coords(scene);
    let BACKGROUND  = HUD.BACKGROUND;
    let CELLS_LIST  = HUD.CELLS_LIST;
    let CELL        = HUD.CELL;
    let ARROW_RIGHT = HUD.ARROW_RIGHT;
    let ARROW_LEFT  = HUD.ARROW_LEFT;
    let BUTTON      = HUD.BUTTON;

    // get num of cells
    let numCells = checkNumBox(HUD);
    let padding = (CELLS_LIST.width - CELL.offsetX - numCells * (CELL.width + CELL.offsetX)) / 2;
    window.gameLog.debug(`HUD - padding: ${padding}`);

    // correct the cell lists with the remaining space
    CELLS_LIST.x = CELLS_LIST.x; //+ padding;
    CELLS_LIST.width = CELLS_LIST.width - 2 * padding;
    
    // draw the hud rectangle boxes
    let background = scene.add.rectangle(
      BACKGROUND.x,
      BACKGROUND.y,
      BACKGROUND.width,
      BACKGROUND.height,
      BACKGROUND.fillStyle.color,
      BACKGROUND.fillStyle.alpha);
    background.setStrokeStyle(
      BACKGROUND.lineStyle.lineWidth,
      BACKGROUND.lineStyle.color);
    background.setScrollFactor(0, 0);
    background.setOrigin(0, 0);

    let cellLists = scene.add.rectangle(
      CELLS_LIST.x,
      CELLS_LIST.y,
      CELLS_LIST.width,
      CELLS_LIST.height,
      CELLS_LIST.fillStyle.color,
      CELLS_LIST.fillStyle.alpha);
    cellLists.setStrokeStyle(
      CELLS_LIST.lineStyle.lineWidth,
      CELLS_LIST.lineStyle.color);
    cellLists.setScrollFactor(0, 0);
    cellLists.setOrigin(0, 0);

    // set depth of hud
    background.depth = 10;
    cellLists.depth  = 10;

    // tweens
    this.tweens_up   = [];
    this.tweens_down = [];

    // add cells
    let cells = [];
    for (let i = 0; i < numCells; i++)
    {
      let cell = scene.add.rectangle(
        CELL.x,
        CELL.y,
        CELL.width,
        CELL.height,
        CELL.fillStyle.color,
        CELL.fillStyle.alpha);
      cell.setStrokeStyle(
        CELL.lineStyle.lineWidth,
        CELL.lineStyle.color);
      cell.setScrollFactor(0, 0);
      cell.setOrigin(0, 0);
      cell.depth = 10;

      // update x coords
      CELL.x = CELL.x + CELL.width + CELL.offsetX;
      cells.push(cell);
    }

    // how many cells are busy
    this.background = background;
    this.cellLists  = cellLists;
    this.cells      = cells;
    this.objects    = [];
    this.page       = 0;
    this.visible    = true;
    
    this.addTwin(scene, this.background);
    window.gameLog.debug(`HUD - Tween added for background`);
    this.addTwin(scene, this.cellLists);
    window.gameLog.debug(`HUD - Tween added for cellLists`);

    // add items
    let inventory = player.inventory;
    for (let elem of inventory) 
    {
      this.addItem(scene, elem);

    }
    for (let elem of this.cells)
    {
      this.addTwin(scene, elem);
    }

    // add arrows
    let arrowLeft = scene.add.image(ARROW_LEFT.x, ARROW_LEFT.y, 'arrow_left');
    arrowLeft.setOrigin(0, 0);
    arrowLeft.setScrollFactor(0, 0);
    arrowLeft.setInteractive();
    arrowLeft.depth = 10;//5;
    constrain(arrowLeft, ARROW_LEFT);

    let arrowRight = scene.add.image(ARROW_RIGHT.x, ARROW_RIGHT.y, 'arrow_right');
    arrowRight.setOrigin(0, 0);
    arrowRight.setScrollFactor(0, 0);
    arrowRight.setInteractive();
    arrowRight.depth = 10;//5;
    constrain(arrowRight, ARROW_RIGHT);
    
    this.arrows = { arrowLeft: arrowLeft, arrowRight: arrowRight };
    this.addTwin(scene, arrowLeft);
    this.addTwin(scene, arrowRight);

    // button
    //let json_dialog = scene.cache.json.get('dialog');
    //let DIALOGS = load_dialog(json_dialog, "hud", window.language);
    
    //let button = scene.add.image(0.8*1280, 0.8*720, 'folders');
    let button = scene.add.image(BUTTON.x, BUTTON.y, 'folders');
    button.setOrigin(0, 0);
    button.setScrollFactor(0, 0);
    button.setInteractive();
    button.depth = 10;//5;
    //constrain(button, BUTTON);
    // let button = new Button(scene, BUTTON.x, BUTTON.y, BUTTON.stroke,
    //   BUTTON.width, BUTTON.height, DIALOGS.button);// this.setVisible);
    // button.graphics.depth = 10;//5;
    // button.effects.depth = 10;//5;
    // button.text.depth = 10;//5;
    // button.graphics.setScrollFactor(0, 0);
    // button.effects.setScrollFactor(0, 0);
    // button.text.setScrollFactor(0, 0);
    this.button = button;
    
    // Setup Tweens
    


    // this.h_tween_up = scene.tweens.add({
    //   targets: [arrowLeft, arrowRight, background, this.cells[0], this.objects[0] , this.cellLists],
    //   y: 0.8 * 720,
    //   ease: 'Power1',
    //   duration: 500,
    //   });
    
    // this.h_tween_down = scene.tweens.add({
    //   targets: [arrowLeft, arrowRight, background, cells, this.objects ],
    //   y: 1.0 * 720,
    //   ease: 'Power1',
    //   duration: 500,
    // });

    // this.h_tween_up.pause();
    // this.h_tween_down.pause();
   
  }


  addTwin(scene, elem) 
  {
    // get game coords
    let GAME_WIDTH, GAME_HEIGHT;
    [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

    // delta
    let delta_y = GAME_HEIGHT * 0.2;
    
    // apply twin spawn up
    let tween_up = scene.tweens.add({
      targets: elem,
      y: elem.y - delta_y,
      ease: 'Power1',
      duration: 500
    });
    
    // apply twin spawn up
    let tween_down = scene.tweens.add({
      targets: elem,
      y: elem.y,
      ease: 'Power1',
      duration: 500
    });

    // pause them
    tween_down.pause();
    tween_up.pause();

    // bind them
    this.tweens_up.push(tween_up);
    this.tweens_down.push(tween_down);
    
  }

  addItem(scene, elem) {
    // window of items ...
    let nCellsBusy = this.objects.length;
    let nCells = this.cells.length;
    let index = nCellsBusy % nCells;

    // refresh if overflow
    if (index === 0 && nCellsBusy > 0) {
      // clear hud objects here ...
      clear(this);
      this.page++;
    }

    let dstCell = this.cells[index];
    let HUD = coords(scene);

    let OBJECT =
    {
      x: dstCell.width / 2 + dstCell.x,
      y: dstCell.height / 2 + dstCell.y,
      width: dstCell.width - HUD.CELL.offsetX * 2,
      height: dstCell.height - HUD.CELL.offsetY * 2
    };

    let object = scene.add.image(OBJECT.x, OBJECT.y, elem);

    // set depth high
    object.depth = 10;// 5;

    // here put some events on the objects ...
    constrain(object, OBJECT);
    object.setScrollFactor(0, 0);
    object.setInteractive();
    object.setName(elem);
    scene.input.setDraggable(object, true);

    // update hud state variables
    this.objects.push(object);
    this.addTwin(scene, object);
    window.gameLog.debug(`HUD - Tween added for ${elem}`);

  }

  removeItem() {

  }

  shiftLeft() {
    // clear
    clear(this);

    // get current last item
    let nCellsBusy = this.objects.length;
    let nCells = this.cells.length;

    // current view cells states
    let leftPage = this.page - 1;
    let firstViewItem = leftPage * nCells;
    let lastViewItem = firstViewItem + nCells;

    // first page render
    if (leftPage < 0) {
      firstViewItem = 0;
      if (this.objects.length < nCells) {
        lastViewItem = this.objects.length;
      }
      else {
        lastViewItem = nCells;
      }
      this.page = 0;
    }
    else {
      this.page--;
    }

    for (let i = firstViewItem; i < lastViewItem; i++) {
      this.objects[i].setVisible(true);
    }

    window.gameLog.debug(`arrows: shift to page ${this.page}`);
    window.gameLog.debug(`arrows right - firstElement ${firstViewItem}`);
    window.gameLog.debug(`arrows right - lastElement ${lastViewItem}`);
    window.gameLog.debug(`arrows right - objects ${this.objects[firstViewItem]}`);

    /*
        let index = nCellsBusy % nCells;
        let viewCellsBusy = nCells - index;
    
        let leftViewLastElement = this.objects.length - viewCellsBusy;
        let firstViewLastElement = leftViewLastElement - nCells;
    
        if(leftViewLastElement < 0 || firstViewLastElement < 0)
        {
          leftViewLastElement = nCells;
          firstViewLastElement = 0;
          this.page = 0;
        }
        else
        {
          this.page--;
        }
    
        for (let i = firstViewLastElement; i < leftViewLastElement; i++)
        {
          this.objects[i].setVisible(true);
        }
        window.gameLog.debug(`arrows: shift to page ${this.page}`);
    */

  }

  shiftRight() {

    // clear
    clear(this);

    // get current last item
    let nCellsBusy = this.objects.length;
    let nCells = this.cells.length;

    // current view cells states
    let rightPage = this.page + 1;
    let firstViewItem = rightPage * nCells;
    let lastViewItem = firstViewItem + nCells;

    if (lastViewItem > this.objects.length) {
      lastViewItem = firstViewItem + this.objects.length % nCells;
    }

    // last page render
    if (firstViewItem > this.objects.length - 1) {
      firstViewItem = this.page * nCells;
      if (this.objects.length < firstViewItem + nCells) {
        lastViewItem = firstViewItem + this.objects.length % nCells;
      }
      else {
        lastViewItem = firstViewItem + nCells;
      }
      this.page = this.page;
    }
    else {
      this.page++;
    }

    window.gameLog.debug(`arrows: shift to page ${this.page}`);
    window.gameLog.debug(`arrows right - firstElement ${firstViewItem}`);
    window.gameLog.debug(`arrows right - lastElement ${lastViewItem}`);
    window.gameLog.debug(`arrows right - objects ${this.objects[firstViewItem]}`);

    for (let i = firstViewItem; i < lastViewItem; i++) {
      this.objects[i].setVisible(true);
    }

    /*
        // clear
        clear(this);
    
        // get current last item
        let nCellsBusy = this.objects.length;
        let nCells = this.cells.length;
    
        // current view cells states
        let myPage = this.page + 1;
        let firstViewLastElement = myPage * nCells;
        let leftViewLastElement = this.objects.length - firstViewLastElement + myPage * nCells ;
    
        window.gameLog.debug(`arrows right - firstElement ${firstViewLastElement}`);
        window.gameLog.debug(`arrows right - lastElement ${leftViewLastElement}`);
        window.gameLog.debug(`arrows right - objects ${this.objects[firstViewLastElement]}`);
    
        if(firstViewLastElement > this.objects.length)
        {
          leftViewLastElement = this.objects.length - 1;
          firstViewLastElement = 0;
          this.page = 1;
        }
        else
        {
          this.page++;
        }
    
        for (let i = firstViewLastElement; i < leftViewLastElement; i++)
        {
          this.objects[i].setVisible(true);
        }
        window.gameLog.debug(`arrows: shift to page ${this.page}`);
        */
  }

  setVisible(bool, hide_button) {

    // scene cntx
    let background = this.background;
    let cellLists = this.cellLists;
    let cells = this.cells;
    let objects = this.objects;
    let arrows = this.arrows; 
    let button = this.button;

    if(hide_button)
    {
      button.setVisible(bool);
    }

    if (background.visible ||
      cellLists.visible) {
      background.setVisible(false);
      cellLists.setVisible(false);
      for (let cell of cells) {
        cell.setVisible(false);
      }
      for (let object of objects) {
        object.setVisible(false);
      }
      arrows.arrowLeft.setVisible(false);
      arrows.arrowRight.setVisible(false);
    }
    else {
      background.setVisible(true);
      cellLists.setVisible(true);
      for (let cell of cells) {
        cell.setVisible(true);
      }
      for (let object of objects) {
        object.setVisible(true);
      }
      arrows.arrowLeft.setVisible(true);
      arrows.arrowRight.setVisible(true);
    }
  }
}

// put here the coords of the stuff
function coords(scene) {
  // coords
  let json_coords = scene.cache.json.get('coords');
  let COORDS = load_coords(json_coords, "hud");
  //console.log(COORDS);

  let GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  let gridWidth = GAME_WIDTH * 0.1;
  let gridHeight = GAME_HEIGHT * 0.1;
  //let backgroundX = 0;
  //let backgroundY = GAME_HEIGHT * 0.7;
  //let backgroundWidth = GAME_WIDTH;
  //let backgroundHeight = GAME_HEIGHT * 0.25;
  let backgroundX = COORDS.hud.x;
  let backgroundY = COORDS.hud.y;
  let backgroundWidth = COORDS.hud.width;
  let backgroundHeight = COORDS.hud.height;
  let backgroundLineWidth = gridWidth * 0.05;

  let arrowsOffsetX = gridWidth * 0.2;
  let arrowsOffsetY = gridHeight * 0.2;
  let arrowsX = backgroundX + arrowsOffsetX;
  let arrowLeftY = backgroundY + arrowsOffsetY;
  let arrowsWidth = gridWidth * 1.3;
  let arrowsHeight = (backgroundHeight - 2 * arrowsOffsetY) / 2;
  let arrowRightY = arrowLeftY + arrowsHeight;

  let cellsListOffsetX = gridWidth * 0.2;
  let cellsListOffsetY = gridHeight * 0.2;
  //let cellsListX = backgroundX + cellsListOffsetX;
  let cellsListX = backgroundX + cellsListOffsetX + arrowsWidth + arrowsOffsetX;
  let cellsListY = backgroundY + cellsListOffsetY;
  let cellListWidth = backgroundWidth - 2 * cellsListOffsetX - arrowsWidth - 2 * arrowsOffsetX;
  let cellListHeight = backgroundHeight - 2 * cellsListOffsetY;
  let cellListLineWidth = gridWidth * 0.01;
  let cellOffsetX = gridWidth * 0.1;
  let cellOffsetY = gridHeight * 0.1;
  let cellX = cellsListX + cellOffsetX;
  let cellY = cellsListY + cellOffsetY;
  let cellWidth = gridWidth * 1.5;
  let cellHeight = cellListHeight - 2 * cellOffsetY;

  let buttonWidth = COORDS.button.width;
  let buttonHeight = COORDS.button.height;
  let buttonX = COORDS.button.x;
  let buttonY = COORDS.button.y;//cellsListY + (cellListHeight - buttonHeight)/2;
  
  let buttonStroke = COORDS.button.stroke;

  let HUD =
  {
    BACKGROUND:
    {
      x: backgroundX,
      y: backgroundY,
      height: backgroundHeight,
      width: backgroundWidth,
      fillStyle: { color: 0x241C1C, alpha: 0.57 },
      lineStyle: { lineWidth: backgroundLineWidth, color: 0x241f1c }
    },
    CELLS_LIST:
    {
      x: cellsListX,
      y: cellsListY,
      width: cellListWidth,
      height: cellListHeight,
      fillStyle: { color: 0x917c6f, alpha: 0.39 },
      lineStyle: { lineWidth: cellListLineWidth, color: 0x241f1c }
    },
    CELL:
    {
      x: cellX,
      y: cellY,
      width: cellWidth,
      height: cellHeight,
      offsetX: cellOffsetX,
      offsetY: cellOffsetY,
      fillStyle: { color: 0x000000, alpha: 0.34 },
      lineStyle: { color: 0x000000 }
    },
    ARROW_LEFT:
    {
      x: arrowsX,
      y: arrowLeftY,
      width: arrowsWidth,
      height: arrowsHeight
    },
    ARROW_RIGHT:
    {
      x: arrowsX,
      y: arrowRightY,
      width: arrowsWidth,
      height: arrowsHeight
    },
    BUTTON:
    {
      x: buttonX,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      stroke: buttonStroke,
    }
  }
  return HUD;
}

// calculate the number of the box here
function checkNumBox(hud) {
  let cellLists = hud.CELLS_LIST;
  let cell = hud.CELL;

  // check how many cells are contained by the cell list
  let cellUnit = cell.width + cell.offsetX;
  let numCells = Math.floor(cellLists.width / cellUnit);
  window.gameLog.debug(`HUD - num of cells: ${numCells}
    cellList ${cellLists.width} - cell ${cellUnit}`);
  return numCells;
}

function clear(hud) {
  for (let object of hud.objects) {
    object.setVisible(false);
  }
}
