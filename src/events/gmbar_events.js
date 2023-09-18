import GmEvents        from "./template/gm_events";
import EventDispatcher from "./template/event_dispatcher"; 

export default class GmBarEvents extends GmEvents
{
  constructor(scene)
  {
    super(scene);

    // event speak Kora
    this.EventSpeakKora(scene);
    this.EventGoHarem(scene);
    this.EventGoDrug(scene);
  }

  // @Event - Speak with Kora
  EventSpeakKora(scene)
  {
    // dialog assets
    let kora_dialog      = scene.children.getByName("kora_dialog");
    let kora_dialog_back = scene.children.getByName("kora_dialog_back"); 

    // dead zone
    let dead_zone        = scene.children.getByName("dead_zone_0");
    
    // pack the assets
    let eventGameObjects = [kora_dialog, kora_dialog_back];

    // Custom Event Singleton
    let emitter = EventDispatcher.getInstance();

    // events receiver 
    this.initStartDialogEvent(scene, "event_start_speak_cora", eventGameObjects);
    this.initEndDialogEvent(scene, "event_end_speak_cora", eventGameObjects);

    // events emitters
    dead_zone.on("pointerdown", function ()
    {
        emitter.emit("event_start_speak_cora");
    });

    scene.input.keyboard.on('keyup', function(event)
    {
      // if(event.key === "v")
      // {
        emitter.emit("event_end_speak_cora");
      //}
    });
  }

  // @Event - switch to Harem Scene
  EventGoHarem(scene)
  {
    // dead zone
    let dead_zone = scene.children.getByName("dead_zone_1");

    dead_zone.on("pointerdown", function() 
    {
      // stop Bar Scene
      scene.scene.sleep('gm_bar');
      
      let s = scene.scene.get('gm_harem');
      if(s.scene.isSleeping())
      {
        scene.scene.wake('gm_harem');
      }
      else
      {
        // start Harem Scene
        scene.scene.start('gm_harem');
      }
    });
  }

  // @Event - switch to Drug Scene
  EventGoDrug(scene)
  {
    // dead zone
    let dead_zone = scene.children.getByName("dead_zone_2");

    dead_zone.on("pointerdown", function() 
    {
      // stop Bar Scene
      scene.scene.sleep('gm_bar');
      
      // start Harem Scene
      let s = scene.scene.get('gm_drug');
      if(s.scene.isSleeping())
      {
        scene.scene.wake('gm_drug')
      }
      else
      {
        scene.scene.start('gm_drug');
      }
    });
  }
};