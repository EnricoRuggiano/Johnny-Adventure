
import gameConfig from './game_config.js';

function resize(image, factor, scale_factor) {
  var GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();

  let window_ratio = GAME_WIDTH / GAME_HEIGHT;
  let image_ratio = image.width / image.height;

  if (window_ratio < image_ratio) 
  {
    image.displayWidth = GAME_WIDTH * factor;
    image.displayHeight = GAME_WIDTH / image_ratio * factor;
    image.x = GAME_WIDTH * 0.5;
    image.y = GAME_HEIGHT * 0.5 * factor;
    image.scaleX = scale_factor;
    image.scaleY = scale_factor;
  }
  else {
    image.displayWidth = GAME_HEIGHT * image_ratio * factor;
    image.displayHeight = GAME_HEIGHT * factor;
    image.x = GAME_WIDTH * 0.5;
    image.y = GAME_HEIGHT * 0.5 * factor;
    image.scaleX = scale_factor;
    image.scaleY = scale_factor;
  }
}

function constrainHeight(image, height) {
  let image_ratio = image.width / image.height;
  image.diplayHeight = height;
  image.displayWidth = image.diplayHeight * image_ratio;

  let new_ratio = image.displayWidth / image.displayHeight;
  window.gameLog.debug(`constrainHeight - ratio - old: ${image_ratio} new: ${new_ratio}`);
  window.gameLog.debug(`constrainHeight - width - old: ${image.width} new: ${image.displayWidth}`);
  window.gameLog.debug(`constrainHeight - height - old: ${image.height} new: ${image.displayHeight}`);

}

function constrainWidth(image, width) {
  let image_ratio = image.width / image.height;

  image.displayWidth = width;
  image.displayHeight = width / image_ratio;
}

function constrain(image, object) {
  let object_ratio = object.width / object.height;
  let image_ratio = image.width / image.height;

  if (object_ratio < image_ratio) {
    image.displayWidth = object.width;
    image.displayHeight = object.width / image_ratio;
  }
  else {
    image.displayWidth = object.height * image_ratio;
    image.displayHeight = object.height;
  }
}

export { resize as default, constrainWidth, constrainHeight, constrain };
