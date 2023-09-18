import gameConfig, { _, isMobile } from './game_config.js';

function load_coords(json_file, scene_name) {
  let GAME_WIDTH, GAME_HEIGHT;
  [GAME_WIDTH, GAME_HEIGHT] = gameConfig();
  let my_json = Object();

  // parsing
  let js_scene = json_file[scene_name];

  if (!js_scene) {
    window.gameLog.debug(`load coords from json - record ${scene_name} not found`);
    return my_json;
  }
  if (Object.keys(js_scene).length === 0) {
    window.gameLog.debug(`load assets from json - empty asset`);
    return my_json;
  }

  // iterate over the records
  for (let [key, value] of Object.entries(js_scene)) {
    let platform = isMobile() ? "MOBILE" : "WEB";
    let coords_obj = value[platform];
    my_json[key] = {};

    // assign
    if ("x" in coords_obj)
      my_json[key]["x"] = coords_obj["x"] * GAME_WIDTH;
    if ("y" in coords_obj)
      my_json[key]["y"] = coords_obj["y"] * GAME_HEIGHT;
    if ("width" in coords_obj)
      my_json[key]["width"] = coords_obj["width"] * GAME_WIDTH;
    if ("height" in coords_obj)
      my_json[key]["height"] = coords_obj["height"] * GAME_HEIGHT;
    if ("grid_w" in coords_obj)
      my_json[key]["grid_w"] = coords_obj["grid_w"] * GAME_WIDTH;
    if ("grid_h" in coords_obj)
      my_json[key]["grid_h"] = coords_obj["grid_h"] * GAME_HEIGHT;
    if ("rsz" in coords_obj)
      my_json[key]["resize"] = coords_obj["rsz"];
    if ("stk" in coords_obj)
      my_json[key]["stroke"] = coords_obj["stk"] * coords_obj["width"] * GAME_WIDTH;
    if ("off_y" in coords_obj)
      my_json[key]["offset_y"] = coords_obj["off_y"] * coords_obj["height"] * GAME_HEIGHT;
    if ("off_x" in coords_obj)
      my_json[key]["offset_x"] = coords_obj["off_x"] * coords_obj["width"] * GAME_WIDTH;

    if ("z" in coords_obj)
      my_json[key]["z"] = coords_obj["z"];
    if ("frt" in coords_obj)
      my_json[key]["frameRate"] = coords_obj["frt"];
    if ("fs" in coords_obj)
      my_json[key]["nFrames"] = coords_obj["fs"];
  }

  return my_json;
}


export default load_coords;