import { MainMenu } from './scenes/MainMenu';
import { Level1 } from './scenes/world1/level1';
import { Level2 } from './scenes/world1/level2';  
import { Level3 } from './scenes/world1/level3';
import { Preloader } from './preloader'; 
//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            
            gravity: { y: 0 }
        }
    },
    render: {
        pixelArt: true,
        antialias: false
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Level1,
        Level2,
        Level3,
        MainMenu,
    ],
    dom: {
        createContainer: true  // <-- ESTO ES CLAVE
    }
};

export default new Phaser.Game(config);
