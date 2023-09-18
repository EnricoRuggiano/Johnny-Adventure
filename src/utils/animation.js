function create_animation(name, frame_rate, num_frames){
    let anim = {
        key : name,
        frames : [],
        frameRate: frame_rate,
        repeat: -1
    };
    
    for (let i = 0; i <= num_frames; i++) {
        anim.frames.push({ key: name + i });
    }
    return anim
}

export default create_animation
