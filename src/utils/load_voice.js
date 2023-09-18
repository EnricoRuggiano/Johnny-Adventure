function load_voice(json_file, scene_name, language) {
  let my_json = Object();

  // parsing
  let js_scene = json_file[scene_name];

  if (!js_scene) 
  {
    window.gameLog.debug(`load voice from json - record ${scene_name} not found`);
    return my_json;
  }
  if (Object.keys(js_scene).length === 0) {
    window.gameLog.debug(`load voice from json - empty asset`);
    return my_json;
  }

  if(!language)
  {
    window.gameLog.debug(`load voice from json - language not found, selecting default ENGLISH`);
    language = "ENG";
  }

  // iterate over the records
  for (let [key, value] of Object.entries(js_scene)) {

    // json format: { key0: [], key1: [], ... }
    my_json[key] = value[language];

  }

  return my_json;
}


export default load_voice;