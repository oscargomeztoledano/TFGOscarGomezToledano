import { appearance,disappearance } from "../../utils/animations"
import { getMundosByAula } from "../../api/apiCalls"
import { levelSelect } from "./levelSelect"
import {panelCarga} from "../../utils/panelCarga"

var mundosAula = []
export async function worldSelect(scene, usuario, mundos){
    try{
        if(!usuario.profesor){
        const response = await getMundosByAula(usuario.aula)
        
        mundosAula = response.mundos
        console.log("Mundos del aula:", mundosAula)
        }
    }catch (error) {
        console.error("Error fetching worlds:", error)
        return Promise.reject(error)
    }
    return new Promise((resolve) => {
        try{
            scene.buttonEnabledWorld = true
            const {width, height} = scene.scale
            const container = scene.add.container(width/2, height/2)
            const fondo = scene.add.nineslice(
                0, -60, 'marco3', 0,400,330,10,10,10,10).setOrigin(0.5)
            container.add(fondo)
            const bannerText = scene.add.text(0, 0, 'SELECCIONA UN MUNDO', {
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
                widthBannerText, heightBannerText, 
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
                scene.buttonEnabledWorld = false
                scene.tweens.add({
                    targets: [buttonClose, icon],
                    scale: 0.9, 
                    duration: 100,
                    ease: 'Power1',
                    yoyo: true, 
                    onComplete: () => {
                        setTimeout(() => {
                        panel.destroy()
                        scene.buttonEnabledMain = true
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

            const mundosMap = mundos.map(mundo => ({ texto: mundo.nombre, id: mundo._id, niveles: mundo.niveles }))

            mundosMap.forEach((mundo, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;

                const xOffset = (col - 1) * 130;

                const yOffset = row * 100 -140+col*20;

                const buttonText = scene.add.text(0, 0, mundo.texto, {
                    fontSize: '16px',
                    fontFamily: 'Arial',
                    stroke: '#000000',
                    strokeThickness: 2,
                    color: '#ffffff',
                }).setOrigin(0.5);

                const buttonWidth = buttonText.width + 20;
                const buttonHeight = buttonText.height + 20;

                const buttonBackground = scene.add.nineslice(
                    xOffset, yOffset, 
                    'fondoBoton', 0, 
                    buttonWidth, buttonHeight, 
                    10, 10, 10, 10
                ).setOrigin(0.5).setInteractive({ useHandCursor: true });

                buttonText.setPosition(buttonBackground.x, buttonBackground.y).setOrigin(0.5);
                buttonText.setDepth(buttonBackground.depth + 1);
                container.add([buttonBackground, buttonText]);
                console.log(mundo.texto)
                if (!mundosAula.includes(mundo.texto) && !usuario.profesor) {
                    buttonBackground.setAlpha(0.5);
                    buttonText.setAlpha(0.5)
                    const lockIcon = scene.add.image(buttonBackground.x, buttonBackground.y, 'iconLock')
                    .setOrigin(0.5)
                    .setScale(2).setDepth(buttonBackground.depth + 5)
                    container.add(lockIcon);
                }

                buttonBackground.on('pointerdown', () => {
                    if ((mundosAula.includes(mundo.texto)&&scene.buttonEnabledWorld)
                        ||(usuario.profesor&&scene.buttonEnabledWorld)){
                        scene.buttonEnabledWorld = false
                        const panel = panelCarga(scene, 'CARGANDO '+ mundo.texto + '...')
                        localStorage.removeItem('mundoSeleccionado')
                        localStorage.setItem('mundoSeleccionado', mundo.id)
                        scene.tweens.add({
                            targets: [buttonBackground, buttonText],
                            scale: 0.9, 
                            duration: 100,
                            ease: 'Power1',
                            yoyo: true, 
                            onComplete: () => {
                                setTimeout(() => {
                                    levelSelect(scene, mundo.texto.toLowerCase(), mundo.niveles, usuario).then(() => {
                                        panel.destroy()
                                    })
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

            });
            appearance(container, scene)
            resolve(true)
        }catch (error) {
            reject(error)
        }
    })
}