import {Scene} from 'phaser';
import { controls } from './controls';
import { initSpritesheet } from './spritesheet';
import { initAnimations, appearance, disappearance, addtoscore } from './animations';
import { createPlatform } from './platforms';

export class Level1 extends Scene
{
    constructor ()
    {
        super('Level1')
    }

    preload ()
    {
        this.load.json('kahootData', 'assets/json/anslevel1.json'); // Asegúrate de que la ruta sea correcta
        this.load.image('background1', '/assets/Backgrounds/1.png')
        this.load.image('floor1', '/assets/floor/floor1.png')
        this.load.image('floor2', '/assets/floor/floor2.png')
        this.load.image('floor3', '/assets/floor/floor3.png')
        this.load.image('floor4', '/assets/floor/floor4.png')
        this.load.image('floor5', '/assets/floor/floor5.png')
        this.load.image('platformL', '/assets/floor/platformL.png')
        this.load.image('platformR', '/assets/floor/platformR.png')
        this.load.image('cloud1', '/assets/enviroments/cloud1.png')
        this.load.image('cloud2', '/assets/enviroments/cloud2.png')
        this.load.image('tile3', '/assets/ui/tiles/tile3.png')
        this.load.image('tile4', '/assets/ui/tiles/tile4.png')
        this.load.image('E0', '/assets/ui/keyboard/keyboard_e.png')
        this.load.image('E1', '/assets/ui/keyboard/keyboard_e_outline.png')
        this.load.image('ans0', '/assets/ui/tiles/ans0.png')
        this.load.image('ans1', '/assets/ui/tiles/ans1.png')
        this.load.image('ans2', '/assets/ui/tiles/ans2.png')
        this.load.image('ans3', '/assets/ui/tiles/ans3.png')
        this.load.image('cross', '/assets/ui/tiles/icon_cross.png')
        initSpritesheet( this ) // Inicializar spriteeets     });
    }
    create()
    {
        this.isOverlappingCollectible = false;
        this.activeCollectible = null;
        this.isOverLappingCheckpoint = false;
        this.controlEnabled = true;
        this.awaitingAnswer = false;
        this.ishit=false;

        //init de las animaciones
        initAnimations(this) 

        //fondo 64x64 hasta rellenar todo el lienzo
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background1').setOrigin(0, 0)

        this.floor = this.physics.add.staticGroup()
        // Lista de IDs de los suelos
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5']
        const tileWidth = 48 // Ancho de cada bloque de suelo
        const yPosition = this.scale.height - tileWidth // Posición vertical del suelo
        // Crear el suelo rellenando horizontalmente con bloques aleatorios
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes) // Seleccionar un suelo aleatorio
            this.floor.create(x, yPosition, randomFloor).setOrigin(0, 0).refreshBody()
        }
        // Crear plataformas
        createPlatform(this)
        
        //crear nubes en la parte superior de la pantalla
        let cloud1= 0
        let cloud2= 0
        for (let i = 0; i < this.scale.width; i += 100) {
        this.add.image(cloud1+i,50, 'cloud1').setScale(0.5).setOrigin(0, 0)
        this.add.image(cloud2+i,80, 'cloud2').setScale(0.5).setOrigin(0, 0)
        }

        // Crear el nombre del nivel 
        this.add.text(16, 16, '1-1. Variables', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setOrigin(0, 0)

        // Crear el jugador
        this.player = this.physics.add.sprite(100, this.scale.height - tileWidth, 'player_idle')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setScale(2)
        // Añadir colisiones entre el jugador y el suelo
        this.physics.add.collider(this.player, this.floor)

        // Creación del checkpoint
        this.checkpoint = this.physics.add.sprite(950, this.scale.height - tileWidth, 'checkpoint1').setOrigin(0, 1)
        // añadido colisiones entre el jugador y el checkpoint
        this.physics.add.overlap(this.player, this.checkpoint, (player, checkpoint) => {
            if (this.collection.countActive(true) > 0) {
                if (!this.bocadillo) {
                this.isOverLappingCheckpoint = true;
                const padding = 10;
                this.message = this.add.text(0, 0, 'Todavía quedan variables por recoger', {
                    fontFamily: 'Arial', fontSize: 14, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 2
                }).setOrigin(0.5, 0.5);

                const w = this.message.displayWidth + (padding * 2);
                const h = this.message.displayHeight + (padding * 2);

                this.bocadillo = this.add.nineslice(
                    this.checkpoint.x-55, this.checkpoint.y - 100,
                    'tile3', 0, w, h, 10, 10, 10, 10
                );

                this.message.setDepth(this.bocadillo.depth + 1);
                this.message.setPosition(
                    this.bocadillo.x,
                    this.bocadillo.y
                );

                appearance(this.bocadillo, this, 0);
                appearance(this.message, this, 50);
                }
            }
        }, null, this)

        //creación de objetos coleccionables
        this.collection = this.physics.add.staticGroup()

        const holatext = this.add.text(350, 550, 'hola', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 1)
        const mundotext = this.add.text(250, 350, 'mundo', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 1)
        const int = this.add.text(610, 250, '200', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 1)
        const double = this.add.text(790, 250, '30,5', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 1)
        const bool1 = this.add.text(655, 450, 'True', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 1)
        const bool2 = this.add.text(800, 450, '0', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 1)
        // Añadir los textos al grupo de coleccionables
        this.collection.add(holatext)
        this.collection.add(mundotext)
        this.collection.add(int)
        this.collection.add(double) 
        this.collection.add(bool1)
        this.collection.add(bool2)

        // Añadir colisiones entre el jugador y los objetos coleccionables
        this.physics.add.overlap(this.player, this.collection, (player, collectible) => {
            if (!this.bocadillo) {
                this.isOverlappingCollectible = true;
                this.activeCollectible = collectible;

                const padding = 10
                this.icon = this.add.sprite(0, 0, 'E0').setScale(0.5)
                const w = this.icon.displayWidth + (padding * 2)
                const h = this.icon.displayHeight + (padding * 2)

                this.bocadillo = this.add.nineslice(
                    collectible.x+(collectible.width/2), collectible.y - 80,
                    'tile3', 0, w, h, 10, 10, 10, 10
                )
                this.icon.setDepth(this.bocadillo.depth + 1)
                
                this.icon.setPosition(
                    this.bocadillo.x,
                    this.bocadillo.y
                )
                appearance(this.bocadillo, this, 0)
                appearance(this.icon, this, 50)

                this.icon.anims.play('press_e', true)
                this.input.keyboard.on('keydown-E', () => {
                    disappearance(this.bocadillo, this)
                    disappearance(this.icon, this)
                    this.awaitingAnswer = true
                });
            }
        }, null, this)

    
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
        // inicio de la animación del checkpoint
        this.checkpoint.anims.play('checkpoint1anims', true) 
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
        // Comprobamos si el jugador ha salido del checkpoint
        if (this.isOverLappingCheckpoint) {
            const stillOverlapping = this.physics.overlap(this.player, this.checkpoint)

            if (!stillOverlapping) {
                // Simulamos overlapend
                disappearance(this.bocadillo, this)
                disappearance(this.message, this)
                this.message = null
                this.bocadillo = null
                this.isOverLappingCheckpoint = false
            }
        }
    }

}

function initQuestions(scene) {
    const padding = 10;
    const collectible = scene.activeCollectible;
    const id = collectible.text;
    const kahootData = scene.cache.json.get('kahootData');
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
        'tile4', 0,
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
                addtoscore(100, collectible, scene) 
                disappearance(collectible, scene);

            } else {
                scene.ishit=true
                //animacion golpe
                scene.player.anims.play('player-hit', true)
                // x indicando el error
                const xSprite=scene.add.sprite(
                    collectible.x+collectible.width/2, 
                    collectible.y-collectible.height, 
                    'cross').setScale(2)
                xSprite.setDepth(1000)
                scene.tweens.add({
                    targets: xSprite,
                    y: xSprite.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power1',
                    onComplete: () => {
                        xSprite.destroy();
                    }
                });

                // capturamos cuando la animacion termine y llamamos a controls
                scene.player.once('animationcomplete-player-hit',() => {
                    scene.ishit=false
                    controls(scene)
                })                
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

