import { Scene } from 'phaser'
import { tablaClasificacion } from './windows/tablaClasificacion'
import { characterSelect } from './windows/characterSelect'
import { worldSelect } from './windows/worldSelect'
import {insignias } from './windows/insignias'
import { biblioteca } from './windows/biblioteca'
import { panelCarga} from '../utils/panelCarga'
import { appearance } from '../utils/animations'


export class MainMenuJugador extends Scene
{
    constructor ()
    {
        super('MainMenuJugador');
    }
    
    async create (data)
    {
        this.buttonEnabledMain = true

        // Fondo
        this.add.image(0,0, 'background7').setOrigin(0,0).setScale(1.5);
        const container = this.add.container(this.scale.width/2, this.scale.height/2)
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
        this.add.text(16,16, `Usuario: ${JSON.parse(localStorage.getItem('usuario')).nombre.toUpperCase()}` ,{
            fontFamily: 'Arial Black',
            fontSize: '16px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        })
        this.add.text(16,32, `Rol: Alumno` ,{
            fontFamily: 'Arial Black',
            fontSize: '16px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        })
        this.add.image(16, 55, 'logo').setOrigin(0, 0).setScale(0.25)
        
        // Botones
        const botones = [
            {texto: 'JUGAR', callback: () => { 
                const panel = panelCarga(this, 'CARGANDO MUNDOS...') 
                setTimeout(() => {
                    worldSelect(this, JSON.parse(localStorage.getItem('usuario')), JSON.parse(localStorage.getItem('mundos'))).then(() => {
                        panel.destroy()
                    })
                }, 500)
            }},
            {texto: 'SELECCIÓN DE PERSONAJE', callback: () => {
                const panel = panelCarga(this, 'CARGANDO PERSONAJES...')
                setTimeout(() => {
                    characterSelect(this).then(() => {
                        panel.destroy()
                    })
                },500)
            }},
            {texto: 'INSIGNIAS', callback: () => {
                const panel = panelCarga(this, 'CARGANDO INSIGNIAS...')
                setTimeout(() => {
                    insignias(this, JSON.parse(localStorage.getItem('usuario'))).then(() => {
                        panel.destroy()
                    })
                },500)
            }},
            {texto: 'BIBLIOTECA', callback: () => {
                const panel = panelCarga(this, 'CARGANDO BIBLIOTECA...')
                setTimeout(() => {
                    biblioteca(this, JSON.parse(localStorage.getItem('usuario'))).then(() => {
                        panel.destroy()
                    })
                },500)
            }},
            {texto: 'TABLA DE CLASIFICACIÓN', callback: () => {
                const panel = panelCarga(this, 'CARGANDO CLASIFICACIÓN...')
                setTimeout(() => {
                    tablaClasificacion(this, JSON.parse(localStorage.getItem('usuario'))).then(() => {
                            panel.destroy()
                    })
                },500)
            }},
            {texto: 'SALIR', callback: () => {
                panelCarga(this, 'SALIENDO...')
                localStorage.clear()
                setTimeout(() => {
                    this.scene.start('Inicio')
                }, 500)                   
            }},
        ]
        
        const spacing= 10 
        const buttonHeight =  32
        const startY= - ((botones.length * (buttonHeight + spacing)) / 2) - 40;
        

        botones.forEach((boton, i) => {
            const y = startY + i * (buttonHeight + spacing)

            const buttonWidth = 258 // Tamaño del texto más largo + padding

            const button = this.add.nineslice(
                0, y, 
                'fondoBoton', 0, 
                buttonWidth, buttonHeight, 
                10,10,10,10
            ).setOrigin(0.5).setInteractive({useHandCursor: true})
            container.add(button)
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
            container.add(buttonText)

            button.on('pointerdown', () => {
                if (this.buttonEnabledMain){
                    this.buttonEnabledMain = false
                    this.tweens.add({
                        targets: [button, buttonText],
                        scale: 0.9, 
                        duration: 100,
                        ease: 'Power1',
                        yoyo: true, 
                        onComplete: () => {
                            boton.callback(); 
                        }
                    });
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
            worldSelect(this, JSON.parse(localStorage.getItem('usuario')), JSON.parse(localStorage.getItem('mundos')))
        }   
        const panelBienvenida = panelCarga(this, `HOLA ${JSON.parse(localStorage.getItem('usuario')).nombre.toUpperCase()}`)
        setTimeout(() => {
            panelBienvenida.destroy()
        }, 1000) 
        appearance(container,this)            
    }   
}
