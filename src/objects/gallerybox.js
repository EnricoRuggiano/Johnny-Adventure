import Phaser from 'phaser';
import Button from './button.js';
import Text from './text.js';
import gameConfig from '../utils/game_config.js';
import load_coords from '../utils/load_coords.js';
import load_dialog from '../utils/load_dialog.js';
import { resize, constrainWidth, constrainHeight, constrain } from '../utils/resize.js';

export default class GalleryBox {
  constructor(scene) 
  {  
    
    // load json
    let json_dialog = scene.cache.json.get('dialog');
    let json_coords = scene.cache.json.get('coords');  
    let DIALOGS = load_dialog(json_dialog, "title", window.language);
    let COORDS = load_coords(json_coords, "gallery");
  
    let GALLERY = coords(scene);
    let BACKGROUND = GALLERY.BACKGROUND;
    let CELLS_LIST = GALLERY.CELLS_LIST;
    let CELL = GALLERY.CELL;
    let ARROW_RIGHT = GALLERY.ARROW_RIGHT;
    let ARROW_LEFT = GALLERY.ARROW_LEFT;
    let BUTTON = GALLERY.BUTTON;

    // get num of cells
    //let json_coords = scene.cache.json.get('coords');
    //let COORDS = load_coords(json_coords, "gallery");
  
    let numCells = checkNumBox(GALLERY);    
    let padding_X = (CELLS_LIST.width  - CELL.width - (numCells.x - 1) * (CELL.width + CELL.offsetX)) / 2;
    let padding_Y = (CELLS_LIST.height - CELL.height - (numCells.y - 1) * (CELL.height + CELL.offsetY)) / 2
    //window.gameLog.debug(`GalleryBox - padding: ${padding_X} x ${padding_Y}`);

    //CELLS_LIST.x = CELLS_LIST.x + padding_X;
    //CELLS_LIST.y = CELLS_LIST.y + padding_Y;
    //CELLS_LIST.width = CELLS_LIST.width - 2 * padding_X;
    //CELLS_LIST.height = CELLS_LIST.height - 2 * padding_Y;
    
    // correct the cell lists with the remaining space
    //CELLS_LIST.x = CELLS_LIST.x + padding_X;
    //CELLS_LIST.y = CELLS_LIST.y + padding_Y;
    //CELLS_LIST.width = CELLS_LIST.width - 2 * padding_X;
    //CELLS_LIST.height = CELLS_LIST.height - 2 * padding_Y;
    
  //  padding_X = (CELLS_LIST.width  - CELL.width - (numCells.x - 1) * (CELL.width + CELL.offsetX)) / 2;
  //  padding_Y = (CELLS_LIST.height - CELL.height - (numCells.y - 1) * (CELL.height + CELL.offsetY)) / 2
    CELL.x = CELLS_LIST.x + padding_X;
    CELL.y = CELLS_LIST.y + padding_Y;
    
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
    //background.setScrollFactor(0, 0);
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
    //cellLists.setScrollFactor(0, 0);
    cellLists.setOrigin(0, 0);

    // set depth of hud
    background.depth = 10;//5;
    cellLists.depth = 10;//5;

    // add cells
    //let offset_y = ((numCells.y - 1) * (CELL.height + CELL.offsetY)) / 2; 
    //CELL.y = CELL.y + offset_y;

    let cells = [];
    let originX = CELL.x;
    let originY = CELL.y;

    let x = 1, y = 1;
    for (; y <= numCells.y; y++)
    {
        for (; x <= numCells.x; x++) 
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
          //  cell.setScrollFactor(0, 0);
            cell.setOrigin(0, 0);
            cell.depth = 10;//5;
        
            // update x coords
            cells.push(cell);
            CELL.x = CELL.x + CELL.width + CELL.offsetX;
          }
          x = 1;
          CELL.x  = originX;
          CELL.y = CELL.y + CELL.height + CELL.offsetY;
    }
    
    // how many cells are busy
    this.background = background;
    this.cellLists = cellLists;
    this.cells = cells;
    this.objects = [];
    this.page = 0;
    this.visible = true;

    // add items
    let previews = [
        {image: "preview_bar",   scene: "gm_bar"},
        {image: "preview_harem", scene: "gm_harem"},
        // {image: "preview_room",  scene: "mn_room"},
        {image: "preview_drug",  scene: "gm_drug"}
      ];
    
    this.previews = previews;

    for (let elem of previews) 
     {
      this.addItem(scene, elem);
     }

    // add arrows
    let arrowLeft = scene.add.image(ARROW_LEFT.x, ARROW_LEFT.y, 'gallery_arrow_left');
    arrowLeft.setOrigin(0, 0.5);
    //arrowLeft.setScrollFactor(0, 0);
    arrowLeft.setInteractive();
    arrowLeft.depth = 10;//5;
    constrain(arrowLeft, ARROW_LEFT);

    let arrowRight = scene.add.image(ARROW_RIGHT.x, ARROW_RIGHT.y, 'gallery_arrow_right');
    arrowRight.setOrigin(0, 0.5);
    //arrowRight.setScrollFactor(0, 0);
    arrowRight.setInteractive();
    arrowRight.depth = 10;//5;
    constrain(arrowRight, ARROW_RIGHT);
    this.arrows = { arrowLeft: arrowLeft, arrowRight: arrowRight };

    // button
    /*let json_dialog = scene.cache.json.get('dialog');
    let DIALOGS = load_dialog(json_dialog, "hud", window.language);
    
    let button = new Button(scene, BUTTON.x, BUTTON.y, BUTTON.stroke,
      BUTTON.width, BUTTON.height, DIALOGS.button);// this.setVisible);
    button.graphics.depth = 10;//5;
    button.effects.depth = 10;//5;
    button.text.depth = 10;//5;
    button.graphics.setScrollFactor(0, 0);
    button.effects.setScrollFactor(0, 0);
    button.text.setScrollFactor(0, 0);
    this.button = button;
    */

    // text
    let gallery_text = new Text(scene, 0, 0, DIALOGS.btn_shw, 10);
    let gallery_exit = new Text(scene, 0, 0, DIALOGS.btn_opt2, 10);
    
    gallery_text.set_text(true);
    gallery_exit.set_text(true);
    gallery_text.resize_text(COORDS.gallery_text.x,COORDS.gallery_text.y, COORDS.gallery_text.width, COORDS.gallery_text.height);
    gallery_exit.resize_text(COORDS.gallery_exit.x,COORDS.gallery_exit.y, COORDS.gallery_exit.width, COORDS.gallery_exit.height);

    this.buttons = {gallery_text: gallery_text, gallery_exit: gallery_exit};
  
    this.arrows.arrowLeft.on('pointerdown', this.shiftLeft, this);
    this.arrows.arrowRight.on('pointerdown', this.shiftRight, this);
    
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
    let GALLERY = coords(scene);

    let OBJECT =
    {
      x: dstCell.width / 2 + dstCell.x,
      y: dstCell.height / 2 + dstCell.y,
      width: dstCell.width* 0.9,
      height: dstCell.height * 0.9
    };

    let object = scene.add.image(OBJECT.x, OBJECT.y, elem.image);
    
    // set depth high
    object.depth = 10;// 5;

    // here put some events on the objects ...
    constrain(object, OBJECT);
    //object.setScrollFactor(0, 0);
    object.setInteractive();
    object.setName(elem.scene);
    object.on("pointerdown", function() {
        let future_scn = ['gm_bar', 'gm_harem', 'gm_drug', 'mn_room', 'title'];
        scene.scene.start('load', { nxt_scn: elem.scene, future_scn:future_scn });
    });
    
    //scene.input.setDraggable(object, true);



    // update hud state variables
    this.objects.push(object);
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

  setVisible(bool) {

    // scene cntx
    let background = this.background;
    let cellLists = this.cellLists;
    let cells = this.cells;
    let objects = this.objects;
    let arrows = this.arrows; 
    let buttons = this.buttons;

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
      buttons.gallery_exit.setVisible(false);
      buttons.gallery_text.setVisible(false);
      
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
      buttons.gallery_exit.setVisible(true);
      buttons.gallery_text.setVisible(true);
      
    }
  }
}

// put here the coords of the stuff
function coords(scene) {
  // coords
  let json_coords = scene.cache.json.get('coords');
  let COORDS = load_coords(json_coords, "gallery");
  
  let GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  let backgroundX = COORDS.background.x;
  let backgroundY = COORDS.background.y;
  let backgroundWidth = COORDS.background.width;
  let backgroundHeight = COORDS.background.height;
  let backgroundLineWidth = COORDS.background.stroke;

  //let arrowsOffsetX = COORDS.arrows.offset_x;
  //let arrowsOffsetY = COORDS.arrows.offset_y;

  let cellsListOffsetX = COORDS.list.offset_x; //* 0.2;
  let cellsListOffsetY = COORDS.list.offset_y; // 0.2;
  //let cellsListX = backgroundX + cellsListOffsetX;
  let cellsListX = backgroundX + cellsListOffsetX; //+ arrowsWidth + arrowsOffsetX;
  let cellsListY = backgroundY + cellsListOffsetY;
  let cellListWidth = backgroundWidth - 2 * cellsListOffsetX;// - arrowsWidth - 2 * arrowsOffsetX;
  let cellListHeight = backgroundHeight - 2 * cellsListOffsetY;
  let cellListLineWidth = COORDS.list.stroke;
  let cellOffsetX = COORDS.cell.offset_x;
  let cellOffsetY = COORDS.cell.offset_y;
  let cellX = cellsListX + cellOffsetX;
  let cellY = cellsListY + cellOffsetY;
  let cellWidth = COORDS.cell.grid_w;
  let cellHeight = COORDS.cell.grid_h;

  let arrowsY = COORDS.arrows.y;
  let arrowsLeftX = cellsListX;
  let arrowsWidth = COORDS.arrows.width;
  let arrowsHeight = COORDS.arrows.height;
  let arrowsRightX = cellsListX + cellListWidth - arrowsWidth;


  let buttonWidth = COORDS.button.width;
  let buttonHeight = COORDS.button.height;
  let buttonX = COORDS.button.x;
  let buttonY = cellsListY + (cellListHeight - buttonHeight)/2;
  
  let buttonStroke = COORDS.button.stroke;

  let GALLERY =
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
      x: arrowsLeftX,
      y: arrowsY,
      width: arrowsWidth,
      height: arrowsHeight
    },
    ARROW_RIGHT:
    {
      x: arrowsRightX,
      y: arrowsY,
      width: arrowsWidth,
      height: arrowsHeight
    },
    GALLERY_TEXT:
    {
      x: COORDS.gallery_text.x,
      y: COORDS.gallery_text.y,
      width: COORDS.gallery_text.width,
      height: COORDS.gallery_text.height,
    },
    GALLERY_EXIT:
    {
      x: COORDS.gallery_exit.x,
      y: COORDS.gallery_exit.y,
      width: COORDS.gallery_exit.width,
      height: COORDS.gallery_exit.height,
    }
    /*BUTTON:
    {
      x: buttonX,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      stroke: buttonStroke,
    }*/
  }
  return GALLERY;
}

// calculate the number of the box here
function checkNumBox(gallery) {
  let cellLists = gallery.CELLS_LIST;
  let cell = gallery.CELL;

  // check how many cells are contained by the cell list
  let cellUnitWidth = cell.width + cell.offsetX;
  let numCellsPerRow = Math.floor(cellLists.width / cellUnitWidth);
  
  let cellUnitHeight = cell.height + cell.offsetY;
  let numCellsPerColumn = (Math.floor(cellLists.height / cellUnitHeight)) ;
  let numCells = {x: numCellsPerRow, y: numCellsPerColumn};

  window.gameLog.debug(`Gallery - num of cells: ${numCells.x} x ${numCells.y} 
    cellList ${cellLists.width} - cell ${cellUnitWidth}`);
  return numCells;
}

function clear(hud) {
  for (let object of hud.objects) {
    object.setVisible(false);
  }
}
