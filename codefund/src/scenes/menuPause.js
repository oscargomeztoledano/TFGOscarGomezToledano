
export function menuPause(scene) {

    const container = scene.add.container(0, 0)
    const {width, height} = scene.scale;
    
    const overlay =scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
    container.add(overlay)  
    
    const fondo = scene.add.nineslice(
    width / 2, height / 2, 'tile6', 0,200,250,6,6,6,6).setOrigin(0.5)
    container.add(fondo)

    const bannerText = scene.add.text(0, 0, 'OPCIONES', {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2
    })

    const padding = 20
    const widthBannerText = bannerText.width + padding * 2
    const heightBannerText = bannerText.height + padding
    const bannerposty= height / 2 - fondo.height / 2 - 10

    const banner = scene.add.nineslice(
        width / 2, bannerposty, 
        'tile6', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)


    
    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)

    container.add([banner, bannerText])

    const botones = [
        {icono: 'iconResume', texto: 'RESUME', callback: () => {
            container.destroy()
            scene.controlEnabled = true   
        }
        },
        {icono: 'iconRestart', texto: 'RESTART', callback: () => {
            scene.scene.start(scene.currentLevel)
            }
        },
        {icono: 'iconLevels', texto: 'LEVELS', callback: () => {
            //TODO abrir menu de niveles cuando esté implementado
            console.log('Levels')
            }
        },
        {icono: 'iconSettings', texto: 'SETTINGS', callback: () => {
            //TODO abrir menu de configuracion cuando esté implementado
            console.log('Settings')
            }
        },
        {icono: 'iconExit', texto: 'EXIT', callback: () => {
            //TODO abrir menu de inicio cuando esté implementado
            console.log('Exit')
            }
        }

    ]

    const buttonSpacing = 10
    const buttonHeight =  32
    const buttonWidth =  160
    const startY = height/2- ((botones.length * (buttonHeight + buttonSpacing)) / 2) + 20;

    botones.forEach((boton, i) => {
        const y = startY + i * (buttonHeight + buttonSpacing)

        const button = scene.add.nineslice(
            width / 2, y, 
            'button1', 0, 
            buttonWidth, buttonHeight, 
            10, 10, 10, 10
        ).setOrigin(0.5).setInteractive({useHandCursor: true})
    
        const icon = scene.add.image(
            width / 2 - buttonWidth / 2 + 16, y,
            boton.icono
        ).setOrigin(0.5)

        const buttonText = scene.add.text(
            width / 2- buttonWidth / 2 + 36, y,
            boton.texto, {
                fontFamily: 'Arial',
                fontSize: '14px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }
        ).setOrigin(0, 0.5)

        button.on('pointerdown', () => {
            boton.callback()
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
    
  }
