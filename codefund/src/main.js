import { MainMenu } from './scenes/MainMenu';
import { nivel1 } from './scenes/mundo 1/nivel1';
import {nivel2} from './scenes/mundo 1/nivel2';
import {nivel3} from './scenes/mundo 1/nivel3';
import { Preloader } from './preloader'; 
import { SecondScene } from './scenes/second';
import { FirstScene } from './scenes/first';
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
        nivel1,
        nivel2,
        nivel3,
        MainMenu,
        SecondScene,
        FirstScene
    ],
    dom: {
        createContainer: true  // <-- ESTO ES CLAVE
    }
};

export default new Phaser.Game(config);
