function gameConfig()
{
  let os = window.game.device.os;
  let config = window.game.config;

  // if mobile go with different resolution
  let isMobile = os.webApp || os.cordova || os.android || os.windowsPhone  ||
    os.iPad || os.iOS || os.iPhone;

  if(isMobile)
  {
    // here we can support some resolution
    //window.gameLog.debug(`Mobile detected: ${isMobile}`);
    return [730, 360];
  }

  // if desktop (laptop with broswer) go with 800x600
  if(os.desktop)
  {
    //window.gameLog.debug(`Broswer detected: ${os.desktop}`);
    return [config.width, config.height];
  }

  // default
  else
  {
    return [200, 100];
  }
}

function isMobile()
{
  let os = window.game.device.os;
  return os.webApp || os.cordova || os.android || os.windowsPhone  ||
  os.iPad || os.iOS || os.iPhone;
}

export { gameConfig as default, isMobile};
