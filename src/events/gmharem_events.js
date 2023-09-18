import GmEvents        from "./template/gm_events";
import EventDispatcher from "./template/event_dispatcher"; 

export default class GmHaremEvents extends GmEvents
{
  constructor(scene)
  {
    super(scene);

    // event speak Kora
    this.EventSpeakMagnolia(scene);
    this.EventGoBar(scene);
  }

  // @Event - Speak with Kora
  EventSpeakMagnolia(scene)
  {
    // dialog assets
    let kora_dialog      = scene.children.getByName("magnolia_dialog");
    let kora_dialog_back = scene.children.getByName("magnolia_dialog_back"); 

    // dead zone
    let dead_zone        = scene.children.getByName("dead_zone_1");
    
    // pack the assets
    let eventGameObjects = [kora_dialog, kora_dialog_back];

    // Custom Event Singleton
    let emitter = EventDispatcher.getInstance();

    // events receiver 
    this.initStartDialogEvent(scene, "event_start_speak_magnolia", eventGameObjects);
    this.initEndDialogEvent(scene, "event_end_speak_magnolia", eventGameObjects);

    // events emitters
    dead_zone.on("pointerdown", function ()
    {
        emitter.emit("event_start_speak_magnolia");
    });

    scene.input.keyboard.on('keyup', function(event)
    {
      //if(event.key === "v")
      //{
        emitter.emit("event_end_speak_magnolia");
      //}
    });
  }

  // @Event - switch to Harem Scene
  EventGoBar(scene)
  {
    // dead zone
    let dead_zone = scene.children.getByName("dead_zone_0");

    dead_zone.on("pointerdown", function() 
    {
      scene.scene.sleep('gm_harem');

      let s = scene.scene.get('gm_bar');
      if(s.scene.isSleeping())
      {
        scene.scene.wake('gm_bar');
      }
      else
      {
        // start Harem Scene
        scene.scene.start('gm_bar');
      }

    });
  }
};