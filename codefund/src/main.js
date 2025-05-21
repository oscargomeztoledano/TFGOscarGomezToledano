import { MainMenu } from './scenes/MainMenu';
import { mundo1nivel1_1 } from './scenes/mundo 1/nivel1_1';
import { mundo1nivel1_2 } from './scenes/mundo 1/nivel1_2';
import {mundo1nivel1_3} from './scenes/mundo 1/nivel1_3';
import {mundo1nivel1_4} from './scenes/mundo 1/nivel1_4';
import {mundo1nivel1_5} from './scenes/mundo 1/nivel1_5';
import {mundo1nivel1_6} from './scenes/mundo 1/nivel1_6';
import { Preloader } from './preloader'; 
import { SecondScene } from './scenes/second';
import { FirstScene } from './scenes/first';

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
        mundo1nivel1_1,
        mundo1nivel1_2,
        mundo1nivel1_3,
        mundo1nivel1_4,
        mundo1nivel1_5,
        mundo1nivel1_6,
        MainMenu,
        SecondScene,
        FirstScene
    ],
    dom: {
        createContainer: true  
    }
};

export default new Phaser.Game(config);
