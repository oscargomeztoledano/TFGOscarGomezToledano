import {Scene} from 'phaser';


export class Level1 extends Scene
{
    constructor ()
    {
        super('Level1')
    }

    preload ()
    {
        this.load.image('background1', '/assets/world1/Backgrounds/1.png');
        this.load.spritesheet('nature', '/assets/world1/enviroments/gamekit1.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('floor1', '/assets/world1/floor/floor1.png');
        this.load.image('floor2', '/assets/world1/floor/floor2.png');
        this.load.image('floor3', '/assets/world1/floor/floor3.png');
        this.load.image('floor4', '/assets/world1/floor/floor4.png');
        this.load.image('floor5', '/assets/world1/floor/floor5.png');
        this.load.image('platformL', '/assets/world1/floor/platformL.png');
        this.load.image('platformR', '/assets/world1/floor/platformS.png');
        this.load.image('cloud1', '/assets/world1/enviroments/cloud1.png');
        this.load.image('cloud2', '/assets/world1/enviroments/cloud2.png');
        this.load.image('uitiles', '/assets/world1/UITileset.png');

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
        // Mover las nubes hacia la izquierda
        this.children.list.forEach(child => {
            if (child.texture && (child.texture.key === 'cloud1' || child.texture.key === 'cloud2')) {
            child.x -= 0.2; // Velocidad de movimiento de las nubes
            if (child.x + child.displayWidth < 0) {
                child.x = this.scale.width; // Reaparecer en el lado derecho
            }
            }
        });
    }
}