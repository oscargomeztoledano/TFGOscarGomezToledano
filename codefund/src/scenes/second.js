import {Scene} from 'phaser'
import { registro, inicioSesion } from './forms';


    
export class SecondScene extends Scene {
    constructor() {
        super('SecondScene')
    }
    create() {
        this.add.image(0,0, 'background7').setOrigin(0,0).setScale(1.5);

        this.buttonEnabled = true

        this.floor = this.physics.add.staticGroup()
        // Lista de IDs de los suelos
        const tileWidth = 48 
        const yPosition1 = this.scale.height - tileWidth 
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            this.floor.create(x, yPosition1, 'floor8').setOrigin(0, 0).refreshBody()
        }
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5']
        const yPosition2 = this.scale.height - tileWidth -tileWidth
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes) // Seleccionar un suelo aleatorio
            this.floor.create(x, yPosition2, randomFloor).setOrigin(0, 0).refreshBody()
        }

        this.add.image(16, 55, 'logo').setOrigin(0, 0).setScale(0.2)

        let botones = [
            {texto: 'INICIAR SESION', callback: () => { inicioSesion(this) }},
            {texto: 'REGISTRARSE', callback: () => { registro(this) }},
        ]
        
        const spacing= 10 
        const buttonHeight =  32
        const startY= this.scale.height/2- ((botones.length * (buttonHeight + spacing)) / 2) - 40;


        botones.forEach((boton, i) => {
            const y = startY + i * (buttonHeight + spacing)

            const tempText = this.add.text(0,0, boton.texto, {
                fontFamily: 'Arial Black',
                fontSize: '14px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }).setVisible(false)

            const padding = 40
            const buttonWidth = tempText.width + padding

            const button = this.add.nineslice(
                this.scale.width / 2, y, 
                'fondoBoton', 0, 
                buttonWidth, buttonHeight, 
                10,10,10,10
            ).setOrigin(0.5).setInteractive({useHandCursor: true})
            

            const buttonText = this.add.text(
                button.x , y,
                boton.texto, {
                    fontFamily: 'Arial Black',
                    fontSize: '14px',
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                }
            ).setOrigin(0.5)

            button.on('pointerdown', () => {
                if (this.buttonEnabled){
                    this.buttonEnabled = false
                    boton.callback()
                } 
            })
            button.on('pointerover', () => {
                button.setScale(1.1);
                buttonText.setScale(1.1);
            })
            button.on('pointerout', () => {
                button.setScale(1);
                buttonText.setScale(1);
            })
        })
    }
    

}