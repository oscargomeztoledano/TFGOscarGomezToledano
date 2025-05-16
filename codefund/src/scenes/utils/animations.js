import { controls } from './controls.js'  

// Animaciones de los sprites
export const initAnimations = ({ game }) =>{

    game.anims.create({
        key: 'player-idle1',
        frames: game.anims.generateFrameNumbers('player_idle1', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-run1',
        frames: game.anims.generateFrameNumbers('player_run1', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-jump1',
        frames: [{key: 'player_jump1', frame: 0}],
    })   
    game.anims.create({
        key: 'player-fall1',
        frames: [{key: 'player_fall1', frame: 0}],
    })
    game.anims.create({
        key: 'player-hit1',
        frames: game.anims.generateFrameNumbers('player_hit1', { start: 0, end: 6}),
        frameRate: 10,
        repeat: 0,
    })

    game.anims.create({
        key: 'player-idle2',
        frames: game.anims.generateFrameNumbers('player_idle2', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-run2',
        frames: game.anims.generateFrameNumbers('player_run2', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-jump2',
        frames: [{key: 'player_jump2', frame: 0}],
    })   
    game.anims.create({
        key: 'player-fall2',
        frames: [{key: 'player_fall2', frame: 0}],
    })
    game.anims.create({
        key: 'player-hit2',
        frames: game.anims.generateFrameNumbers('player_hit2', { start: 0, end: 6}),
        frameRate: 10,
        repeat: 0,
    })

    game.anims.create({
        key: 'player-idle3',
        frames: game.anims.generateFrameNumbers('player_idle3', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-run3',
        frames: game.anims.generateFrameNumbers('player_run3', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-jump3',
        frames: [{key: 'player_jump3', frame: 0}],
    })   
    game.anims.create({
        key: 'player-fall3',
        frames: [{key: 'player_fall3', frame: 0}],
    })
    game.anims.create({
        key: 'player-hit3',
        frames: game.anims.generateFrameNumbers('player_hit3', { start: 0, end: 6}),
        frameRate: 10,
        repeat: 0,
    })

    game.anims.create({
        key: 'player-idle0',
        frames: game.anims.generateFrameNumbers('player_idle0', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-run0',
        frames: game.anims.generateFrameNumbers('player_run0', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'player-jump0',
        frames: [{key: 'player_jump0', frame: 0}],
    })   
    game.anims.create({
        key: 'player-fall0',
        frames: [{key: 'player_fall0', frame: 0}],
    })
    game.anims.create({
        key: 'player-hit0',
        frames: game.anims.generateFrameNumbers('player_hit0', { start: 0, end: 6}),
        frameRate: 10,
        repeat: 0,
    })

    game.anims.create({
        key: 'checkpoint1anims',
        frames: game.anims.generateFrameNumbers('checkpoint1', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1,
        yoyo: true
    })
    game.anims.create({
        key: 'press_e',
        frames:[{key: 'E0'},{key: 'E1'}],
        frameRate:2,
        repeat: -1,
    })
} 

// Animaciones 
export function appearance(target, scene, delay){
    const originalScaleX = target.scaleX;
    const originalScaleY = target.scaleY;

    target.setAlpha(0);
    target.setScale(originalScaleX * 0.5, originalScaleY * 0.5); // Escala proporcional

    scene.tweens.add({
        targets: target,
        alpha: 1,
        scaleX: originalScaleX,
        scaleY: originalScaleY,
        duration: 200,
        ease: 'Back.Out',
        delay: delay
    });
}
export function disappearance(target, scene) {
    const originalScaleX = target.scaleX;
    const originalScaleY = target.scaleY;

    scene.tweens.add({
        targets: target,
        alpha: 0,
        scaleX: originalScaleX * 0.5,
        scaleY: originalScaleY * 0.5,
        duration: 200,
        ease: 'Back.In',
        onComplete: () => {
            target.destroy();
        }
    });
}
export function addtoscore(score, scene) {
    const scoreText = scene.add.text(
        scene.player.x,
        scene.player.y- scene.player.height,
        `+${score}`,
        {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#000',
            align: 'center',
            fontStyle: 'bold',
            padding: { x: 4, y: 2 }
        }
    ) 

    scoreText.setDepth(1000)

    scene.tweens.add({
        targets: scoreText,
        y: scoreText.y - 50,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
            scoreText.destroy();
        }
    });
}
export function hit (scene){
    scene.ishit=true
    //animacion golpe
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    scene.player.anims.play(`player-hit${usuario.avatar}`, true)
    // x indicando el error
    const xSprite=scene.add.sprite(
        scene.player.x+scene.player.width/2, 
        scene.player.y-scene.player.height, 
        'cross').setScale(2)
    xSprite.setDepth(1000)
    scene.tweens.add({
        targets: xSprite,
        y: xSprite.y - 50,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
            xSprite.destroy();
        }
    });

    // capturamos cuando la animacion termine y llamamos a controls
    scene.player.once(`animationcomplete-player-hit${usuario.avatar}`,() => {
        scene.ishit=false
        controls(scene)
    })                
   
}