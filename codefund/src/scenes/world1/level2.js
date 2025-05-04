import { Scene } from "phaser"
import { controls } from "../controls"
import { platforms2 } from "../platforms"
import { appearance, disappearance, hit } from "../animations"
import { bocadilloCollectible, bocadilloCheckPoint, bocadilloScroll } from "../bocadillo"
import { crearFormula, generarComponente, checkformula } from "../formula"
import { finalWindow } from "../finalWindow"


export class Level2 extends Scene {
    constructor() {
        super("Level2")
    }

    preload(){
        
    }
    create() {
        this.formulaLength = 5
        this.formulaResult = 10
        this.controlEnabled = true
        this.isOverlappingCollectible = false
        this.activeCollectible = null
        this.isOverLappingCheckpoint = false
        this.isOverLappingScroll = false
        this.currentLevel = 'Level2'
        this.nextLevel = 'Level3'
        this.ishit=false

        this.startTime = this.time.now

        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background3').setOrigin(0, 0)

        //creacion del suelo 
        this.floor = this.physics.add.staticGroup()
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5']
        const tileWidth = 48 
        const yPosition = this.scale.height - tileWidth 
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes) // Seleccionar un suelo aleatorio
            this.floor.create(x, yPosition, randomFloor).setOrigin(0, 0).refreshBody()
        }
        //creacion de plataformas
        platforms2({floor: this.floor})
        //creación nubes
        let cloud1= 0
        for (let i = 0; i < this.scale.width; i += 100) {
        this.add.image(cloud1+i,50, 'cloud1').setScale(0.5).setOrigin(0, 0)
        }
        //titulo nivel
        this.add.text(16, 16, '1-2. Formula', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setOrigin(0, 0)

        //creación del jugador
        this.player = this.physics.add.sprite(100, this.scale.height - tileWidth, 'player_idle')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setScale(2)
        //colisión entre el jugador y el suelo
        this.physics.add.collider(this.player, this.floor)

        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE') 

        //grupo estático para los collecionables
        this.collection = this.physics.add.staticGroup()
        this.componentes = [
            { x: 455, y: 575, value: '2' },
            { x: 530, y: 575, value: '%' },
            { x: 620, y: 575, value: '*' },
            { x: 105, y: 450, value: '3' },
            { x: 180, y: 450, value: '6' },
            { x: 270, y: 450, value: '+' },
            { x: 705, y: 400, value: '4' },
            { x: 780, y: 400, value: '5' },
            { x: 870, y: 400, value: '-' },
            { x: 200, y: 300, value: '7' },
            { x: 275, y: 300, value: '8' },
            { x: 330, y: 300, value: '9' },
            { x: 410, y: 300, value: '/' }
        ];

        generarComponente(this);
        
        //colisión entre el jugador y los collecionables
        this.physics.add.overlap(
            this.player, 
            this.collection, 
            (player, collectible) => {
                bocadilloCollectible(this,collectible)
                this.isOverlappingCollectible = true
                this.activeCollectible = collectible
   
                
            }, null, this)
            
        //chechpoint
        this.checkpoint = this.physics.add.sprite(950, this.scale.height - tileWidth, 'checkpoint1').setOrigin(0, 1)
        this.physics.add.overlap(
            this.player,
            this.checkpoint,
            (player, checkpoint) => {
                bocadilloCheckPoint(this, 'Presiona', 'para comprobar la fórmula')
            }, null, this)
        

        this.scroll= this.physics.add.image(200,this.scale.height-tileWidth,'scroll').setOrigin(0,1)
        const text= 'Este es un nivel con fórmula. Debe rellenar los huecos con números y operadores. En este nivel el resutlado pedido es '+ this.formulaResult +'.'
        this.physics.add.overlap(
            this.player,
            this.scroll,
            (player, scroll) => {
                bocadilloScroll(this, text )
            }
        , null, this) 
        // Que sucede cuando se pulsa E
        this.input.keyboard.on('keydown-E', () => {
            
            if (this.isOverlappingCollectible && this.activeCollectible) {
                console.log(this.activeCollectible.text)
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
                            fontFamily: 'Arial',
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
            if (this.isOverLappingCheckpoint) {
                disappearance(this.bocadillo, this)
                disappearance(this.icon, this)
                disappearance(this.textBefore, this)
                disappearance(this.textAfter, this)
                const esCorrecta= checkformula(this)
                if (this.formula && this.formula.length > 0) {
                    for (let i = this.formulaLength - 1; i >= 0; i--) {
                        if (this.formula[i] !== null) {
                            this.formula[i] = null; // Limpiar el hueco
                            this.formulaTexts[i].destroy(); // Destruir el texto
                            this.formulaTexts[i] = null; // Limpiar la referencia
                    }}
                }
                if (esCorrecta && this.controlEnabled){
                    
                    console.log('la formula esta ok')
                    this.controlEnabled=false
                    this.timeTaken = Math.floor((this.time.now - this.startTime) / 1000); // tiempo en segundos
                    finalWindow(this)
                }
                    else {
                        hit(this)
                        generarComponente(this)
                        console.log('la formula no es correcta')
                    }
            }
        });
        this.input.keyboard.on('keydown-BACKSPACE', () => {
            console.log('backspace')
            if (this.formula && this.formula.length > 0) {
                for (let i = this.formulaLength - 1; i >= 0; i--) {
                    if (this.formula[i] !== null) {
                        this.formula[i] = null; // Limpiar el hueco
                        this.formulaTexts[i].destroy(); // Destruir el texto
                        this.formulaTexts[i] = null; // Limpiar la referencia
                        break;
                    }
                }
            }
        })
        crearFormula(this)

        
    }
    update() {
        if (this.ishit) return
        if (this.controlEnabled) {
            controls(this)
        }
        if (this.isOverlappingCollectible && this.activeCollectible) {
            const stillOverlapping = this.physics.overlap(this.player, this.activeCollectible);

            if (!stillOverlapping) {
                // Simulamos overlapend
                disappearance(this.bocadillo, this)
                disappearance(this.icon, this)

                this.bocadillo = null
                this.icon = null
                this.activeCollectible = null
                this.isOverlappingCollectible = false
            }
        } 

        this.checkpoint.anims.play('checkpoint1anims', true) 
        if (this.isOverLappingCheckpoint) {
            const stillOverlapping = this.physics.overlap(this.player, this.checkpoint);

            if (!stillOverlapping) {
                disappearance(this.bocadillo, this)
                disappearance(this.icon, this)
                disappearance(this.textBefore, this)
                disappearance(this.textAfter, this)
                this.bocadillo = null
                this.icon = null
                this.textBefore = null
                this.textAfter = null
                this.isOverLappingCheckpoint = false
            }
        }

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
       
    }
}

