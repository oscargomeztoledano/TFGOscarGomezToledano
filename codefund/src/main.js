import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Level1 } from './scenes/world1/level1';
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
        Level1,
        MainMenu,
        Game,
        GameOver,
    ],
    dom: {
        createContainer: true  // <-- ESTO ES CLAVE
    }
};

export default new Phaser.Game(config);
