import { appearance,disappearance } from "../animations";
import { lecciones } from "../lecciones"
import {marked} from "marked"
window.marked = marked

export function biblioteca(scene, usuario){

    const {width, height} = scene.scale
    const container = scene.add.container(width/2, height/2)
    const fondo = scene.add.nineslice(
        0, -30, 'marco3', 0,600,450,10,10,10,10).setOrigin(0.5)
    container.add(fondo)
    const bannerText = scene.add.text(0, 0, 'BIBLIOTECA', {
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
        0, - fondo.height / 2 - 40, 
        'marco1', 0, 
        widthBannerText, heightBannerText, 
        10, 10, 10, 10
    ).setOrigin(0.5)
    bannerText.setPosition(banner.x, banner.y).setOrigin(0.5)
    bannerText.setDepth(banner.depth + 1)
    container.add([banner, bannerText])

    const buttonClose = scene.add.image(0, 165, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
    container.add(buttonClose)
    const icon = scene.add.image(0,165, 'cross').setOrigin(0.5)
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
    
    const leftW  = 180;                    
    const rightW = 600 - leftW - 60;      
    const innerTop = -200;                 
    const btnH   = 32;
    const spacing= 6;

    const listContainer = scene.add.container(-600/2 + 30 + leftW/2, innerTop);
    container.add(listContainer);

    
    const html = scene.add.dom(  
        600/2 -20- rightW/2,   
        innerTop +150               
    ).createFromHTML(`
    <div id="md"  style="
        width:${rightW-30}px;
        height:${450 - 110}px;   /* 110 = margen superior + botón cierre + margen inf */
        overflow-y:auto;
        color:#ffffff;
        font-family: Arial, sans-serif;
        font-size: 14px;
        ">
        
    </div>
    `);
    container.add(html);
    const earned = usuario.biblioteca
    console.log(usuario.biblioteca)
    var texto = ''
    lecciones.forEach((lec, i) => {
    const y = i * (btnH + spacing)

    const bg = scene.add.nineslice(
        0, y, 'fondoBoton', 0,
        leftW-10, btnH,
        10,10,10,10
    ).setOrigin(0.5).setInteractive({ useHandCursor:true })

    const isearned = earned.includes(lec.titulo)
    if (!isearned) {
         texto = '??????'
    }else{
         texto = lec.titulo
    }

    const txt = scene.add.text(-70, y, texto, {
            fontFamily:'Arial',
            fontSize:14,
            color:'#ffffff',
            stroke:'#000000',
            strokeThickness:2
    }).setOrigin(0,0.5);

    listContainer.add([bg, txt]);
    if (isearned){
        bg.on('pointerdown', () => {

        const mdDiv = html.getChildByID('md');
        mdDiv.innerHTML = window.marked.parse(lec.contenido); 
        mdDiv.scrollTop = 0;
        });

        bg.on('pointerover', ()=> { bg.setScale(1.05); txt.setScale(1.05); });
        bg.on('pointerout',  ()=> { bg.setScale(1);    txt.setScale(1);    });
        }
    });
    appearance(container, scene);    
}


