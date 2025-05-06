import {Scene} from 'phaser';
import { controls } from '../controls';
import { initAnimations, appearance, disappearance, addtoscore, hit } from '../animations';
import { platforms1 } from '../platforms';
import { bocadilloCollectible, bocadilloScroll} from "../bocadillo"
import { successWindow, failureWindow } from '../finalWindow';
import { generarComponente } from '../formula';
import { crearVidas, quitarvida } from '../vidas';
import { menuPause } from '../menuPause';
let startTimeL1 = 0
export class Level1 extends Scene
{
    constructor ()
    {
        super('Level1')
    }

    preload ()
    {
        
    }
    create()
    {
        this.isOverlappingCollectible = false
        this.isOverLappnigScroll = false
        this.activeCollectible = null
        this.isOverLappingCheckpoint = false
        this.controlEnabled = true
        this.awaitingAnswer = false
        this.ishit=false
        this.currentLevel = 'Level1'
        this.nextLevel = 'Level2'
        startTimeL1 = Date.now()

        //fondo 64x64 hasta rellenar todo el lienzo
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background1').setOrigin(0, 0)

        this.floor = this.physics.add.staticGroup()
        // Lista de IDs de los suelos
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5']
        const tileWidth = 48 
        const yPosition = this.scale.height - tileWidth 
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes) // Seleccionar un suelo aleatorio
            this.floor.create(x, yPosition, randomFloor).setOrigin(0, 0).refreshBody()
        }
        //  Plataformas
        platforms1(this)
        
        // Nubes 
        let cloud1= 0
        let cloud2= 0
        for (let i = 0; i < this.scale.width; i += 100) {
        this.add.image(cloud1+i,50, 'cloud1').setScale(0.5).setOrigin(0, 0)
        this.add.image(cloud2+i,80, 'cloud2').setScale(0.5).setOrigin(0, 0)
        }

        // Vidas
        crearVidas(this)

        // Nombre del nivel 
        this.add.text(16, 16, '1-1. Variables', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setOrigin(0, 0)

        //  jugador
        this.player = this.physics.add.sprite(100, this.scale.height - tileWidth, 'player_idle')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setScale(2)

        //Pergamino con las colisiones
        this.scroll= this.physics.add.image(200,this.scale.height-tileWidth,'scroll').setOrigin(0,1)
        const text= 'Este es un nivel de variables. Cada variable tiene una manera de guardarse. Resuelve todos los acertijos para terminar el nivel.'
        //overlap jugador pergamino
        this.physics.add.overlap(
            this.player,
            this.scroll,
            (player, scroll) => {
                bocadilloScroll(this, text )
            }
        , null, this) 

        // Añadir colisiones entre el jugador y el suelo
        this.physics.add.collider(this.player, this.floor)

        //creación de objetos coleccionables
        this.collection = this.physics.add.staticGroup()

        this.componentes = [
            { x: 350, y: 550, value: 'hola' },
            { x: 250, y: 350, value: 'mundo' },
            { x: 610, y: 250, value: '200' },
            { x: 790, y: 250, value: '30,5' },
            { x: 655, y: 450, value: 'True' },
            { x: 800, y: 450, value: '0' }
        ]

        generarComponente(this)


        // Añadir colisiones entre el jugador y los objetos coleccionables
        this.physics.add.overlap(this.player, this.collection, (player, collectible) => {
            if (!this.bocadillo&&!this.awaitingAnswer)
            bocadilloCollectible(this, collectible)
            this.isOverlappingCollectible = true
            this.activeCollectible = collectible
        }, null, this)

        this.input.keyboard.on('keydown-E', () => {
                if (this.isOverlappingCollectible && !this.awaitingAnswer) {
                    this.awaitingAnswer = true
                    if (this.bocadillo) disappearance(this.bocadillo, this)
                    if (this.icon) disappearance(this.icon, this)
                }     
        });
        this.input.keyboard.on('keydown-ESC', () => {
            if (this.awaitingAnswer && !this.controlEnabled) {
            this.awaitingAnswer = false
            this.controlEnabled = true

            // Desaparecer elementos de la pregunta
            if (this.questionUI) {
                disappearance(this.questionUI.fondo, this)
                disappearance(this.questionUI.preguntaText, this)
                this.questionUI.buttons.forEach(b => {
                disappearance(b.button, this)
                disappearance(b.text, this)
                });
                this.questionUI = null
            }
            }
            if (!this.awaitingAnswer && this.controlEnabled) {
                this.controlEnabled = false
                menuPause(this)
            }
        });

        // Añadir controles WASD y espacio
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE') 
        
    }
    update()
    {
        if (this.ishit) return
        if(this.awaitingAnswer && this.controlEnabled){
            this.controlEnabled = false
            initQuestions(this)
        }
        if(this.controlEnabled) {
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
        //Verificar final del nivel 
        const remainingCollectibles = this.collection.getChildren().filter(collectible => collectible.active).length
        if (remainingCollectibles === 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeL1) / 1000); // tiempo en segundos
            successWindow(this, timeTaken)
        }
        // Comprobar Game Over
        if(this.vidas <= 0 && this.controlEnabled) {
            this.controlEnabled = false
            const timeTaken = Math.floor((Date.now() - startTimeL1)/1000); // tiempo en segundos
            failureWindow(this, timeTaken)
        }
    }

}

function initQuestions(scene) {
    const padding = 10;
    const collectible = scene.activeCollectible;
    const id = collectible.text;
    const kahootData = scene.cache.json.get('kahootLevel1');
    const entry = kahootData.anslevel1.find(q => q.id === id);

    if (!entry) {
        console.warn('No se encontraron respuestas para:', id);
        return;
    }

    // Mostrar la pregunta
    const pregunta = '¿Cómo guardarías la variable "' + id + '"?';
    const preguntaText = scene.add.text(scene.scale.width / 2, 100, pregunta, {
        fontSize: '18px',
        color: '#000',
        wordWrap: { width: 400 },
        align: 'center',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    const fondo = scene.add.nineslice(
        scene.scale.width / 2, 100,
        'tile0', 0,
        preguntaText.width + padding * 2,
        preguntaText.height + padding * 2,
        14, 14, 14, 14
    ).setOrigin(0.5);

    preguntaText.setDepth(fondo.depth + 1);

    // Crear los botones de respuesta
    const respuestas = entry.answers;
    const buttons = [];
    appearance(fondo, scene, 0);
    appearance(preguntaText, scene, 50);

    respuestas.forEach((respuesta, index) => {
        // Distribución en cuadrícula 2x2
        const col = index % 2; // 0 o 1
        const row = Math.floor(index / 2); // 0 o 1
    
        const spacingX = 125; // espacio horizontal entre botones
        const spacingY = 125; // espacio vertical entre botones
    
        const baseX = scene.scale.width / 2;
        const baseY = 220;
    
        const posX = baseX + (col === 0 ? -spacingX / 2 : spacingX / 2);
        const posY = baseY + row * spacingY;
        const tileKey = 'ans' + index;
    
        const button = scene.add.sprite(posX, posY, tileKey)
            .setInteractive({ useHandCursor: true })
            .setScale(2) // Más grande para texto
            .setOrigin(0.5);
    
        const text = scene.add.text(posX, posY, respuesta.body, {
            fontSize: '16px',
            color: '#000',
            wordWrap: { width: 110, useAdvancedWrap: true  }, // más espacio
            align: 'center',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    
        button.isCorrect = respuesta.isCorrect;
    
        // Animaciones de aparición
        appearance(button, scene, 50 + index * 50);
        appearance(text, scene, 50 + index * 50);
    
        button.on('pointerdown', () => {
            console.log('Respuesta seleccionada:', respuesta.body);
            if (button.isCorrect) {
                console.log('¡Correcto!');
                scene.awaitingAnswer = false;
                addtoscore(100, scene) 
                disappearance(collectible, scene);

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
    
        buttons.push({ button, text });
    });
    

    // Guardar elementos en la escena si necesitas destruirlos luego
    scene.questionUI = {
        fondo,
        preguntaText,
        buttons
    };
}

