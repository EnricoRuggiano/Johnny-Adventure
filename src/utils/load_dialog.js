
function load_dialog(json_file, scene_name, language) {
  let my_json = Object();

  // parsing
  let js_scene = json_file[scene_name];

  if (!js_scene) {
    window.gameLog.debug(`load dialog from json - record ${scene_name} not found`);
    return my_json;
  }
  if (Object.keys(js_scene).length === 0) {
    window.gameLog.debug(`load dialog from json - empty asset`);
    return my_json;
  }

  if(!language)
  {
    window.gameLog.debug(`load dialog from json - language not found, selecting default ENGLISH`);
    language = "ENG";
  }

  // iterate over the records
  for (let [key, value] of Object.entries(js_scene)) {

    my_json[key] = value[language];
  }

  return my_json;
}


export default load_dialog;