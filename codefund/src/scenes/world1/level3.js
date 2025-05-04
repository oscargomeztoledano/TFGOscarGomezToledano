import {Scene} from 'phaser';
import { controls } from '../controls';
import { initAnimations, appearance, disappearance, addtoscore, hit } from '../animations';
import { bocadilloCollectible, bocadilloScroll } from '../bocadillo';
import { finalWindow } from '../finalWindow';


export class Level3 extends Scene {

    constructor() {
        super('Level3')
    }

    preload(){}
    create()
     {
        //variables globales
        this.controlEnabled = true
        this.isOverlappingCollectible = false
        this.activeCollectible = null
        this.isOverLappingScroll = false
        this.awaitingAnswer = false
        this.currentLevel = 'Level3'
        this.nextLevel = 'Level4'

        // t0
        this.startTime = this.time.now
        //fondo
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background4').setOrigin(0, 0)
        
        //suelo
        this.floor = this.physics.add.staticGroup()
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5']
        const tileWidth = 48 
        const yPosition = this.scale.height - tileWidth 
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes) // Seleccionar un suelo aleatorio
            this.floor.create(x, yPosition, randomFloor).setOrigin(0, 0).refreshBody()
        }

        //nubes
        let cloud1= 0
        let cloud2= 0
        for (let i = 0; i < this.scale.width; i += 100) {
        this.add.image(cloud1+i,50, 'cloud1').setScale(0.5).setOrigin(0, 0)
        this.add.image(cloud2+i,80, 'cloud2').setScale(0.5).setOrigin(0, 0)
        }
        
        //Título
        this.add.text(16, 16, '1-3. Cofres con acertijo', {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setOrigin(0, 0)

        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE') 

        //grupo para los cofres
        this.chests = this.physics.add.staticGroup()
        const chest1 = this.add.image(400, this.scale.height - tileWidth, 'chest')
            .setOrigin(0, 1)
            .setScale(0.25)
        chest1.id = 'chest2'
        this.chests.add(chest1)

        //Pergamino con las colisiones
        this.scroll= this.physics.add.image(200,this.scale.height-tileWidth,'scroll').setOrigin(0,1)
        const text= 'Este es un nivel con cofres. Cada cofre tiene un acertijo. Resuelve todos para terminar el nivel.'
        //jugador
        this.player = this.physics.add.sprite(100, this.scale.height - tileWidth, 'player_idle')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setScale(2)

        //overlap jugador pergamino
        this.physics.add.overlap(
            this.player,
            this.scroll,
            (player, scroll) => {
                bocadilloScroll(this, text )
            }
        , null, this) 
        
        // collider jugador suelo
        this.physics.add.collider(this.player, this.floor)

        // overlap jugador cofres
        this.physics.add.overlap(this.player, this.chests, (player, chest) => {
            bocadilloCollectible(this, chest)
            this.isOverlappingCollectible = true
            this.activeCollectible = chest
        })

        //listener E
        this.input.keyboard.on('keydown-E', () => {
            if (this.isOverlappingCollectible && !this.awaitingAnswer){
                this.awaitingAnswer = true
                if (this.bocadillo) disappearance(this.bocadillo, this)
                if (this.icon) disappearance(this.icon, this)
            }
        })
    }
    update(){
        if (this.ishit) return
        if (this.controlEnabled) controls(this)
        if (this.awaitingAnswer && this.controlEnabled) {
            this.controlEnabled = false
            initQuestions(this)
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
         // Verificar final del nivel
         const remainingChests = this.chests.getChildren().filter(chest => chest.active).length;
        if (remainingChests === 0 && this.controlEnabled) {
            this.controlEnabled = false
            this.timeTaken = Math.floor((this.time.now - this.startTime) / 1000); // tiempo en segundos
            console.log('Tiempo total:', this.timeTaken, 'segundos');
            console.log('¡Has abierto todos los cofres!');
            finalWindow(this)
        }
    }
}

function initQuestions(scene) {
    const padding = 10;
    const collectible = scene.activeCollectible;
    const id = collectible.id;
    const kahootData = scene.cache.json.get('kahootLevel3');
    const entry = kahootData.anslevel3.find(q => q.id === id);

    if (!entry) {
        console.warn('No se encontraron respuestas para:', id);
        return;
    }

    // Mostrar la pregunta
    const pregunta = entry.question
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
            if (button.isCorrect) {
                console.log('¡Correcto!');
                scene.awaitingAnswer = false;
                addtoscore(100, scene) 
                disappearance(collectible, scene);
                

            } else {
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