import { appearance,disappearance } from "../../utils/animations"
import { guardarProgreso, guardarProgresoProfesor } from "../../api/apiCalls"
import { panelCarga } from "../../utils/panelCarga"

export function characterSelect(scene){
    return new Promise((resolve) => {  
        try {
            const {width, height} = scene.scale;
            const container = scene.add.container(width/2, height/2)
            scene.buttonEnableCH=true
            const fondo = scene.add.nineslice(
                0, -50, 'marco3', 0,300,430,10,10,10,10).setOrigin(0.5)
            container.add(fondo)
            const bannerText = scene.add.text(0, 0, 'SELECCIONA UN PERSONAJE', {
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

            const usuario = JSON.parse(localStorage.getItem('usuario'))
            const botonesPrincipales = [
                {character: 'player_idle0', texto: 'PERSONAJE 1',
                    callback: () => {
                        scene.buttonEnableCH = false
                        const usuarioActualizado ={avatar:0}
                        const panel = panelCarga(scene, 'Actualizando avatar...')
                        const guardar = usuario.profesor 
                        ? guardarProgresoProfesor(usuario.correo, usuarioActualizado) 
                        : guardarProgreso(usuario.correo, usuarioActualizado)
                        setTimeout(() => {
                            guardar.then((res) => {
                                localStorage.setItem('usuario', JSON.stringify({...usuario, avatar: res.avatar}))
                                panel.setMensaje('Avatar actualizado correctamente')
                                setTimeout(() => {
                                    scene.buttonEnableCH = true
                                    panel.destroy()
                                }, 500)
                            })
                        }, 500)
                    }
                },
                {character: 'player_idle1', texto: 'PERSONAJE 2',
                    callback: () => {
                        scene.buttonEnableCH = false
                        const usuarioActualizado ={avatar:1}
                        const panel = panelCarga(scene, 'Actualizando avatar...')
                        const guardar = usuario.profesor 
                        ? guardarProgresoProfesor(usuario.correo, usuarioActualizado) 
                        : guardarProgreso(usuario.correo, usuarioActualizado)
                        setTimeout(() => {
                            guardar.then((res) => {
                                localStorage.setItem('usuario', JSON.stringify({...usuario, avatar: res.avatar}))
                                panel.setMensaje('Avatar actualizado correctamente')
                                setTimeout(() => {
                                    scene.buttonEnableCH = true
                                    panel.destroy()
                                }, 500)
                            })
                        }, 500)
                    }
                },
                {character: 'player_idle2', texto: 'PERSONAJE 3',
                    callback: () => {
                        scene.buttonEnableCH = false
                        const usuarioActualizado ={avatar:2}
                        const panel = panelCarga(scene, 'Actualizando avatar...')
                        const guardar = usuario.profesor 
                        ? guardarProgresoProfesor(usuario.correo, usuarioActualizado) 
                        : guardarProgreso(usuario.correo, usuarioActualizado)
                        setTimeout(() => {
                            guardar.then((res) => {
                                localStorage.setItem('usuario', JSON.stringify({...usuario, avatar: res.avatar}))
                                panel.setMensaje('Avatar actualizado correctamente')
                                setTimeout(() => {
                                    scene.buttonEnableCH = true
                                    panel.destroy()
                                }, 500)
                            })
                        }, 500)
                    }
                },
                {character: 'player_idle3', texto: 'PERSONAJE 4',
                    callback: () => {
                        scene.buttonEnableCH = false
                        const usuarioActualizado ={avatar:3}
                        const panel = panelCarga(scene, 'Actualizando avatar...')
                        const guardar = usuario.profesor 
                        ? guardarProgresoProfesor(usuario.correo, usuarioActualizado) 
                        : guardarProgreso(usuario.correo, usuarioActualizado)
                        setTimeout(() => {
                            guardar.then((res) => {
                                localStorage.setItem('usuario', JSON.stringify({...usuario, avatar: res.avatar}))
                                panel.setMensaje('Avatar actualizado correctamente')
                                setTimeout(() => {
                                    scene.buttonEnableCH = true
                                    panel.destroy()
                                }, 500)
                            })
                        }, 500)
                    }
                },
            ]
            const buttonWidth = 200
            const buttonHeight = 65
            const buttonSpacing = 20
            const startY = - ((botonesPrincipales.length * (buttonHeight + buttonSpacing)) / 2) -20;

            botonesPrincipales.forEach((boton, i) => {
                const y = startY + i * (buttonHeight + buttonSpacing)
                
                const button = scene.add.nineslice(
                    0, y, 
                    'fondoBoton', 0, 
                    buttonWidth, buttonHeight, 
                    10, 10, 10, 10
                ).setOrigin(0.5).setInteractive({useHandCursor: true})
                container.add(button)
                const character = scene.add.sprite(-buttonWidth/2+30, y-5, boton.character).setOrigin(0.5).setScale(2)
                character.anims.play(`player-idle${i}`, true)
                container.add(character)
                const buttonText = scene.add.text(
                    - buttonWidth / 2 + 70, y,
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
                    if (scene.buttonEnableCH) boton.callback()
                })
                button.on('pointerover', () => {
                    button.setScale(1.1);
                    character.setScale(2.2);
                    character.anims.play(`player-run${i}`, true)
                    buttonText.setScale(1.1);
                })
                button.on('pointerout', () => {
                    button.setScale(1);
                    character.anims.play(`player-idle${i}`, true)
                    character.setScale(2);
                    buttonText.setScale(1);
                })
                container.add([button, character, buttonText])
            })

            const buttonClose = scene.add.image(0, 135, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
            container.add(buttonClose)
            const icon = scene.add.image(0, 135, 'cross').setOrigin(0.5)
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
            appearance(container, scene)
            resolve(true)
        } catch (error) {
            console.error('Error en characterSelect:', error);
            resolve(false);
        }
    })

}