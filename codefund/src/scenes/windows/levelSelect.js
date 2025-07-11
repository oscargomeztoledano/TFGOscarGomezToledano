import { appearance, disappearance } from "../../utils/animations"
import { panelCarga } from "../../utils/panelCarga"

export function levelSelect(scene, nombreMundo, niveles, usuario) {
    return new Promise((resolve, reject) => {
        try{
        scene.buttonEnabledLevel  = true
        const {width, height} = scene.scale
        const container = scene.add.container(width/2, height/2)
        const fondo = scene.add.nineslice(
            0, -60, 'marco3', 0,400,330,10,10,10,10).setOrigin(0.5)
        container.add(fondo)
        const bannerText = scene.add.text(0, 0, `SELECCIÓN DE NIVELES ${nombreMundo.toUpperCase()}`, {
            fontSize: '20px',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4,
            color: '#ffffff'
        }).setOrigin(0.5);
        const padding = 20
        const widthBannerText = bannerText.width + padding 
        const heightBannerText = bannerText.height + padding
        const banner = scene.add.nineslice(
            0, - fondo.height / 2 - 70, 
            'marco1', 0, 
            widthBannerText+20, heightBannerText, 
            10, 10, 10, 10
        ).setOrigin(0.5)
        bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
        bannerText.setDepth(banner.depth + 1)
        container.add([banner, bannerText])

        const buttonClose = scene.add.image(0, 75, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
        container.add(buttonClose)
        const icon = scene.add.image(0, 75, 'cross').setOrigin(0.5)
        container.add(icon)
        buttonClose.on('pointerdown', () => {
                const panel = panelCarga(scene, 'CERRANDO MUNDOS...')
                scene.buttonEnabledWorld = true
                scene.buttonEnabledLevel = false
                scene.tweens.add({
                    targets: [buttonClose, icon],
                    scale: 0.9, 
                    duration: 100,
                    ease: 'Power1',
                    yoyo: true, 
                    onComplete: () => {
                        setTimeout(() => {
                        panel.destroy()
                        disappearance(container, scene)
                        },400)
                    }
                });

            })
        buttonClose.on('pointerover', () => {
            buttonClose.setScale(1.1);
            icon.setScale(1.1);
        })
        buttonClose.on('pointerout', () => {
            buttonClose.setScale(1);
            icon.setScale(1);
        })

        const mundoID= localStorage.getItem('mundoSeleccionado')
        const progreso = usuario.progreso

        const progresoMundo = progreso?.find(m => m.mundoID === mundoID)
        niveles.forEach((nivel, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3

            const xOffset = (col - 1) * 100

            const yOffset = row * 100 -140+col*20

            const buttonText = scene.add.text(0, 0, nivel.num, {
                fontSize: '16px',
                fontFamily: 'Arial',
                stroke: '#000000',
                strokeThickness: 2,
                color: '#ffffff',
            }).setOrigin(0.5);

            const buttonBackground = scene.add.nineslice(
                xOffset, yOffset, 
                'fondoBoton', 0, 
                50, 50, 
                10, 10, 10, 10
            ).setOrigin(0.5).setInteractive({ useHandCursor: true });

            buttonText.setPosition(buttonBackground.x, buttonBackground.y).setOrigin(0.5);
            buttonText.setDepth(buttonBackground.depth + 1);
            container.add([buttonBackground, buttonText]);
            const starsX =[buttonBackground.x-20, buttonBackground.x, buttonBackground.x+20]
            const starsY = [buttonBackground.y+25, buttonBackground.y+20, buttonBackground.y+25]

            const progresoNivel = progresoMundo?.niveles.find(n => n.nombre === nivel.nombre)
            const estrellas = progresoNivel?.estrellas || 0

            let nivelDesbloqueado = false
            if (index === 0 || usuario.profesor) {
                nivelDesbloqueado = true
            }else {
                const nivelAnterior = niveles[index - 1]
                const progresoAnterior = progresoMundo?.niveles.find(n => n.nombre === nivelAnterior.nombre) 
                nivelDesbloqueado = progresoAnterior?.completado === true
            }
            for (let i = 0; i < estrellas; i++) {
                const star = scene.add.image(starsX[i], starsY[i], 'star').setOrigin(0.5).setScale(0.2)
                container.add(star);
            }
            if (!nivelDesbloqueado) {
                buttonBackground.setAlpha(0.5);
                buttonText.setAlpha(0.5)
                const lockIcon = scene.add.image(buttonBackground.x, buttonBackground.y, 'iconLock')
                .setOrigin(0.5)
                .setScale(2).setDepth(buttonBackground.depth + 5)
                container.add(lockIcon);
            }

            buttonBackground.on('pointerdown', () => {
                if (nivelDesbloqueado && scene.buttonEnabledLevel) {
                    scene.buttonEnabledLevel = false    
                    panelCarga(scene, `CARGANDO ${nivel.nombre}...`) 
                    localStorage.removeItem('nivelSeleccionado')
                    localStorage.setItem('nivelSeleccionado', nivel.nombre)
                    scene.tweens.add({
                        targets: [buttonBackground, buttonText],
                        scale: 0.9, 
                        duration: 100,
                        ease: 'Power1',
                        yoyo: true, 
                        onComplete: () => {
                            setTimeout(() => {               
                            scene.scene.start(nombreMundo.toLowerCase()+ nivel.nombre.toLowerCase().replace(/\s+/g,''))
                        }, 500)
                        }
                    });
                }
            });

            buttonBackground.on('pointerover', () => {
                buttonBackground.setScale(1.1);
                buttonText.setScale(1.1);
            });

            buttonBackground.on('pointerout', () => {
                buttonBackground.setScale(1);
                buttonText.setScale(1);
            });
        })
        if (!niveles || niveles.length === 0) {
            const mensaje = scene.add.text(0, -80, 'Los niveles se están construyendo, lamentamos la espera.', {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center',
                wordWrap: { width: 300 }
            }).setOrigin(0.5);

            const paddingX = 40;
            const paddingY = 30;
            const bgWidth = mensaje.width + paddingX;
            const bgHeight = mensaje.height + paddingY;

            const fondoMensaje = scene.add.nineslice(
                0, -80, 
                'marco1', 0, 
                bgWidth, bgHeight, 
                10, 10, 10, 10
            ).setOrigin(0.5);

            container.add([fondoMensaje, mensaje]);
        }

        appearance(container, scene)
        resolve(true)
    }catch (error) {
        reject(error)
    }
})
}