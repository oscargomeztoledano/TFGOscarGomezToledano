import { Scene } from 'phaser'
import { tablaClasificaciones } from './utils/selects/tablaClasificaciones'
import { characterSelect } from './utils/selects/characterSelect'
import { worldSelect } from './utils/selects/worldSelect'
import {insignias } from './utils/selects/insignias'
import { biblioteca } from './utils/selects/biblioteca'
import { habilitaciones } from './utils/selects/habilitaciones'

export class MainMenuProfesor extends Scene
{
    constructor ()
    {
        super('MainMenuProfesor');
    }
    
    create (data)
    {
        this.buttonEnabledMain = true
        // Fondo
        this.add.image(0,0, 'background7').setOrigin(0,0).setScale(1.5);

        // Suelo
        this.floor = this.physics.add.staticGroup()
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
        // Textos e imagen
        this.add.text(16,32, `Usuario: ${JSON.parse(localStorage.getItem('usuario')).nombre.toUpperCase()}` ,{
            fontFamily: 'Arial Black',
            fontSize: '16px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        })
        this.add.image(16, 55, 'logo').setOrigin(0, 0).setScale(0.25)
        
        // Botones
        const botones = [
            {texto: 'JUGAR', callback: () => { worldSelect(this, JSON.parse(localStorage.getItem('usuario'))) }},
            {texto: 'SELECCIÓN DE PERSONAJE', callback: () => {characterSelect(this)}},
            {texto: 'INSÍGNEAS', callback: () => {insignias(this, JSON.parse(localStorage.getItem('usuario')))}},
            {texto: 'BIBLIOTECA', callback: () => {biblioteca(this, JSON.parse(localStorage.getItem('usuario')))}},
            {texto: 'CLASIFICACIONES', callback: () => {tablaClasificaciones(this, JSON.parse(localStorage.getItem('usuario')))}},
            {texto: 'HABILITAR MUNDOS', callback: () => {habilitaciones(this, JSON.parse(localStorage.getItem('usuario')))}},
            {texto: 'CRÉDITOS', callback: () => {}},
            {texto: 'SALIR', callback: () => {
                localStorage.clear()
                this.scene.start('SecondScene')}},
        ]
        
        const spacing= 10 
        const buttonHeight =  32
        const startY= this.scale.height/2- ((botones.length * (buttonHeight + spacing)) / 2) - 40;
        

        botones.forEach((boton, i) => {
            const y = startY + i * (buttonHeight + spacing)

            const buttonWidth = 258 // Tamaño del texto más largo + padding

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
                if (this.buttonEnabledMain){
                    this.buttonEnabledMain = false
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
        if (data.openWorldSelect){
            this.buttonEnabledMain = false
            worldSelect(this, JSON.parse(localStorage.getItem('usuario')))
        }
            
    }
   
}
