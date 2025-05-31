import { appearance, disappearance } from "../../utils/animations"
import { panelCarga } from "../../utils/panelCarga"

export function levelSelect(scene, nombreMundo, usuario) {
    return new Promise((resolve) => {
        try{
        scene.buttonEnabledLevel  = true
        const {width, height} = scene.scale
        const container = scene.add.container(width/2, height/2)
        const fondo = scene.add.nineslice(
            0, -60, 'marco3', 0,400,330,10,10,10,10).setOrigin(0.5)
        container.add(fondo)
        const bannerText = scene.add.text(0, 0, 'SELECCIONA UN NIVEL', {
            fontSize: '20px',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4,
            color: '#ffffff'
        }).setOrigin(0.5);
        const padding = 20
        const widthBannerText = bannerText.width + padding * 2
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


        const mundo = usuario.mundos.find(m=>m.nombre === nombreMundo)
        if (!mundo) {
            console.error("Mundo no encontrado")
            return
        }
        const niveles = mundo.niveles

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

            for (let i = 0; i < nivel.estrellas; i++) {
                const star = scene.add.image(starsX[i], starsY[i], 'star').setOrigin(0.5).setScale(0.2)
                container.add(star);
            }
            if (!nivel.desbloqueado) {
                buttonBackground.setAlpha(0.5);
                buttonText.setAlpha(0.5)
                const lockIcon = scene.add.image(buttonBackground.x, buttonBackground.y, 'iconLock')
                .setOrigin(0.5)
                .setScale(2).setDepth(buttonBackground.depth + 5)
                container.add(lockIcon);
            }

            buttonBackground.on('pointerdown', () => {
                if (nivel.desbloqueado && scene.buttonEnabledLevel) {
                    scene.buttonEnabledLevel = false    
                    panelCarga(scene, `CARGANDO ${nivel.nombre}...`) 
                    scene.tweens.add({
                        targets: [buttonBackground, buttonText],
                        scale: 0.9, 
                        duration: 100,
                        ease: 'Power1',
                        yoyo: true, 
                        onComplete: () => {
                            setTimeout(() => {               
                            scene.scene.start(nombreMundo+nivel.nombre)
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
        appearance(container, scene)
        resolve(true)
    }catch (error) {
        reject(error)
    }
})
}