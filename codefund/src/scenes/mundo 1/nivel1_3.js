import { Scene } from "phaser"
import { controls } from "../../utils/controls"
import { platforms2 } from "../../utils/platforms"
import { disappearance, hit } from "../../utils/animations"
import { bocadilloCollectible, bocadilloCheckPoint, bocadilloScroll } from "../../utils/bocadillo"
import { crearFormula, generarComponente, checkformula } from "../../utils/formula"
import { successWindow, failureWindow } from "../windows/finalWindow"
import { crearVidas, quitarvida } from "../../utils/vidas"
import { menuPause } from "../windows/menuPause"

let startTimeM1L1_3 = 0

export class mundo1nivel1_3 extends Scene {
    constructor() {
        super('mundo 1'+'nivel1_3')
    }

    create() {
        
                // Variables globales
                this.formulaLength = 5
                this.formulaResult = 12
                this.controlEnabled = true
                this.isOverlappingCollectible = false
                this.activeCollectible = null
                this.isOverLappingCheckpoint = false
                this.isOverLappingScroll = false
                this.currentLevel = 'mundo 1'+'nivel1_3'
                this.nextLevel = 'mundo 1'+'nivel1_4'
                this.ishit=false
                this.currentWorldIndex = 0
                this.currentLevelIndex = 2

                // t0
                startTimeM1L1_3 = Date.now()

                this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background3').setOrigin(0, 0)

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

                // Plataformas
                platforms2({floor: this.floor})
                
                // Vidas
                crearVidas(this)
                
                //Título
                this.add.text(16, 16, '2-1. Nivel con Formula I', {
                    fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 8,
                    align: 'left'
                }).setOrigin(0, 0)
                this.add.image(25, 55, 'logo').setOrigin(0, 0).setScale(0.25)

                // Jugador
                const usuario = JSON.parse(localStorage.getItem('usuario'))
                this.player = this.physics.add.sprite(100, this.scale.height - tileWidth*2, `player_idle${usuario.avatar}`)
                .setOrigin(0, 1)
                .setCollideWorldBounds(true)
                .setGravityY(300)
                .setScale(2)

                //colisión Jugador y el Suelo
                this.physics.add.collider(this.player, this.floor)

                this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE') 

                // Collecionables
                this.collection = this.physics.add.staticGroup()
                this.componentes = [
                    { x: 460, y: 525, value: '2' },
                    { x: 530, y: 525, value: '%' },
                    { x: 620, y: 525, value: '*' },
                    { x: 115, y: 400, value: '3' },
                    { x: 860, y: this.scale.height-tileWidth*2, value: '6' },
                    { x: 260, y: 400, value: '+' },
                    { x: 705, y: this.scale.height-tileWidth*2, value: '4' },
                    { x: 710, y: 350, value: '2' },
                    { x: 860, y: 350, value: '5' },
                    { x: 500, y: this.scale.height-tileWidth*2, value: '(' },
                    { x: 250, y: 250, value: '8' },
                    { x: 330, y: this.scale.height-tileWidth*2, value: ')' },
                    { x: 410, y: 250, value: '/' }
                ];

                generarComponente(this);
                
                //colisión Jugador y los Collecionables
                this.physics.add.overlap(
                    this.player, 
                    this.collection, 
                    (player, collectible) => {
                        bocadilloCollectible(this,collectible)
                        this.isOverlappingCollectible = true
                        this.activeCollectible = collectible
        
                        
                    }, null, this)
                    
                // Chechpoint
                this.checkpoint = this.physics.add.sprite(950, this.scale.height - tileWidth*2, 'checkpoint1').setOrigin(0, 1)
                this.physics.add.overlap(
                    this.player,
                    this.checkpoint,
                    (player, checkpoint) => {
                        bocadilloCheckPoint(this, 'para comprobar la fórmula')
                    }, null, this)
                
                // Scroll
                this.scroll= this.physics.add.image(200,this.scale.height-tileWidth*2,'scroll1').setOrigin(0,1)
                const text= 'Este es un nivel con fórmula. Debe rellenar todos los huecos con números u operadores. En este nivel el resutlado pedido es '+ this.formulaResult +'.'
                this.physics.add.overlap(
                    this.player,
                    this.scroll,
                    (player, scroll) => {
                        bocadilloScroll(this, text )
                    }
                , null, this) 

                // Listener para E
                this.input.keyboard.on('keydown-E', () => {
                    
                    // Collecionables
                    if (this.isOverlappingCollectible && this.activeCollectible) {
                        const tileSize = 32;
                        const gap = 10;
                        const y = 150;
                        const startX = this.scale.width / 2 - ((tileSize + gap) * this.formulaLength) / 2;

                        for (let i = 0; i < this.formulaLength; i++) {
                            if (this.formula[i] === null) {
                                this.formula[i] = this.activeCollectible.text; // Asignar el valor al hueco

                                const x = startX + i * (tileSize + gap);
                                const txt = this.add.text(x, y, this.activeCollectible.text, {
                                    fontSize: '20px',
                                    fontFamily: 'Arial Black',
                                    color: '#ffffff',
                                    stroke: '#000000',
                                    strokeThickness: 3
                                }).setOrigin(0.5);

                                this.formulaTexts[i] = txt;
                                disappearance(this.activeCollectible, this)

                                break;
                            }
                        }

                        // Limpiar tooltip
                        disappearance(this.bocadillo, this);
                        disappearance(this.icon, this);
                        this.bocadillo = null;
                        this.icon = null;
                        this.activeCollectible = null;
                        this.isOverlappingCollectible = false;
                    }
                    // Checkpoint
                    else if (this.isOverLappingCheckpoint) {
                        disappearance(this.bocadillo, this)
                        disappearance(this.icon, this)
                        disappearance(this.textAfter, this)
                        const esCorrecta= checkformula(this)
                        
                        if (esCorrecta && this.controlEnabled && !this.formula.includes(null)){
                            this.controlEnabled=false
                            const timeTaken = Math.floor((Date.now() - startTimeM1L1_3) / 1000); // tiempo en segundos
                            successWindow(this, timeTaken,300)
                        }
                            else {
                                quitarvida(this)
                                hit(this)
                                this.collection.clear(true, true);
                                generarComponente(this)
                            }
                        if (this.formula && this.formula.length > 0) {
                            for (let i = this.formulaLength - 1; i >= 0; i--) {
                                if (this.formula[i] !== null) {
                                    this.formula[i] = null; 
                                    this.formulaTexts[i].destroy(); 
                                    this.formulaTexts[i] = null; 
                            }}
                        }
                    }
                });

                // Listener BACKSPACE
                this.input.keyboard.on('keydown-BACKSPACE', () => {
                    if (this.formula && this.formula.length > 0) {
                        for (let i = this.formulaLength - 1; i >= 0; i--) {
                            if (this.formula[i] !== null) {
                                this.formula[i] = null; 
                                this.formulaTexts[i].destroy(); 
                                this.formulaTexts[i] = null; 
                                break;
                            }
                        }
                    }
                })

                // Listener ESC
                this.input.keyboard.on('keydown-ESC', () => {
                    if (this.controlEnabled) {
                        this.controlEnabled = false
                        menuPause(this, usuario)
                    }
                })
                crearFormula(this)
    }
    update() {
        if (this.ishit) return

        if (this.controlEnabled) {
            controls(this)
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

        // Controlar NO overlapping checkpoint
        this.checkpoint.anims.play('checkpoint1anims', true) 
        if (this.isOverLappingCheckpoint) {
            const stillOverlapping = this.physics.overlap(this.player, this.checkpoint);

            if (!stillOverlapping) {
                disappearance(this.bocadillo, this)
                disappearance(this.icon, this)
                disappearance(this.textAfter, this)
                this.bocadillo = null
                this.icon = null
                this.textAfter = null
                this.isOverLappingCheckpoint = false
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

        // Comprobar Game Over
        if(this.vidas <= 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeM1L1_3)/1000); 
            failureWindow(this, timeTaken)
        }
       
    }
}

