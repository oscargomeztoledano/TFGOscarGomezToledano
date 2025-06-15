import { appearance, disappearance} from "../../utils/animations";
import { panelCarga } from "../../utils/panelCarga";


export function menuPause(scene,usuario) {
    scene.buttonEnabledPause = true
    const {width, height} = scene.scale;
    const container = scene.add.container(width/2, height/2)

    const overlay =scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
    const fondo = scene.add.nineslice(
    0, -50, 'marco3', 0,200,250,10,10,10,10).setOrigin(0.5)
    container.add(fondo)
    
    
    const bannerText = scene.add.text(0, 0, 'OPCIONES', {
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
        0, - fondo.height / 2 - 60, 
        'marco1', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)

    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)
    container.add([banner, bannerText])

    const botones = [
        {icono: 'iconResume', texto: 'CONTINUAR', callback: () => {
            const panel = panelCarga(scene, 'CONTINUAR JUEGO')
            setTimeout(() => {
            overlay.destroy()
            disappearance(container, scene)
            scene.controlEnabled = true 
            panel.destroy()
            },500)  
        }
        },
        {icono: 'iconRestart', texto: 'REINICIAR', callback: () => {
            panelCarga(scene, 'REINICIANDO NIVEL...')
            setTimeout(() => {
                scene.scene.start(scene.currentLevel)                
            }, 500)
        }
        },
        {icono: 'iconLevels', texto: 'MUNDOS', callback: () => {
            const tipoMenu = usuario.profesor ? 'MainMenuProfesor' : 'MainMenuJugador'
            panelCarga(scene, 'CARGANDO SELECCIÓN DE MUNDO...')
            localStorage.removeItem('mundoSeleccionado')
            localStorage.removeItem('nivelSeleccionado')
            setTimeout(() => {
                scene.scene.start(tipoMenu, {openWorldSelect: true})
            }, 500)
            }
        },
        {icono: 'iconExit', texto: 'SALIR', callback: () => {
            const tipoMenu = usuario.profesor ? 'MainMenuProfesor' : 'MainMenuJugador'
            panelCarga(scene, 'SALIENDO...')
            localStorage.removeItem('mundoSeleccionado')
            localStorage.removeItem('nivelSeleccionado')
            setTimeout(() => {
                scene.scene.start(tipoMenu, {openWorldSelect: false})
            }, 500)
            }
        }
    ]

    const buttonSpacing = 15
    const buttonHeight =  32
    const buttonWidth =  160
    const startY = - ((botones.length * (buttonHeight + buttonSpacing)) / 2) -30;

    botones.forEach((boton, i) => {
        const y = startY + i * (buttonHeight + buttonSpacing)

        const button = scene.add.nineslice(
            0, y, 
            'fondoBoton', 0, 
            buttonWidth, buttonHeight, 
            10, 10, 10, 10
        ).setOrigin(0.5).setInteractive({useHandCursor: true})
        container.add(button)
        const icon = scene.add.image(
            - buttonWidth / 2 + 16, y,
            boton.icono
        ).setOrigin(0.5)
        container.add(icon)
        const buttonText = scene.add.text(
            - buttonWidth / 2 + 36, y,
            boton.texto, {
                fontFamily: 'Arial Black',
                fontSize: '14px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }
        ).setOrigin(0, 0.5)
        container.add(buttonText)
        button.on('pointerdown', () => {
            if (scene.buttonEnabledPause){
                scene.buttonEnabledPause = false
                scene.tweens.add({
                    targets: [button, icon, buttonText],
                    scale: 0.9, 
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
            button.setScale(1.1);
            icon.setScale(1.1);
            buttonText.setScale(1.1);
        })
        button.on('pointerout', () => {
            button.setScale(1);
            icon.setScale(1);
            buttonText.setScale(1);
        })

        container.add([button, icon, buttonText])
    })
    appearance(container, scene)
    container.setDepth(overlay.depth + 1)
  }
