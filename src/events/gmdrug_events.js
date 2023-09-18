import GmEvents        from "./template/gm_events";
import EventDispatcher from "./template/event_dispatcher"; 

export default class GmDrugEvents extends GmEvents
{
  constructor(scene)
  {
    super(scene);

    // event speak Spratz
    this.EventSpeakSpratz(scene);
    this.EventGoBar(scene);
  }

  // @Event - Speak with Spratz
  EventSpeakSpratz(scene)
  {
    // dialog assets
    let kora_dialog      = scene.children.getByName("spratz_dialog");
    let kora_dialog_back = scene.children.getByName("spratz_dialog_back"); 

    // dead zone
    let dead_zone        = scene.children.getByName("dead_zone_0");
    
    // pack the assets
    let eventGameObjects = [kora_dialog, kora_dialog_back];

    // Custom Event Singleton
    let emitter = EventDispatcher.getInstance();

    // events receiver 
    this.initStartDialogEvent(scene, "event_start_speak_spratz", eventGameObjects);
    this.initEndDialogEvent(scene, "event_end_speak_spratz", eventGameObjects);

    // events emitters
    dead_zone.on("pointerdown", function ()
    {
        emitter.emit("event_start_speak_spratz");
    });

    scene.input.keyboard.on('keyup', function(event)
    {
      //if(event.key === "v")
      //{
        emitter.emit("event_end_speak_spratz");
      //}
    });
  }

  // @Event - switch to Harem Scene
  EventGoBar(scene)
  {
    // dead zone
    let dead_zone = scene.children.getByName("dead_zone_1");

    dead_zone.on("pointerdown", function() 
    {
       // stop Bar Scene
       scene.scene.sleep('gm_drug');
            
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