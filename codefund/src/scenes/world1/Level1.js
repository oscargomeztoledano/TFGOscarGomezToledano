import {Scene} from 'phaser';
import { createPlatform } from './platforms';

export class Level1 extends Scene
{
    constructor ()
    {
        super('Level1')
    }

    preload ()
    {
        this.load.image('background1', '/assets/world1/Backgrounds/1.png');
        this.load.image('floor1', '/assets/world1/floor/floor1.png');
        this.load.image('floor2', '/assets/world1/floor/floor2.png');
        this.load.image('floor3', '/assets/world1/floor/floor3.png');
        this.load.image('floor4', '/assets/world1/floor/floor4.png');
        this.load.image('floor5', '/assets/world1/floor/floor5.png');
        this.load.image('platformL', '/assets/world1/floor/platformL.png');
        this.load.image('platformR', '/assets/world1/floor/platformR.png');
        this.load.image('cloud1', '/assets/world1/enviroments/cloud1.png');
        this.load.image('cloud2', '/assets/world1/enviroments/cloud2.png');

        // Evento para depuración
        this.load.on('filecomplete', (key) => {
            console.log(`Archivo cargado: ${key}`);
        });
    }
    create()
    {
        //fondo 64x64 hasta rellenar todo el lienzo
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background1').setOrigin(0, 0);
        this.floor = this.physics.add.staticGroup();

        // Crear plataformas
        createPlatform(this)

        // Crear el suelo
        // Lista de IDs de los suelos
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5'];
        const tileWidth = 48; // Ancho de cada bloque de suelo
        const yPosition = this.scale.height - tileWidth; // Posición vertical del suelo

        // Crear el suelo rellenando horizontalmente con bloques aleatorios
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes); // Seleccionar un suelo aleatorio
            this.floor.create(x, yPosition, randomFloor).setOrigin(0, 0).refreshBody();
        }

        //crear nubes en la parte superior de la pantalla
        let cloud1= 0
        let cloud2= 0
        for (let i = 0; i < this.scale.width; i += 100) {
        this.add.image(cloud1+i,20, 'cloud1').setScale(0.5).setOrigin(0, 0)
        this.add.image(cloud2+i,50, 'cloud2').setScale(0.5).setOrigin(0, 0)
        }
    }
    update()
    {
       
    }
}