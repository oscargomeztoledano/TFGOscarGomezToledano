export function successWindow(scene, timeTaken) {

    const {width, height} = scene.scale;
    scene.puntosBase= 200

    // Añadir el fondo
    scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

    //Texto final nivel
    scene.add.text(width / 2, height / 2 - 100, 'Nivel completado', {
        fontSize: '28px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);
    //info puntos y tiempo
    scene.add.text(width / 2, height / 2 + 50, 
        'Puntos: '+ (scene.puntosBase - timeTaken), {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);

    scene.add.text(width / 2, height / 2 + 80, 
        'Tiempo: '+ timeTaken + 's', {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);

    // Llamada al cáculo de los puntos y estrellas
    calcularEstrellas(scene, timeTaken)
    const starsHeight = height / 2 - 25
    const starsSpacing = 100
    const posx=[width / 2 - starsSpacing, width / 2, width / 2 + starsSpacing]
    scene.emptyStars=[]
    scene.stars=[]
    for (let i =0; i<3; i++){
        if (scene.starsToPrint[i]===1) 
            scene.stars.push(scene.add.image(posx[i], starsHeight, 'star').setOrigin(0.5))
        else
            scene.emptyStars.push(scene.add.image(posx[i], starsHeight, 'starOutline').setOrigin(0.5))
            
    }

    // Botones
    const buttonheight = 150
    const buttonSpacing = 100

    // Botón HOME
    const buttonHome=scene.add.image(
        width / 2 - buttonSpacing, 
        height / 2 + buttonheight, 
        'iconExit')
        .setOrigin(0.5).setScale(2)
        .setInteractive({useHandCursor: true})
    buttonHome.on('pointerdown', () => {
        scene.scene.start('MainMenu')
    })
    buttonHome.on('pointerover', () => {
        buttonHome.setScale(3.1);
    });
    buttonHome.on('pointerout', () => {
        buttonHome.setScale(2);
    });

    // Botón REPEAT	
    const buttonRepeat=scene.add.image(
        width / 2 , 
        height / 2 + buttonheight, 
        'iconRestart')
        .setOrigin(0.5).setScale(2)
        .setInteractive({useHandCursor: true})
    buttonRepeat.on('pointerdown', () => {
        scene.scene.start(scene.currentLevel)
    })
    buttonRepeat.on('pointerover', () => {
        buttonRepeat.setScale(3.1);
    });
    buttonRepeat.on('pointerout', () => {
        buttonRepeat.setScale(2);
    });
    
    // Botón PLAY
    const buttonPlay=scene.add.image(
        width / 2 + buttonSpacing, 
        height / 2 + buttonheight, 
        'iconResume')
        .setOrigin(0.5).setScale(2)
        .setInteractive({useHandCursor: true})
    buttonPlay.on('pointerdown', () => {
        scene.scene.start(scene.nextLevel)
    })
    buttonPlay.on('pointerover', () => {
        buttonPlay.setScale(3.1);
    });
    buttonPlay.on('pointerout', () => {
        buttonPlay.setScale(2);
    });
}

// Función para calcular los puntos
function calcularEstrellas(scene, timeTaken){
    if (scene.puntosBase - timeTaken >= 125) scene.starsToPrint=[1,1,1]
    else if (scene.puntosBase - timeTaken >= 75 ) scene.starsToPrint=[1,1,0]
    else if (scene.puntosBase - timeTaken >= 25 ) scene.starsToPrint=[1,0,0]
    else scene.starsToPrint=[0,0,0]
}

export function failureWindow(scene, timeTaken){
    const {width, height} = scene.scale;
    scene.puntosBase= 200

    // Añadir el fondo
    scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

    //Texto final nivel
    scene.add.text(width / 2, height / 2 - 100, 'GAME OVER', {
        fontSize: '28px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);
    //info puntos y tiempo
    scene.add.text(width / 2, height / 2 + 50, 
        'Puntos: 0', {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);

    scene.add.text(width / 2, height / 2 + 80, 
        'Tiempo: '+ timeTaken + 's', {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);

    
    const starsHeight = height / 2 - 25
    const starsSpacing = 100
    const posx=[width / 2 - starsSpacing, width / 2, width / 2 + starsSpacing]
    scene.emptyStars=[]
    for (let i =0; i<3; i++){
            scene.emptyStars.push(scene.add.image(posx[i], starsHeight, 'starOutline').setOrigin(0.5))
            
    }

    // Botones
    const buttonheight = 150
    const buttonSpacing = 50

    // Botón HOME
    const buttonHome=scene.add.image(
        width / 2 - buttonSpacing, 
        height / 2 + buttonheight, 
        'iconExit')
        .setOrigin(0.5).setScale(2)
        .setInteractive({useHandCursor: true})
    buttonHome.on('pointerdown', () => {
        scene.scene.start('MainMenu')
    })
    buttonHome.on('pointerover', () => {
        buttonHome.setScale(3.1);
    });
    buttonHome.on('pointerout', () => {
        buttonHome.setScale(2);
    });

    // Botón REPEAT	
    const buttonRepeat=scene.add.image(
        width / 2 + buttonSpacing, 
        height / 2 + buttonheight, 
        'iconRestart')
        .setOrigin(0.5).setScale(2)
        .setInteractive({useHandCursor: true})
    buttonRepeat.on('pointerdown', () => {
        scene.scene.start(scene.currentLevel)
    })
    buttonRepeat.on('pointerover', () => {
        buttonRepeat.setScale(3.1);
    });
    buttonRepeat.on('pointerout', () => {
        buttonRepeat.setScale(2);
    });
    
    
}