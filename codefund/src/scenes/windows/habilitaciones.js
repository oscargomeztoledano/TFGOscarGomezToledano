import { appearance, disappearance } from "../../utils/animations"
import { getMundosByAula, guardarMundoAula } from "../../api/apiCalls"
import { panelCarga } from "../../utils/panelCarga"

var tabla = ''
var listaMundos = []
export  function habilitaciones(scene,usuario) {
    return new Promise((resolve) => {
        try {
            scene.buttonEnabledHabilitaciones = true
            const {width, height} = scene.scale
            const container = scene.add.container(width/2, height/2).setAlpha(0)
            const fondo = scene.add.nineslice(
                0, -30, 'marco3', 0,400,500,10,10,10,10).setOrigin(0.5)
            container.add(fondo)
            const bannerText = scene.add.text(0, 0, 'HABILITACIONES', {
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

            const botones = [
                {icon: 'cross', callback: () => {
                const panel = panelCarga(scene, 'CERRANDO HABILITACIONES...')
                    setTimeout(() => {
                        panel.destroy()
                        scene.buttonEnabledMain = true
                        disappearance(container, scene)
                    },500)
                } 
                },
                {icon: 'check', callback: async () => {
                    const panel = panelCarga(scene, 'GUARDANDO...')
                    const aulaSelected = selectorDom.getChildByID('selAula').value
                    const habilitados = [];
                    tabla.getChildByID('tabla')
                        .querySelectorAll('.selEstado')
                        .forEach(sel => {
                            if (sel.value === 'HABILITADO') {
                                const idx = parseInt(sel.dataset.mundo, 10);
                                habilitados.push(listaMundos[idx]);   
                            }
                        });
                    const aulaActualizada={
                        mundos: habilitados
                    }
                    await guardarMundoAula(aulaSelected, aulaActualizada).then((response) => {
                        panel.setMensaje('GUARDADO CORRECTAMENTE')
                        setTimeout(() => {
                            panel.destroy()
                        }, 500)
                        updateTabla(aulaSelected)
                    }).catch((error) => {
                        console.error("Error updating mundos:", error)
                    })
                    scene.buttonEnabledHabilitaciones = true
                }
                }
            ]
            const spacing= 15
            const buttonHeight =  32
            const startX=-(buttonHeight+spacing)
            botones.forEach((boton,i)=>{
                const x= startX + i * ((buttonHeight + spacing)*2)
                const y = 190

                const button= scene.add.image(x, y, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
                container.add(button)
                const icon = scene.add.image(x, y,boton.icon).setOrigin(0.5)
                container.add(icon)
                button.on('pointerdown', () => {
                scene.buttonEnabledHabilitaciones = false
                    scene.tweens.add({
                    targets: [button, icon],
                    scale: 0.9, 
                    duration: 100,
                    ease: 'Power1',
                    yoyo: true, 
                    onComplete: () => {
                            boton.callback()
                    }
                });
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

            const selectorText = scene.add.text(-10, -250, 'Selecciona Aula:', {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }).setOrigin(1,0.5);
            container.add(selectorText)

            const selectorDom = scene.add
                .dom(10, -250)
                .createFromHTML(`
                    <select id="selAula" style="width:70px;height:25px;font-size:14px;text-align:center">
                        ${usuario.aulas.map(a => `<option value="${a}">${a}</option>`).join('')}
                    </select>
                `)
                .setOrigin(0, 0.5);
            container.add(selectorDom)

            const tablaFondo = scene.add.nineslice(0, -30, 'fondoBoton', 0, 300, 375
            , 10, 10, 10, 10).setOrigin(0.5)
            container.add(tablaFondo)

            tabla = scene.add.dom(0, -30).createFromHTML(`<div id="tabla" style="width:300px;height:375px;overflow-y:auto;color:#fff">
            </div>`).setOrigin(0.5)
            container.add(tabla)

            appearance(container, scene)


            listaMundos = usuario.mundos.map(m => m.nombre.toUpperCase())

            selectorDom.getChildByID('selAula').addEventListener('change', e=> {
                const panel = panelCarga(scene, 'ACTUALIZANDO TABLA...')
                setTimeout(() => {
                    panel.destroy()
                }, 500)
                updateTabla(e.target.value)
            })
            updateTabla(usuario.aulas[0])
            resolve(true)
        } catch (error) {
            console.error("Error in habilitaciones:", error);
            resolve(false);
        }
    })

    async function updateTabla(aula) {
        let mundos = []
        await getMundosByAula(aula).then((response) => {
            mundos = response.mundos
        }).catch((error) => {
            console.error("Error fetching mundos by aula:", error);
            mundos = []
        })
            
        const html = `
        <table style="width:100%;font-family:Arial;font-size:14px">
            <thead>
            <tr style="color:yellow">
                <th style="width:50%;text-align:left;padding-left:10px">Mundo</th>
                <th style="width:50%;text-align:center">Estado</th>
            </tr>
            </thead>
            <tbody>
            ${listaMundos.map((nombre, idx) => {
                const ishabilitado = mundos.includes(nombre);
                return`
                <tr>
                <td style="padding-left:10px">${nombre}</td>
                <td style="text-align:center">
                    <select class="selEstado" data-mundo="${idx}"
                            style="width:130px;height:24px;text-align:center">
                    <option value="HABILITADO"   ${ishabilitado ? 'selected' : ''}>HABILITADO</option>
                    <option value="DESHABILITADO" ${!ishabilitado ? 'selected' : ''}>DESHABILITADO</option>
                    </select>
                </td>
                </tr>`
            }).join('')}
            </tbody>
        </table>
        `

        tabla.getChildByID('tabla').innerHTML = html;
    }
    

}
