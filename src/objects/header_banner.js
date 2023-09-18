import text from './text.js'
import Box from './box.js'

function create_header(scene, is_title){
    
    let header_width = window.innerWidth;
    let header_heigth = window.innerHeight * 0.05;
    let header_x = 0;
    let header_y = 0;       
    let header_offset_x = window.innerWidth * 0.025;
    let x_offset = header_width * 0.16;
    let y_offset = header_heigth * 0.3;

    let background_x = header_offset_x;
    let background_y = header_y + y_offset * 0.5;
    let background_width = header_width - header_offset_x * 2;
    let background_heigth = header_heigth + y_offset;
    let background_stroke = header_width * 0.0025;
    
    let version_text_width = header_width * 0.5 - x_offset * 2;
    let version_text_x = window.innerWidth * 0.1 + x_offset;
    let version_text_y = y_offset;
        
    let title_x = header_width * 0.15;
    let title_y = header_heigth * 0.2 + header_heigth;
    let title_width = header_width - 2 * title_x;
    let title_heigth = header_heigth * 2;
    
    let background = new Box(scene, background_x, background_y, background_stroke,
        background_width, background_heigth);

    let patreon_icon = scene.add.image(header_width * 0.9, y_offset, 'patreon');
    let audio_on = scene.add.image(header_width * 0.85, y_offset, 'sound_on');
    let audio_off = scene.add.image(header_width * 0.85, y_offset, 'sound_off');
    let logo = scene.add.image(header_width * 0.05,  y_offset, 'logo');
        
    patreon_icon.setOrigin(0,0).setInteractive().setScale(0.1);
    audio_on.setOrigin(0,0).setInteractive().setScale(0.1);
    audio_off.setOrigin(0,0).setInteractive().setScale(0.1);
    logo.setOrigin(0,0).setInteractive().setScale(0.1);
    audio_off.setVisible(false);
    
    switch_click(audio_off, audio_on, scene.audio, true);
    switch_click(audio_on, audio_off, scene.audio, false);
        
    patreon_icon.on('pointerdown', function(){ 
        window.open("https://www.patreon.com")
    });
    
    logo.on('pointerdown', function(){ 
        window.open("https://www.duckduckgo.com")
    });

    let version_text = text.create_text(scene, version_text_x, 
        version_text_y,"version: "+ 0.1, 72);    
    text.set_text(version_text, false);
    text.resize_text(version_text, version_text_x, version_text_y, version_text_width, header_heigth)
    
    if(is_title){
        let title = text.create_text(scene, title_x, title_y,"Johnny Adventure", 72);
        text.set_text(title, false);
        text.resize_text(title, title_x, title_y, title_width, title_heigth);
    }
}

function switch_click(entering, exiting, audio, toggle){
    exiting.on("pointerdown", function(){
        exiting.setVisible(false);
        entering.setVisible(true);
        toggle? audio.pause(): audio.resume();
    }, entering, exiting, audio, toggle);
}

export default create_header;
