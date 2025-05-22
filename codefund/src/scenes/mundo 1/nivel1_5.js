import {Scene} from 'phaser';
import { controls } from '../utils/controls';
import { initAnimations, appearance, disappearance, addtoscore, hit } from '../utils/animations';
import { bocadilloCollectible, bocadilloScroll } from '../utils/bocadillo';
import { successWindow, failureWindow } from '../utils/finalWindow';
import { crearVidas, quitarvida } from '../utils/vidas';
import { menuPause } from '../utils/menuPause';
import { platforms3_1 } from '../utils/platforms';
import { generarCofre } from '../utils/formula';
let startTimeM1L1_5 = 0
export class mundo1nivel1_5 extends Scene {

    constructor() {
        super('mundo 1'+'nivel1_5')
    }

    preload(){}
    create()
     {
        // Variables globales
        this.controlEnabled = true
        this.isOverlappingCollectible = false
        this.activeCollectible = null
        this.isOverLappingScroll = false
        this.awaitingAnswer = false
        this.currentLevel = 'mundo 1'+'nivel1_5'
        this.nextLevel = 'mundo 1'+'nivel1_6'
        this.currentWorldIndex = 0
        this.currentLevelIndex = 4
        // t0
        startTimeM1L1_5 = Date.now()

        // Fondo
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background4').setOrigin(0, 0)
        
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

        // // Nubes
        // let cloud1= 0
        // let cloud2= 0
        // for (let i = 0; i < this.scale.width; i += 100) {
        // this.add.image(cloud1+i,50, 'cloud1').setScale(0.5).setOrigin(0, 0)
        // this.add.image(cloud2+i,80, 'cloud2').setScale(0.5).setOrigin(0, 0)
        // }
        platforms3_1({floor: this.floor})
        // Vidas
        crearVidas(this)
        
        // Título
        this.add.text(16, 16, '1-3. Cofres con acertijo', {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setOrigin(0, 0)
        this.add.image(25, 55, 'logo').setOrigin(0, 0).setScale(0.25)
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE') 

        // Cofres
        this.chests = this.physics.add.staticGroup()
        this.cofres = [
            { x: 700, y: 450, id: 'chest1' },
            { x: 300, y: 350, id: 'chest2' },
            { x: 700, y: 250, id: 'chest3' },
            { x: 800, y: this.scale.height - tileWidth*2, id: 'chest4' },
        ]
        generarCofre(this)
       

        // Jugador
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        this.player = this.physics.add.sprite(100, this.scale.height - tileWidth*2, `player_idle${usuario.avatar}`)
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setScale(2)
        // Colisión Jugador y el Suelo
        this.physics.add.collider(this.player, this.floor)

        // Scroll
        this.scroll= this.physics.add.image(200,this.scale.height-tileWidth*2,'scroll1').setOrigin(0,1)
        const text= '¿Sabías que los cofres pueden contener acertijos?. Resuelve todos los acertijos para abrir todos los cofres y terminar el nivel.'
        this.physics.add.overlap(
            this.player,
            this.scroll,
            (player, scroll) => {
                bocadilloScroll(this, text )
            }
        , null, this) 
        
    
        // Overlap jugador cofres
        this.physics.add.overlap(this.player, this.chests, (player, chest) => {
            bocadilloCollectible(this, chest)
            this.isOverlappingCollectible = true
            this.activeCollectible = chest
        })

        // Listener E
        this.input.keyboard.on('keydown-E', () => {
            if (this.isOverlappingCollectible && !this.awaitingAnswer){
                this.player.anims.play('player_idle', true)
                this.awaitingAnswer = true
                if (this.bocadillo) disappearance(this.bocadillo, this)
                if (this.icon) disappearance(this.icon, this)
            }
        })

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
                menuPause(this, usuario)
            }
            
        });
    }

    update(){
        if (this.ishit) return

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

        // Verificar final nivel
        const remainingChests = this.chests.getChildren().filter(chest => chest.active).length;
        if (remainingChests === 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeM1L1_5)/1000)
            successWindow(this, timeTaken,400)
        }
        
        // Comprobar Game Over
        if(this.vidas <= 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeM1L1_5)/1000)
            failureWindow(this, timeTaken)
        }

    }
}

function initQuestions(scene) {
    const padding = 10;
    const collectible = scene.activeCollectible;
    const id = collectible.id;
    const kahootData = scene.cache.json.get('kahootLevel1_5');
    const entry = kahootData.anslevel1_5.find(q => q.id === id);

    if (!entry) {
        console.warn('No se encontraron respuestas para:', id);
        return;
    }

    // Mostrar la pregunta
    const pregunta = entry.question
    const preguntaText = scene.add.text(scene.scale.width / 2, 130, pregunta, {
        fontSize: '18px',
        color: '#fff',
        wordWrap: { width: 400 },
        align: 'center',
        stroke: '#000000',
        strokeThickness: 2,
        fontFamily: 'Arial Black'
    }).setOrigin(0.5);

    const fondo = scene.add.nineslice(
        scene.scale.width / 2, 130,
        'marco3', 0,
        preguntaText.width + padding * 2,
        preguntaText.height + padding * 2,
        10, 10, 10, 10
    ).setOrigin(0.5)

    preguntaText.setDepth(fondo.depth + 1);

    const respuestas = entry.answers;
    const buttons = [];
    appearance(fondo, scene, 0);
    appearance(preguntaText, scene, 50);

    // Un botón por cada respuesta
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
        }).setOrigin(0.5);
    
        button.isCorrect = respuesta.isCorrect
    
        appearance(button, scene, 50 + index * 50)
        appearance(text, scene, 50 + index * 50)
    
        button.on('pointerdown', () => {
            if (button.isCorrect) {
                console.log('¡Correcto!')
                scene.awaitingAnswer = false
                addtoscore(100, scene) 
                disappearance(collectible, scene)
                

            } else {
                quitarvida(scene)
                hit(scene)             
                console.log('Incorrecto.');
                scene.awaitingAnswer = false
            }
    
            if (!scene.awaitingAnswer) {
                scene.controlEnabled = true
                disappearance(fondo, scene);
                disappearance(preguntaText, scene);
                buttons.forEach(b => {
                    disappearance(b.button, scene);
                    disappearance(b.text, scene);
                });
            }
        });
        button.on('pointerover', () => {
            button.setScale(1.1);
            text.setScale(1.1);
        });
        button.on('pointerout', () => {
            button.setScale(1);
            text.setScale(1);
        });
    
        buttons.push({ button, text });
    });
    

    scene.questionUI = {
        fondo,
        preguntaText,
        buttons
    };
}