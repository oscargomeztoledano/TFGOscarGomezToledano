import { appearance,disappearance } from "./animations";

export function successWindow(scene, timeTaken) {

    const {width, height} = scene.scale;
    scene.puntosBase= 200
    const container = scene.add.container(width/2, height/2)
    // Añadir el fondo
    const overlay =scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
    
    const fondo = scene.add.nineslice( 0, -50, 'marco3', 0,300,300,10,10,10,10).setOrigin(0.5)
    container.add(fondo)
    //Texto final nivel
    const bannerText = scene.add.text(0, 0, 'Nivel completado', {
        fontSize: '28px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);

    const padding = 20
    const widthBannerText = bannerText.width + padding * 2
    const heightBannerText = bannerText.height + padding

    const banner = scene.add.nineslice(
        0, - fondo.height / 2 - 60, 
        'marco1', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)

    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)
    container.add([banner, bannerText])

    //info puntos y tiempo
    const puntosText =scene.add.text(0, -60, 
        'Puntos: '+ (scene.puntosBase - timeTaken), {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);
    container.add(puntosText)
    const tiempoText = scene.add.text(0,  -30, 
        'Tiempo: '+ timeTaken + 's', {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);
    container.add(tiempoText)

    // Llamada al cáculo de los puntos y estrellas
    calcularEstrellas(scene, timeTaken)
    const starsHeight =  -130
    const starsSpacing = 100
    const posx=[- starsSpacing, 0,  starsSpacing]
    scene.emptyStars=[]
    scene.stars=[]
    for (let i =0; i<3; i++){
        if (scene.starsToPrint[i]===1) 
            scene.stars.push(scene.add.image(posx[i], starsHeight, 'star').setOrigin(0.5))
        else
            scene.emptyStars.push(scene.add.image(posx[i], starsHeight, 'starOutline').setOrigin(0.5))
            
    }
    container.add(scene.emptyStars)
    container.add(scene.stars)

    const botones = [
        {icon: 'iconExit', callback: ()=> {
            disappearance(container, scene)
            scene.time.delayedCall(300, () => {
                scene.scene.start('MainMenu')
            });
        }},
        {icon: 'iconRestart', callback: ()=> {
            disappearance(container, scene)
            scene.time.delayedCall(300, () => {
                scene.scene.start(scene.currentLevel)
            });
        }},
        {icon: 'iconResume', callback: ()=> {
            disappearance(container, scene)
            scene.time.delayedCall(300, () => {
                scene.scene.start(scene.nextLevel)
            });
        }}
    ]
    // Botones
    const buttonheight = 40
    const buttonSpacing = 100

    botones.forEach((boton, i) => {
        const y = buttonheight
        const x = (i - 1) * buttonSpacing

        const button = scene.add.image(x,y, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true}).setScale(2)
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5).setScale(2)
        container.add(icon)

        button.on('pointerdown', () => {
            boton.callback()
        })
        button.on('pointerover', () => {
            button.setScale(2.2);
            icon.setScale(2.2);
        })
        button.on('pointerout', () => {
            button.setScale(2);
            icon.setScale(2);
        })
    })

    appearance(container, scene)
    container.setDepth(overlay.depth + 1)
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
    const container = scene.add.container(width/2, height/2)

    // Añadir el fondo
    const overlay =scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
    
    const fondo = scene.add.nineslice( 0, -50, 'marco3', 0,300,300,10,10,10,10).setOrigin(0.5)
    container.add(fondo)


    //Texto final nivel
    const bannerText = scene.add.text(0, 0, 'Game Over', {
        fontSize: '28px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);

    const padding = 20
    const widthBannerText = bannerText.width + padding * 2
    const heightBannerText = bannerText.height + padding

    const banner = scene.add.nineslice(
        0, - fondo.height / 2 - 60, 
        'marco1', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)

    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)
    container.add([banner, bannerText])

   //info puntos y tiempo
    const puntosText =scene.add.text(0, -60, 
        'Puntos: 0', {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);
    container.add(puntosText)

    const tiempoText = scene.add.text(0,  -30, 
        'Tiempo: '+ timeTaken + 's', {
        fontSize: '20px',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 4,
        color: '#ffffff'
    }).setOrigin(0.5);
    container.add(tiempoText)

    
    const starsHeight = -130
    const starsSpacing = 100
    const posx=[- starsSpacing, 0,  starsSpacing]
    scene.emptyStars=[]
    for (let i =0; i<3; i++){
            scene.emptyStars.push(scene.add.image(posx[i], starsHeight, 'starOutline').setOrigin(0.5))
            
    }
    container.add(scene.emptyStars)
    
    // Botones
    const botones = [
        {icon: 'iconExit', callback: ()=> {
            disappearance(container, scene)
            scene.time.delayedCall(400, () => {
                scene.scene.start('MainMenu')
            });
        }},
        {icon: 'iconRestart', callback: ()=> {
            disappearance(container, scene)
            scene.time.delayedCall(300, () => {
                scene.scene.start(scene.currentLevel)
            });
        }},
    ]

    const buttonheight = 40
    const buttonSpacing = 80

    botones.forEach((boton, i) => {
        const y = buttonheight
        const x = i === 0 ? -buttonSpacing : buttonSpacing

        const button = scene.add.image(x,y, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true}).setScale(2)
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5).setScale(2)
        container.add(icon)

        button.on('pointerdown', () => {
            boton.callback()
        })
        button.on('pointerover', () => {
            button.setScale(2.2);
            icon.setScale(2.2);
        })
        button.on('pointerout', () => {
            button.setScale(2);
            icon.setScale(2);
        })
    })

    appearance(container, scene)
    container.setDepth(overlay.depth + 1)
    
    
}