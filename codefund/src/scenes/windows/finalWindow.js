import { appearance,disappearance } from "../../utils/animations"
import { guardarProgresoAlumno, guardarProgresoProfesor } from "../../api/apiCalls"
import { panelCarga } from "../../utils/panelCarga"

export function successWindow(scene, timeTaken, puntosFijo) {

    scene.buttonEnabledSuccess = true
    const {width, height} = scene.scale;
    scene.puntosBase= 200
    const puntosThisLevel = scene.puntosBase - timeTaken + puntosFijo
    const container = scene.add.container(width/2, height/2)
    // logros
    const fondoWidth = 210
    const fondoHeight = 50
    const marginLogros = 12
    const baseX = width / 2 -75
    const baseY = -height / 2 + 50
    const bibliotecaSet= [
        "Conceptos básicos",
        "Tipos de datos I",
        "Tipos de datos II",
        "Operadores I",
        "Operadores II",
        "Estructuras de control",
        "Condicionales",
        "Bucles",
        "Arrays",
        "Modularización"
    ]
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
        'Puntos: '+ (puntosThisLevel), {
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

    // obtención de datos usuario y mundo
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const mundos = JSON.parse(localStorage.getItem('mundos'))

    const mundoID= localStorage.getItem('mundoSeleccionado')
    const mundo = mundos.find(m => m._id === mundoID)

    const nivelNombre= localStorage.getItem('nivelSeleccionado')
    const thisLevel = mundo.niveles.find(n => n.nombre === nivelNombre)
    const num = thisLevel.num

    const progreso = usuario.progreso
    let progresoMundo = progreso?.find(p => p.mundoID === mundoID)
    let progresoNivelActual = progresoMundo?.niveles.find(n => n.nombre === nivelNombre)

    if (!progresoMundo) {
        let progresoMundotmp = {
            mundoID: mundoID,
            completado: false,
            niveles: [
            {
                nombre: nivelNombre,
                completado: true,
                puntos: 0,
                estrellas: 0
            }

            ]
        }
        progreso.push(progresoMundotmp)
    } else if( !progresoNivelActual){
            let progresoNivelActualtmp = {
                nombre: nivelNombre,
                completado: true,
                puntos: 0,
                estrellas: 0
            }
            progresoMundo.niveles.push(progresoNivelActualtmp)
    }

    progresoMundo = progreso.find(p => p.mundoID === mundoID)
    progresoNivelActual = progresoMundo.niveles.find(n => n.nombre === nivelNombre)

    const nextLevel = mundo.niveles[scene.currentLevelIndex+1]

    var puntosTotales = usuario.puntosTotales
    var estrellasTotales = usuario.estrellasTotales


    var logrosConseguidos = []

    if ( progresoNivelActual.puntos < puntosThisLevel ) {
        const difPuntos = (puntosThisLevel) - progresoNivelActual.puntos
        const difEstrellas = scene.stars.length - progresoNivelActual.estrellas
        progresoNivelActual.puntos = puntosThisLevel
        progresoNivelActual.estrellas = scene.stars.length

        puntosTotales += difPuntos
        estrellasTotales += difEstrellas

        //Comprobar logros al finalizar un nivel
        if (!usuario.insignias.includes(num+'Done')){
            usuario.insignias.push(num+'Done')
            logrosConseguidos.push(num+'Done')
        }
        if (progresoNivelActual.estrellas === 3 && !usuario.insignias.includes(num+'Estrellas')){
            usuario.insignias.push(num+'Estrellas')
            logrosConseguidos.push(num+'Estrellas')
        }
        // Comprobar entradas a la biblioteca
        if (nivelNombre ==='Nivel 1_1' && !usuario.biblioteca.includes('Tipos de datos I')){
            usuario.biblioteca.push('Tipos de datos I')
            logrosConseguidos.push('Tipos de datos I')
        }
        if (nivelNombre === 'Nivel 1_2' && !usuario.biblioteca.includes('Tipos de datos II')){
            usuario.biblioteca.push('Tipos de datos II')
            logrosConseguidos.push('Tipos de datos II')
        }
        if (nivelNombre === 'Nivel 1_4' && !usuario.biblioteca.includes('Operadores I')){
            usuario.biblioteca.push('Operadores I')
            logrosConseguidos.push('Operadores I')
        }
        if (nivelNombre === 'Nivel 1_6' && !usuario.biblioteca.includes('Operadores II')){
            usuario.biblioteca.push('Operadores II')
            logrosConseguidos.push('Operadores II')
        }
        // Comprobar logro mundo done
        if (!nextLevel && !usuario.insignias.includes(scene.currentWorldIndex+1+'Done')){
            progresoMundo.completado = true
            usuario.insignias.push(scene.currentWorldIndex+1+'Done')
            logrosConseguidos.push(scene.currentWorldIndex+1+'Done')
        }
        // Comprobar logros de cantidad de estrellas
        if (estrellasTotales>= 5 && !usuario.insignias.includes('5Estrellas')){
            usuario.insignias.push('5Estrellas')
            logrosConseguidos.push('5Estrellas')
        }
        if (estrellasTotales>= 10 && !usuario.insignias.includes('10Estrellas')){
            usuario.insignias.push('10Estrellas')
            logrosConseguidos.push('10Estrellas')
        }
        if (estrellasTotales>= 15 && !usuario.insignias.includes('15Estrellas')){
            usuario.insignias.push('15Estrellas')
            logrosConseguidos.push('15Estrellas')
        }
        if (estrellasTotales>= 20 && !usuario.insignias.includes('20Estrellas')){
            usuario.insignias.push('20Estrellas')
            logrosConseguidos.push('20Estrellas')
        }
        if (estrellasTotales>= 25 && !usuario.insignias.includes('25Estrellas')){
            usuario.insignias.push('25Estrellas')
            logrosConseguidos.push('25Estrellas')
        }
        if (estrellasTotales>= 30 && !usuario.insignias.includes('30Estrellas')){
            usuario.insignias.push('30Estrellas')
            logrosConseguidos.push('30Estrellas')
        }
        if (estrellasTotales>= 35 && !usuario.insignias.includes('35Estrellas')){
            usuario.insignias.push('35Estrellas')
            logrosConseguidos.push('35Estrellas')
        }
        if (estrellasTotales>= 40 && !usuario.insignias.includes('40Estrellas')){
            usuario.insignias.push('40Estrellas')
            logrosConseguidos.push('40Estrellas')
        }
        if (estrellasTotales>= 45 && !usuario.insignias.includes('45Estrellas')){
            usuario.insignias.push('45Estrellas')
            logrosConseguidos.push('45Estrellas')
        }

        // llamar a actualizar usuario y guardamos en localStorage
        const usuarioActualizado = {
            progreso: progreso,
            puntosTotales: puntosTotales,
            estrellasTotales: estrellasTotales,
            insignias: usuario.insignias,
            biblioteca: usuario.biblioteca
        }
        console.log('Usuario actualizado:', usuarioActualizado)
        if (usuario.profesor){
            guardarProgresoProfesor(usuario.correo, usuarioActualizado).then((res) => {
            localStorage.setItem('usuario', JSON.stringify({
                ...usuario,
                progreso: res.progreso,
                puntosTotales: res.puntosTotales,
                estrellasTotales: res.estrellasTotales,
                insignias: res.insignias,
            }))
            }).catch((err) => {
                console.error('Error al actualizar los niveles', err)
            })
        }else{
            guardarProgresoAlumno(usuario.correo, usuarioActualizado).then((res) => {
            localStorage.setItem('usuario', JSON.stringify({
                ...usuario,
                progreso: res.progreso,
                puntosTotales: res.puntosTotales,
                estrellasTotales: res.estrellasTotales,
                insignias: res.insignias,
                biblioteca: res.biblioteca
            }))
            }).catch((err) => {
                console.error('Error al actualizar los niveles', err)
            })
        }
    }


    // Botones success window
    const botones = [
        {icon: 'iconExit', callback: ()=> {
            const tipoMenu = usuario.profesor ? 'MainMenuProfesor' : 'MainMenuJugador'
            panelCarga(scene, 'CARGANDO MENÚ...')
            localStorage.removeItem('mundoSeleccionado')
            localStorage.removeItem('nivelSeleccionado')
            setTimeout(() => {
                scene.scene.start(tipoMenu, {openWorldSelect: false})
            },500)
        }},
        {icon: 'iconRestart', callback: ()=> {
            panelCarga(scene, 'REINICIANDO NIVEL...')
            setTimeout(() => {
                scene.scene.start(scene.currentLevel)
            }, 500)
        }},
        {icon: 'iconResume', callback: ()=> {
            panelCarga(scene, `CARGANDO SIGUIENTE NIVEL ${nextLevel.nombre}...`)
            localStorage.setItem('nivelSeleccionado', nextLevel.nombre)
            setTimeout(() => {
            scene.scene.start(scene.nextLevel)
            },500)
        }}
    ]
    // Botones
    const buttonheight = 40
    const buttonSpacing = 100

    botones.forEach((boton, i) => {
        if (boton.icon === 'iconResume' &&
            !nextLevel) return

        const y = buttonheight
        const x = (i - 1) * buttonSpacing

        const button = scene.add.image(x,y, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true}).setScale(2)
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5).setScale(2)
        container.add(icon)

        button.on('pointerdown', () => {
            if(scene.buttonEnabledSuccess ){
                scene.buttonEnabledSuccess = false
                scene.tweens.add({
                    targets: [button, icon],
                    scale: 1.8,
                    duration: 100,
                    ease: 'Power1',
                    yoyo: true,
                    onComplete: () => {
                        boton.callback();
                    }
                });
            }
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

    // mostras los logros conseguidos en el nivel
    logrosConseguidos.forEach((logro, index) => {
        const isBiblioteca = bibliotecaSet.includes(logro);
        const iconKey  = isBiblioteca ? 'scroll2' : logro;
        const texto    = isBiblioteca ? logro : 'Insignia desbloqueada';

        const logroBox = scene.add.container(
            baseX,
            baseY + index * (fondoHeight + marginLogros)
        );

        const fondo = scene.add.nineslice(
            0, 0, 'fondoBoton', 0,
            fondoWidth, fondoHeight,
            10, 10, 10, 10
        ).setOrigin(1, 0);
        logroBox.add(fondo);

        const icon = scene.add.image(
            -fondoWidth + 25,
            fondoHeight / 2,
            iconKey
        ).setOrigin(0.5);
        logroBox.add(icon);

        // Texto
        const text = scene.add.text(
            -fondoWidth + 55,
            fondoHeight / 2,
            texto,
            {
                fontFamily: 'Arial',
                fontSize : 14,
                color    : '#ffffff',
            }
        ).setOrigin(0, 0.5)
        logroBox.add(text)

        container.add(logroBox)
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

    scene.buttonEnabledFailure = true
    const {width, height} = scene.scale;
    scene.puntosBase= 200
    const container = scene.add.container(width/2, height/2)
    const usuario = JSON.parse(localStorage.getItem('usuario'))
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
            const tipoMenu = usuario.profesor ? 'MainMenuProfesor' : 'MainMenuJugador'
            panelCarga(scene, 'CARGANDO MENÚ...')
            localStorage.removeItem('mundoSeleccionado')
            localStorage.removeItem('nivelSeleccionado')
            setTimeout(() => {
                scene.scene.start(tipoMenu, {openWorldSelect: false})
            },500)
        }},
        {icon: 'iconRestart', callback: ()=> {
            panelCarga(scene, 'REINICIANDO NIVEL...')
            setTimeout(() => {
                scene.scene.start(scene.currentLevel)
            }, 500)
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
            if(scene.buttonEnabledFailure ){
                scene.buttonEnabledFailure = false
                scene.tweens.add({
                    targets: [button, icon],
                    scale: 1.8,
                    duration: 100,
                    ease: 'Power1',
                    yoyo: true,
                    onComplete: () => {
                        boton.callback();
                    }
                });
            }
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