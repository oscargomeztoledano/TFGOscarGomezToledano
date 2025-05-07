import { disappearance,appearance } from "./animations"

export function registro(scene){
    const container = scene.add.container(0, 0)
    const {width, height} = scene.scale
    scene.buttonEnabled = false

    const fondo = scene.add.nineslice(width / 2, 
        height / 2-50, 
        'frame2',0,
        400, 300, 10, 10, 10, 10).setOrigin(0.5)
    container.add(fondo)

    const bannerText = scene.add.text(0, 0, 'REGISTRO', {
        fontFamily: 'Arial Blanck',
        fontSize: '14px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2
    })
    const padding = 20
    const widthBannerText = bannerText.width + padding * 2
    const heightBannerText = bannerText.height + padding
    const bannerposty= height / 2 - fondo.height / 2 - 60

    const banner = scene.add.nineslice(
        width / 2, bannerposty, 
        'frame2', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)

    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)
    container.add([banner, bannerText])

    const inputFields = [
        { placeholder: 'Correo', yOffset: -150 },
        { placeholder: 'Nombre', yOffset: -100 },
        { placeholder: 'Contraseña', yOffset: -50 },
        { placeholder: 'Código de clase', yOffset: 0 }
    ];

    inputFields.forEach((field, index) => {
        const text = scene.add.text(0, 0, field.placeholder, {
            fontFamily: 'Arial Black',
            fontSize: '14px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0,0.5)
        text.setPosition(width / 2 - 100, height / 2 + field.yOffset - 25)
        container.add(text)
        const input = scene.add.dom(width / 2, height / 2 + field.yOffset).createFromHTML(`
            <input type="text" id="input-${field.placeholder}" style="width: 200px; padding: 5px;" />
        `)
        container.add(input)
    });

    const botones = [
        {icon:'cross', callback:  () => {
            scene.buttonEnabled = true
            disappearance(container, scene)}},
        {icon:'check', callback: () => {}},
    ]
    const spacing= 15
    const buttonHeight =  32
    const startX=width/2-(buttonHeight+spacing)
    const startY= height/2+50

    botones.forEach((boton, i) => {
        const x = startX + i * ((buttonHeight + spacing)*2)
        const y = startY

        const button = scene.add.image(x, y, 'frame1').setOrigin(0.5).setInteractive({useHandCursor: true})
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5)
        container.add(icon)

        button.on('pointerdown', () => {
            boton.callback()
        })
        button.on('pointerover', () => {
            button.setScale(1.1);
            icon.setScale(1.1);
        })
        button.on('pointerout', () => {
            button.setScale(1);
            icon.setScale(1);
        })

    })
    appearance(container, scene)
}   
export function inicioSesion(scene){
    const container = scene.add.container(0, 0)
    const {width, height} = scene.scale
    scene.buttonEnabled = false

    const fondo = scene.add.nineslice(width / 2, 
        height / 2-50, 
        'frame2',0,
        300, 200, 10, 10, 10, 10).setOrigin(0.5)
    container.add(fondo)

    const bannerText = scene.add.text(0, 0, 'INICIO SESION', {
        fontFamily: 'Arial Blanck',
        fontSize: '14px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2
    })
    const padding = 20
    const widthBannerText = bannerText.width + padding * 2
    const heightBannerText = bannerText.height + padding
    const bannerposty= height / 2 - fondo.height / 2 - 60

    const banner = scene.add.nineslice(
        width / 2, bannerposty, 
        'frame2', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)

    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)
    container.add([banner, bannerText])

    const inputFields = [
        { placeholder: 'Correo', yOffset: -100 },
        { placeholder: 'Contraseña', yOffset: -50 },
    ];

    inputFields.forEach((field, index) => {
        const text = scene.add.text(0, 0, field.placeholder, {
            fontFamily: 'Arial Black',
            fontSize: '14px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0,0.5)
        text.setPosition(width / 2 - 100, height / 2 + field.yOffset - 25)
        container.add(text)
        const input = scene.add.dom(width / 2, height / 2 + field.yOffset).createFromHTML(`
            <input type="text" id="input-${field.placeholder}" style="width: 200px; padding: 5px;" />
        `)
        container.add(input)
    });

    const botones = [
        {icon:'cross', callback:  () => {
            scene.buttonEnabled = true
            disappearance(container, scene)}},
        {icon:'check', callback: () => {}},
    ]
    const spacing= 15
    const buttonHeight =  32
    const startX=width/2-(buttonHeight+spacing)
    const startY= height/2

    botones.forEach((boton, i) => {
        const x = startX + i * ((buttonHeight + spacing)*2)
        const y = startY

        const button = scene.add.image(x, y, 'frame1').setOrigin(0.5).setInteractive({useHandCursor: true})
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5)
        container.add(icon)

        button.on('pointerdown', () => {
            boton.callback()
        })
        button.on('pointerover', () => {
            button.setScale(1.1);
            icon.setScale(1.1);
        })
        button.on('pointerout', () => {
            button.setScale(1);
            icon.setScale(1);
        })

    })
    appearance(container, scene)
}