import {Scene} from 'phaser'


export class FirstScene extends Scene {

    constructor() {
        super('FirstScene')
    }

    create() {
        this.add.image(0,0, 'background7').setOrigin(0,0).setScale(1.5);

        this.floor = this.physics.add.staticGroup()
        // Lista de IDs de los suelos
        const tileWidth = 48 
        const yPosition1 = this.scale.height - tileWidth 
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            this.floor.create(x, yPosition1, 'floor8').setOrigin(0, 0).refreshBody()
        }
        const floorTypes = ['floor1', 'floor2', 'floor3', 'floor4', 'floor5']
        const yPosition2 = this.scale.height - tileWidth -tileWidth
        for (let x = 0; x < this.scale.width; x += tileWidth) {
            const randomFloor = Phaser.Utils.Array.GetRandom(floorTypes) 
            this.floor.create(x, yPosition2, randomFloor).setOrigin(0, 0).refreshBody()
        }

        this.add.image(16, 55, 'logo').setOrigin(0, 0).setScale(0.2)

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add.text(centerX, centerY - 100, 'CODE FUND', {
            font: '100px Arial Black',     
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 10,
        }).setOrigin(0.5);

        this.add.text(centerX, centerY -40 , 'Presiona Enter', {
            font: '16px Arial Black',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.start('SecondScene'); 
        });
    }
}
