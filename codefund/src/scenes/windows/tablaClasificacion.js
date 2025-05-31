import { appearance, disappearance } from "../../utils/animations"
import {getAllAlumnosPuntosAula} from "../../api/apiCalls"
import { panelCarga } from "../../utils/panelCarga"

var alumnos = []
export async function tablaClasificacion(scene, usuario) {

    try{
        alumnos = await getAllAlumnosPuntosAula(usuario.aula)
    }catch(err){
        console.log(err)
        alumnos = []
    }
    
    return new Promise((resolve) => {
        try {

            const {width, height} = scene.scale
            const container = scene.add.container(width/2, height/2).setAlpha(0)
            const fondo = scene.add.nineslice(
                0, -30, 'marco3', 0,400,450,10,10,10,10).setOrigin(0.5)
            container.add(fondo)
            const bannerText = scene.add.text(0, 0, 'TABLA DE CLASIFICACIÓN', {
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
                const panel = panelCarga(scene, 'CERRANDO CLASIFICACIÓN...')
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
                        },500) 
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

            

            const tablaFondo = scene.add.nineslice(0, -40, 'fondoBoton', 0, 300, 350
                , 10, 10, 10, 10).setOrigin(0.5);
            container.add(tablaFondo);


            
            
            const tabla = scene.add.dom(0, -40).createFromHTML(`<div id="tabla" style="width:300px;height:350px;overflow-y:auto;color:#fff">
            </div>`).setOrigin(0.5)

            container.add(tabla)
            appearance(container, scene);

            const html = `
                <table style="width:100%;font-family:Arial;font-size:14px">
                    <thead>
                        <tr style="color:yellow">
                            <th style="width:25%;text-align:center">#</th>
                            <th style="width:25%;text-align:left;padding-left:10px">Nombre</th>
                            <th style="width:25%;text-align:center">Pts</th>
                            <th style="width:25%;text-align:center">★</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${alumnos.map((al, i) => `
                            <tr style="color:${al.correo === usuario.correo ? '#ff4d4d' : '#fff'}">
                                <td style="text-align:center">${i + 1}</td>
                                <td style="text-align:left;padding-left:10px">${al.nombre}</td>
                                <td style="text-align:center">${al.puntosTotales}</td>
                                <td style="text-align:center">${al.estrellasTotales}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                `
            tabla.getChildByID('tabla').innerHTML = html

            resolve(true)
        } catch (error) {
            console.error("Error en tablaClasificacion:", error)
            resolve(false)
        }
    })
}

