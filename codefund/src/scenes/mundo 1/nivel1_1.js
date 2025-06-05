import {Scene} from 'phaser';
import { controls } from '../../utils/controls';
import { appearance, disappearance, addtoscore, hit } from '../../utils/animations';
import { platforms1_1 } from '../../utils/platforms';
import { bocadilloCollectible, bocadilloScroll} from "../../utils/bocadillo"
import { successWindow, failureWindow } from '../windows/finalWindow';
import { generarComponente } from '../../utils/formula';
import { crearVidas, quitarvida } from '../../utils/vidas';
import { menuPause } from '../windows/menuPause';
let startTimeM1L1_1 = 0

export class mundo1nivel1_1 extends Scene
{

    constructor ()
    {
        super('mundo 1'+'nivel1_1')
    }

    preload ()
    {
        
    }
    create()
    {
        
                // Variables globales   
                this.isOverlappingCollectible = false
                this.isOverLappnigScroll = false
                this.activeCollectible = null
                this.isOverLappingCheckpoint = false
                this.controlEnabled = true
                this.awaitingAnswer = false
                this.ishit=false
                this.currentLevel = 'mundo 1'+'nivel1_1'
                this.nextLevel = 'mundo 1'+'nivel1_2'
                this.currentWorldIndex = 0
                this.currentLevelIndex = 0
                
                // t0
                startTimeM1L1_1 = Date.now()

                // Fondo
                this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background1').setOrigin(0, 0)


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

                //  Plataformas
                platforms1_1(this)

                // Vidas
                crearVidas(this)

                // Título
                this.add.text(16, 16, '1-1. Guardado de Variables I', {
                    fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 8,
                    align: 'left'
                }).setOrigin(0, 0)
                this.add.image(25, 55, 'logo').setOrigin(0, 0).setScale(0.25)

                //  Jugador
                const usuario = JSON.parse(localStorage.getItem('usuario'))
                this.player = this.physics.add.sprite(100, this.scale.height - tileWidth*2, `player_idle${usuario.avatar}`)
                .setOrigin(0, 1)
                .setCollideWorldBounds(true)
                .setGravityY(300)
                .setScale(2)
                // Colisiones Jugador y Suelo
                this.physics.add.collider(this.player, this.floor)

                // Scroll
                this.scroll= this.physics.add.image(200,this.scale.height-tileWidth*2,'scroll1').setOrigin(0,1)
                const text= 'Este es un nivel de variables. Cada variable tiene una manera de guardarse. Resuelve todos los acertijos para terminar el nivel.'
                this.physics.add.overlap(
                    this.player,
                    this.scroll,
                    (player, scroll) => {
                        bocadilloScroll(this, text )
                    }
                , null, this) 

                // Coleccionables
                this.collection = this.physics.add.staticGroup()
                this.componentes = [
                    { x:  790, y: 250, value: 'A' },
                    { x: 250, y: 350, value: '-80' },
                    { x: 610, y: 250, value: '128' },
                    { x: 340, y: 550, value: 'Hola Mundo' },
                    { x: 700, y: this.scale.height-tileWidth*2, value: '2147483688' },
                    { x: 690, y: 450, value: '9x10^17' }
                ]

                generarComponente(this)

                // Colisiones Jugador y Coleccionables
                this.physics.add.overlap(this.player, this.collection, (player, collectible) => {
                    if (!this.bocadillo&&!this.awaitingAnswer)
                    bocadilloCollectible(this, collectible)
                    this.isOverlappingCollectible = true
                    this.activeCollectible = collectible
                }, null, this)

                // Listener E
                this.input.keyboard.on('keydown-E', () => {
                        if (this.isOverlappingCollectible && !this.awaitingAnswer) {
                            this.awaitingAnswer = true
                            if (this.bocadillo) disappearance(this.bocadillo, this)
                            if (this.icon) disappearance(this.icon, this)
                        }     
                });
                // Listener ESC
                this.input.keyboard.on('keydown-ESC', () => {
                    
                    // Salir de la pregunta
                    if (this.awaitingAnswer && !this.controlEnabled) {
                    this.awaitingAnswer = false
                    this.controlEnabled = true

                    if (this.questionUI) {
                        disappearance(this.questionUI.fondo, this)
                        disappearance(this.questionUI.preguntaText, this)
                        this.questionUI.buttons.forEach(b => {
                        disappearance(b.button, this)
                        disappearance(b.text, this)
                        });
                        this.questionUI = null
                    }
                    }// Pausar el juego
                    else if (!this.awaitingAnswer && this.controlEnabled) {
                        this.controlEnabled = false
                        menuPause(this,usuario)
                    }
                    
                });

                this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE') 
                this.showControls= true
                const instrucciones = 'Pulsa A o D para moverte. Pulsa SPACE para saltar'
                this.instruccionesText = this.add.text(0,0,instrucciones, {
                    fontFamily: 'Arial Black', fontSize: 16, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 2,
                    align: 'center',wordWrap: { width: 200 }
                }).setOrigin(0.5)
                const instruccionesWidth = this.instruccionesText.width + 20
                const instruccionesHeight = this.instruccionesText.height + 16
                this.instruccionesBg = this.add.nineslice(
                    this.player.x+75, 
                    this.player.y - this.player.height * this.player.scaleY - instruccionesHeight / 2 - 30,
                    'marco3', 0,
                    instruccionesWidth,
                    instruccionesHeight,
                    10, 10, 10, 10
                ).setOrigin(0.5)
                this.instruccionesText.setPosition(
                    this.instruccionesBg.x,
                    this.instruccionesBg.y
                )
                this.instruccionesText.setDepth(this.instruccionesBg.depth + 1)
    }
    update()
    {
        if (this.ishit) return

        if (this.showControls) {
            const movingLeft = this.keys.A.isDown;
            const movingRight = this.keys.D.isDown;
            const jumping = this.keys.SPACE.isDown;

            if (movingLeft || movingRight || jumping) {
                this.showControls = false;
                disappearance(this.instruccionesBg, this)
                disappearance(this.instruccionesText, this)
            }
        }
        if (this.controlEnabled) controls(this)

        if (this.awaitingAnswer && this.controlEnabled) {
            this.controlEnabled = false
            initQuestions(this)
        }

        // Controlar NO overlapping collectible
        if (this.isOverlappingCollectible && this.activeCollectible) {
            const stillOverlapping = this.physics.overlap(this.player, this.activeCollectible);

            if (!stillOverlapping) {
                disappearance(this.bocadillo, this)
                disappearance(this.icon, this)

                this.bocadillo = null
                this.icon = null
                this.activeCollectible = null
                this.isOverlappingCollectible = false
            }
        } 

        // Controlar NO overlapping scroll
        if (this.isOverLappingScroll) {
            const stillOverlapping = this.physics.overlap(this.player, this.scroll);

            if (!stillOverlapping) {
                disappearance(this.bocadillo, this)
                this.bocadillo = null
                disappearance(this.text,this)
                this.text = null
                this.isOverLappingScroll = false
            }
        }

        //Verificar final  nivel 
        const remainingCollectibles = this.collection.getChildren().filter(collectible => collectible.active).length
        if (remainingCollectibles === 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeM1L1_1) / 1000)
            successWindow(this, timeTaken,600)
        }

        // Comprobar Game Over
        if(this.vidas <= 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeM1L1_1)/1000)
            failureWindow(this, timeTaken)
        }
    }

}

function initQuestions(scene) {
    const padding = 10
    const collectible = scene.activeCollectible
    const id = collectible.text
    const kahootData = scene.cache.json.get('kahootLevel1_1')
    const entry = kahootData.anslevel1_1.find(q => q.id === id)

    if (!entry) {
        console.warn('No se encontraron respuestas para:', id)
        return
    }

    // Mostrar la pregunta
    const pregunta = '¿Cómo guardarías la variable "' + id + '"?';
    const preguntaText = scene.add.text(scene.scale.width / 2, 130, pregunta, {
        fontSize: '18px',
        color: '#fff',
        wordWrap: { width: 400 },
        align: 'center',
        fontFamily: 'Arial Black',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5)

    const fondo = scene.add.nineslice(
        scene.scale.width / 2, 130,
        'marco3', 0,
        preguntaText.width + padding * 2,
        preguntaText.height + padding * 2,
        10, 10, 10, 10
    ).setOrigin(0.5)

    preguntaText.setDepth(fondo.depth + 1)

    // Un boton por cada respuesta
    const respuestas = entry.answers
    const buttons = []
    appearance(fondo, scene, 0)
    appearance(preguntaText, scene, 50)

    respuestas.forEach((respuesta, index) => {
        const col = index % 2
        const row = Math.floor(index / 2)
    
        const spacingX = 135
        const spacingY = 135
    
        const baseX = scene.scale.width / 2
        const baseY = 220
    
        const posX = baseX + (col === 0 ? -spacingX / 2 : spacingX / 2)
        const posY = baseY + row * spacingY
        const tileKey = 'ans' + index
    
        const button = scene.add.nineslice(posX, posY, tileKey,0,128,128,2,2,5,2)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5)
    
        const text = scene.add.text(posX, posY, respuesta.body, {
            fontSize: '16px',
            color: '#fff',
            wordWrap: { width: 110, useAdvancedWrap: true  }, 
            align: 'center',
            fontFamily: 'Arial Black',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5)
    
        button.isCorrect = respuesta.isCorrect
    
        appearance(button, scene, 50 + index * 50)
        appearance(text, scene, 50 + index * 50)

        button.on('pointerdown', () => {
            console.log('Respuesta seleccionada:', respuesta.body)
            if (button.isCorrect) {
                console.log('¡Correcto!')
                scene.awaitingAnswer = false
                addtoscore(100, scene) 
                disappearance(collectible, scene)

            } else {
                quitarvida(scene)
                hit(scene)              
                console.log('Incorrecto.')
                scene.awaitingAnswer = false
            }
    
            if (!scene.awaitingAnswer) {
                scene.controlEnabled = true
                disappearance(fondo, scene)
                disappearance(preguntaText, scene)
                buttons.forEach(b => {
                    disappearance(b.button, scene)
                    disappearance(b.text, scene)
                })
            }
        })

        button.on('pointerover', () => {
            button.setScale(1.1);
            text.setScale(1.1);
        });
        button.on('pointerout', () => {
            button.setScale(1);
            text.setScale(1);
        });

        buttons.push({ button, text })
    })
    

    // Guardar elementos en la escena si necesitas destruirlos luego
    scene.questionUI = {
        fondo,
        preguntaText,
        buttons
    }
}

