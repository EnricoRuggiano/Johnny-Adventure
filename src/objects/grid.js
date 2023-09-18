import Phaser from 'phaser';
import gameConfig from '../utils/game_config.js';

// Grid for composition debugging

function coords(background) {
  let GAME_WIDTH, GAME_HEIGHT, GRID;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  if (background) 
  {
    GRID =
    {
      negative_x: GAME_WIDTH/2 - background.displayWidth/2 ,
      x: 0,
      y: 0,
      width: background.displayWidth,
      height: GAME_HEIGHT,
      cellWidth: GAME_WIDTH * 0.1,
      cellHeight: GAME_HEIGHT * 0.1,
      fillColor: 0x000000,
      fillAlpha: 0,
      outlineFillColor: 0x0020C2,
      outlineFillAlpha: 1
    };
  }
  else {
    GRID =
    {
      x: 0,
      y: 0,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      cellWidth: GAME_WIDTH * 0.1,
      cellHeight: GAME_HEIGHT * 0.1,
      fillColor: 0x000000,
      fillAlpha: 0,
      outlineFillColor: 0x0020C2,
      outlineFillAlpha: 1
    };

  }

  return GRID;
}

export default class Grid extends Phaser.GameObjects.Grid {
  constructor(scene, background) {
    let GRID = coords(background);

    super(scene,
      GRID.negative_x,
      GRID.y,
      GRID.width,
      GRID.height,
      GRID.cellWidth,
      GRID.cellHeight,
      GRID.fillColor,
      GRID.fillAlpha,
      GRID.outlineFillColor,
      GRID.outlineFillAlpha);

    // fundamental. The center of the object now is the left top corner
    this.setOrigin(0);

    window.gameLog.debug(`Grid - window size:
        ${window.innerWidth} x ${window.innerHeight}`);

    window.gameLog.debug(`Grid - grid size:
        ${this.width} x ${this.height}`);

    scene.add.displayList.add(this);

    // add debug resolution
    scene.add.text(0, 0, `Grid: ${this.width} x ${this.height}`,
      {
        //fontFamily: "Lemon",
        fontSize: GRID.cellHeight * 0.25,
        color: '#0020C2'
      });

    scene.add.text(0, GRID.cellHeight * 0.25, `Window: ${window.innerWidth} x ${window.innerHeight}`,
      {
        //fontFamily: "Lemon",
        fontSize: GRID.cellHeight * 0.25,
        color: '#0020C2'
      });


    // add coords layout
    this.cells = [];
    let x_cell = 1;
    let y_cell = 1;

    for (var y = GRID.y; y < GRID.height;) {
      for (var x = GRID.x; x < GRID.width;) {
        let text_offset_x = GRID.cellWidth * 0.1;
        let text_offset_y = GRID.cellHeight * 0.1;

        let text_x = x + text_offset_x;
        let text_y = y + GRID.cellHeight * 0.75;

        // add text chords
        let cell = scene.add.text(
          text_x,
          text_y,
          `(${Math.round(x_cell * 0.1 * 100) / 100}, ${Math.round(y_cell * 0.1 * 100) / 100})`,
          {
            //fontFamily: "Lemon",
            fontSize: GRID.cellHeight * 0.20,
            color: '#0020C2'
          });
        this.cells.push(cell);

        // go to next column
        x_cell++;
        x += GRID.cellWidth;
      }

      // go to next row
      y += GRID.cellHeight;
      x_cell = 1;
      y_cell++;
    }

    // negative
  if(GRID.negative_x)
  {
    this.cells = [];
    let x_cell = -1;
    let y_cell = 1;

    for (var y = GRID.y; y < GRID.height;) {
      for (var x = -GRID.cellWidth; x > GRID.negative_x;) {
        let text_offset_x = GRID.cellWidth * 0.1;
        let text_offset_y = GRID.cellHeight * 0.1;

        let text_x = x + text_offset_x;
        let text_y = y + GRID.cellHeight * 0.75;

        // add text chords
       // if(x_cell !== -1)
        
        //{
          let cell = scene.add.text(
          text_x,
          text_y,
          `(${Math.round(x_cell * 0.1 * 100) / 100}, ${Math.round(y_cell * 0.1 * 100) / 100})`,
          {
            //fontFamily: "Lemon",
            fontSize: GRID.cellHeight * 0.20,
            color: '#0020C2'
          });
        this.cells.push(cell);
        //}
        // go to next column
        x_cell--;
        x -= GRID.cellWidth;
      }

      // go to next row
      y += GRID.cellHeight;
      x_cell = -1;
      y_cell++;
    } 
  }

  }

}
