function load_assets(json, json_scene, json_group, scene){

  window.gameLog.debug(`load assets from json - ${json_scene}[${json_group}]`);
  // check if json[scene][group] is not empty
  var value = json[json_scene][json_group];
  if(!value)
  {
    window.gameLog.debug(`load assets from json - record not found`);
  }

  else if(Object.keys(value).length === 0)
  {
    window.gameLog.debug(`load assets from json - empty asset`);
  }
  else
  {
    // load filetype - assets
    Object.keys(value).forEach(function (key)
    {
      var assets = value[key]
      if(json_group === 'spritesheet')
      {
        // assets is an object (e.g load all frames)
        window.gameLog.debug(`${assets} = ${value}[${key}]`);

        let url = assets["path"]
        let frameWidth =  assets["frameWidth"]
        let frameHeight =  assets["frameHeight"]
        scene.load[json_group](key, url, {frameWidth: frameWidth, frameHeight: frameHeight});
        window.gameLog.debug(`load assets from json - loaded ${json_group} :
           (${key}, ${url},{ ${frameWidth}, ${frameHeight} }`);
      }

      else if(typeof assets === 'object')
      {
        // assets is an object (e.g load all frames)
        Object.keys(assets).forEach(function (key)
        {
          let url = assets[key]
          scene.load[json_group](key, url);
          window.gameLog.debug(`load assets from json - loaded ${json_group} : (${key}, ${url}`);
        }, scene, assets);
      }
      else
      {
        // assets is a single line
        let url = value[key];
        scene.load[json_group](key, url);
        window.gameLog.debug(`load assets from json - loaded ${json_group} : (${key}, ${url}`);
      }
    }, scene, value);
  }
}

function load_fonts() {
    let WebFont = require('webfontloader');
    WebFont.load({
        google: {
            families: ['Lemon']
        }
    });
}

export default {load_assets, load_fonts};
