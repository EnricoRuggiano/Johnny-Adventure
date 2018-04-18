function AnimationRegistry(game){

    // World
    game.anims.create({
        key: 'insegna1',
        frames: game.anims.generateFrameNumbers('insegna1', {start: 0, end: 7}),
        frameRate: 8,
        repeat: -1
    });

    game.anims.create({
        key: 'insegna2',
        frames: game.anims.generateFrameNumbers('insegna2', {start: 0, end: 7}),
        frameRate: 8,
        repeat: -1
    });

    game.anims.create({
        key: 'insegna3',
        frames: game.anims.generateFrameNumbers('insegna3', {start: 0, end: 8}),
        frameRate: 8,
        repeat: -1
    });

    // Johnny
    game.anims.create({
        key: 'walk_left',
        frames: game.anims.generateFrameNumbers('walk_left', {start: 0, end: 7}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'stand_right',
        frames: game.anims.generateFrameNumbers('talk_right', {start: 9, end: 9})
    });

    game.anims.create({
        key: 'stand_left',
        frames: game.anims.generateFrameNumbers('talk_left', {start: 0, end: 0})
    });

    game.anims.create({
        key: 'talk_right',
        frames: game.anims.generateFrameNumbers('talk_right', {start: 0, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'talk_left',
        frames: game.anims.generateFrameNumbers('talk_left', {start: 1, end: 9}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'walk_right',
        frames: game.anims.generateFrameNumbers('walk_right', {start: 0, end: 7}),
        frameRate: 10,
        repeat: -1
    });

    // Characters
    game.anims.create({
        key: 'kora',
        frames: game.anims.generateFrameNumbers('kora_idle', {start: 0, end: 15}),
        frameRate: 8,
        repeat: -1
    });

    game.anims.create({
        key: 'scarlet',
        frames: [{ key: 'scarlet_test', frame: null }]
    });
    game.anims.create({
        key: 'jim',
        frames: [{ key: 'jim_test', frame: null }]
    });
    game.anims.create({
        key: 'sara',
        frames: [{ key: 'sara_test', frame: null }]
    });
}