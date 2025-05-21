import { appearance,disappearance } from "../animations";
import { getMundosByAula } from "../../../utils/apiCalls";
import { levelSelect } from "./levelSelect";
var mundos = []
export async function worldSelect(scene, usuario){
    scene.buttonEnabledWorld = true
    await getMundosByAula(usuario.aula).then((response) => {
        mundos = response.mundos
    }).catch((error) => {
        console.error("Error fetching mundos by aula:", error);
    })

    const {width, height} = scene.scale
    const container = scene.add.container(width/2, height/2)
    const fondo = scene.add.nineslice(
        0, -60, 'marco3', 0,400,300,10,10,10,10).setOrigin(0.5)
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

    const buttonClose = scene.add.image(0, 60, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
    container.add(buttonClose)
    const icon = scene.add.image(0, 60, 'cross').setOrigin(0.5)
    container.add(icon)
    buttonClose.on('pointerdown', () => {
        scene.buttonEnabledMain = true
        disappearance(container, scene)
    })
    buttonClose.on('pointerover', () => {
        buttonClose.setScale(1.1);
        icon.setScale(1.1);
    })
    buttonClose.on('pointerout', () => {
        buttonClose.setScale(1);
        icon.setScale(1);
    })

    // TODO : llamadas a level select con el mundo seleccionado.
    const botonesPrincipales = [
        {texto: "MUNDO 1", callback: () => {}},
        {texto: "MUNDO 2", callback: () => {}},
        {texto: "MUNDO 3", callback: () => {}},
        {texto: "MUNDO 4", callback: () => {}},
        {texto: "MUNDO 5", callback: () => {}},
        {texto: "MUNDO 6", callback: () => {}},
    ]


    botonesPrincipales.forEach((boton, index) => {
        const row = Math.floor(index / 3); 
        const col = index % 3; 

        const xOffset = (col - 1) * 130;

        const yOffset = row * 100 -140+col*20;

        
        const buttonText = scene.add.text(0, 0, boton.texto, {
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

        if (!mundos.includes(boton.texto)) {
            buttonBackground.setAlpha(0.5);
            buttonText.setAlpha(0.5)
            const lockIcon = scene.add.image(buttonBackground.x, buttonBackground.y, 'iconLock')
            .setOrigin(0.5)
            .setScale(2).setDepth(buttonBackground.depth + 5)
            container.add(lockIcon);
        }

        buttonBackground.on('pointerdown', () => {
            if (mundos.includes(boton.texto)&& scene.buttonEnabledWorld) {
                scene.buttonEnabledWorld = false
                disappearance(container, scene) 
                levelSelect(scene, boton.texto.toLowerCase(), usuario)
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
}