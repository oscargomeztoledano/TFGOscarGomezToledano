import {Scene} from 'phaser'
import { initSpritesheet } from './scenes/utils/spritesheet';
import { initAnimations } from './scenes/utils/animations'

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }
    preload(){
        
        this.load.image('logo', '/assets/ui/logo_ccss_talavera.jpg')  
        this.load.json('kahootLevel1_1', 'assets/json/anslevel1_1.json') 
        this.load.json('kahootLevel1_2', 'assets/json/anslevel1_2.json')
        this.load.json('kahootLevel1_5', 'assets/json/anslevel1_5.json')
        this.load.json('kahootLevel1_6', 'assets/json/anslevel1_6.json')
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
        
        this.load.image('floor8', '/assets/floor/floor8.png')

        this.load.image('platformL', '/assets/floor/platformL.png')
        this.load.image('platformR', '/assets/floor/platformR.png')

        this.load.image('cloud1', '/assets/enviroments/cloud1.png')
        this.load.image('cloud2', '/assets/enviroments/cloud2.png')


        this.load.image('E0', '/assets/ui/keyboard/keyboard_e.png')
        this.load.image('E1', '/assets/ui/keyboard/keyboard_e_outline.png')

        this.load.image('ans0', '/assets/ui/cyberpunkUI/6 Buttons/1/Button2_01.png')
        this.load.image('ans1', '/assets/ui/cyberpunkUI/6 Buttons/2/Button2_02.png')
        this.load.image('ans2', '/assets/ui/cyberpunkUI/6 Buttons/3/Button2_03.png')
        this.load.image('ans3', '/assets/ui/cyberpunkUI/6 Buttons/5/Button2_05.png')

        this.load.image('cross', '/assets/ui/tiles/icon_cross.png')
        this.load.image('check', '/assets/ui/tiles/icon_checkmark.png')
        this.load.image('scroll1', '/assets/items/scroll1.png')
        this.load.image('scroll2', '/assets/items/scroll2.png')
        this.load.image('scroll3', '/assets/items/scroll3.png')
        this.load.image('scroll4', '/assets/items/scroll4.png')
        this.load.image('scroll5', '/assets/items/scroll5.png')
        this.load.image('scroll6', '/assets/items/scroll6.png')
        this.load.image('scroll7', '/assets/items/scroll7.png')
        this.load.image('scroll8', '/assets/items/scroll8.png')
        this.load.image('chest', '/assets/items/chest.png')

        this.load.image('star', '/assets/ui/pantallaFinal/star.png')
        this.load.image('starOutline', '/assets/ui/pantallaFinal/star_outline.png')

        //menu pause
        this.load.image('button1', '/assets/ui/cyberpunkUI/6 Buttons/1/Button2_01.png')
        this.load.image('button2', '/assets/ui/cyberpunkUI/6 Buttons/1/Button2_11.png')
        this.load.image('iconResume', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_34.png')
        this.load.image('iconRestart', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_28.png')
        this.load.image('iconExit', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_35.png')
        this.load.image('iconLevels', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_19.png')
        this.load.image('iconSettings', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_07.png')
        this.load.image('iconLock', '/assets/ui/cyberpunkUI/3 Icons/Icons/Icon_08.png')
        
        //frames cambio pantalla final y game over
        this.load.image('fondoBoton', '/assets/ui/cyberpunkUI/1 Frames/Frame_07.png')
        this.load.image('fondoBotonX', '/assets/ui/cyberpunkUI/1 Frames/Frame_08.png')
        this.load.image('marco1', '/assets/ui/cyberpunkUI/1 Frames/Frame_37.png')
        this.load.image('marco2', '/assets/ui/cyberpunkUI/1 Frames/Frame_79.png')
        this.load.image('marco3', '/assets/ui/cyberpunkUI/1 Frames/Frame_80.png')

        this.load.image('1.1Done', '/assets/achievements/1_1Done.png')
        this.load.image('1.2Done', '/assets/achievements/1_2Done.png')
        this.load.image('1.3Done', '/assets/achievements/1_3Done.png')
        this.load.image('1.4Done', '/assets/achievements/1_4Done.png')
        this.load.image('1.5Done', '/assets/achievements/1_5Done.png')
        this.load.image('1.6Done', '/assets/achievements/1_6Done.png')
        this.load.image('1.1Estrellas', '/assets/achievements/1_1Estrellas.png')
        this.load.image('1.2Estrellas', '/assets/achievements/1_2Estrellas.png')
        this.load.image('1.3Estrellas', '/assets/achievements/1_3Estrellas.png')
        this.load.image('1.4Estrellas', '/assets/achievements/1_4Estrellas.png')
        this.load.image('1.5Estrellas', '/assets/achievements/1_5Estrellas.png')
        this.load.image('1.6Estrellas', '/assets/achievements/1_6Estrellas.png')
        this.load.image('2.1Done', '/assets/achievements/2_1Done.png')
        this.load.image('2.2Done', '/assets/achievements/2_2Done.png')
        this.load.image('2.3Done', '/assets/achievements/2_3Done.png')
        this.load.image('2.4Done', '/assets/achievements/2_4Done.png')
        this.load.image('2.5Done', '/assets/achievements/2_5Done.png')
        this.load.image('2.6Done', '/assets/achievements/2_6Done.png')
        this.load.image('2.1Estrellas', '/assets/achievements/2_1Estrellas.png')
        this.load.image('2.2Estrellas', '/assets/achievements/2_2Estrellas.png')
        this.load.image('2.3Estrellas', '/assets/achievements/2_3Estrellas.png')
        this.load.image('2.4Estrellas', '/assets/achievements/2_4Estrellas.png')
        this.load.image('2.5Estrellas', '/assets/achievements/2_5Estrellas.png')
        this.load.image('2.6Estrellas', '/assets/achievements/2_6Estrellas.png')
        this.load.image('1Done', '/assets/achievements/1Done.png')
        this.load.image('2Done', '/assets/achievements/2Done.png')
        this.load.image('5Estrellas', '/assets/achievements/5Estrellas.png')
        this.load.image('10Estrellas', '/assets/achievements/10Estrellas.png')
        this.load.image('15Estrellas', '/assets/achievements/15Estrellas.png')
        this.load.image('20Estrellas', '/assets/achievements/20Estrellas.png')
        this.load.image('25Estrellas', '/assets/achievements/25Estrellas.png')
        this.load.image('30Estrellas', '/assets/achievements/30Estrellas.png')
        this.load.image('35Estrellas', '/assets/achievements/35Estrellas.png')
        this.load.image('40Estrellas', '/assets/achievements/40Estrellas.png')
        this.load.image('45Estrellas', '/assets/achievements/45Estrellas.png')

        initSpritesheet(this)
    }
    create() {
        initAnimations(this)
        this.scene.start('SecondScene');
    }
}
