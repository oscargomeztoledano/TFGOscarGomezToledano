import {Scene} from 'phaser'
import { initSpritesheet } from './scenes/spritesheet';
import { initAnimations } from './scenes/animations'

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }
    preload(){
        this.load.image('logo', '/assets/ui/LOGO_UCLM_2021.png')  
        this.load.json('kahootLevel1', 'assets/json/anslevel1.json'); // Asegúrate de que la ruta sea correcta
        this.load.json('kahootLevel3', 'assets/json/anslevel3.json'); 
        this.load.image('background1', '/assets/Backgrounds/1.png')
        this.load.image('background2', '/assets/Backgrounds/2.png')
        this.load.image('background3', '/assets/Backgrounds/3.png')
        this.load.image('background4', '/assets/Backgrounds/4.png')
        this.load.image('background5', '/assets/Backgrounds/5.png')
        this.load.image('background6', '/assets/Backgrounds/6.png')
        this.load.image('background7', '/assets/Backgrounds/krita.png')

        this.load.image('floor1', '/assets/floor/floor1.png')
        this.load.image('floor2', '/assets/floor/floor2.png')
        this.load.image('floor3', '/assets/floor/floor3.png')
        this.load.image('floor4', '/assets/floor/floor4.png')
        this.load.image('floor5', '/assets/floor/floor5.png')
        this.load.image('floor6', '/assets/floor/floor6.png')
        this.load.image('floor7', '/assets/floor/floor7.png')
        this.load.image('floor8', '/assets/floor/floor8.png')

        this.load.image('platformL', '/assets/floor/platformL.png')
        this.load.image('platformR', '/assets/floor/platformR.png')

        this.load.image('cloud1', '/assets/enviroments/cloud1.png')
        this.load.image('cloud2', '/assets/enviroments/cloud2.png')

        this.load.image('tile1', '/assets/ui/tiles/tile3.png')
        this.load.image('tile0', '/assets/ui/tiles/tile4.png')
        this.load.image('tile2', '/assets/ui/tiles/tile0.png')
        this.load.image('tile3', '/assets/ui/tiles/tile2.png')
        this.load.image('tile6', '/assets/ui/tiles/tile6.png')

        this.load.image('E0', '/assets/ui/keyboard/keyboard_e.png')
        this.load.image('E1', '/assets/ui/keyboard/keyboard_e_outline.png')

        this.load.image('ans0', '/assets/ui/tiles/ans0.png')
        this.load.image('ans1', '/assets/ui/tiles/ans1.png')
        this.load.image('ans2', '/assets/ui/tiles/ans2.png')
        this.load.image('ans3', '/assets/ui/tiles/ans3.png')

        this.load.image('cross', '/assets/ui/tiles/icon_cross.png')
        this.load.image('check', '/assets/ui/tiles/icon_checkmark.png')
        this.load.image('scroll', '/assets/items/scroll1.png')
        this.load.image('chest', '/assets/items/chest.png')

        this.load.image('star', '/assets/ui/pantallaFinal/star.png')
        this.load.image('starOutline', '/assets/ui/pantallaFinal/star_outline.png')

        //menu pause
        this.load.image('button1', '/assets/ui/cyberpunkUI/3 Icons/Buttons2/Button2_10.png')
        this.load.image('button2', '/assets/ui/cyberpunkUI/3 Icons/Buttons2/Button2_07.png')
        this.load.image('iconResume', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_34.png')
        this.load.image('iconRestart', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_28.png')
        this.load.image('iconExit', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_35.png')
        this.load.image('iconLevels', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_19.png')
        this.load.image('iconSettings', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_07.png')

        //frames cambio pantalla final y game over
        this.load.image('frame1', '/assets/ui/cyberpunkUI/1 Frames/Frame_07.png')
        this.load.image('frame2', '/assets/ui/cyberpunkUI/1 Frames/Frame_37.png')
        this.load.image('frame3', '/assets/ui/cyberpunkUI/1 Frames/Frame_80.png')
        
        initSpritesheet(this)
    }
    create() {
        initAnimations(this)
        this.scene.start('Level2')
    }
}
