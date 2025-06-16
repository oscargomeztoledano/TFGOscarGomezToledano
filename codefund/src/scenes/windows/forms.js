import { disappearance,appearance } from "../../utils/animations"
import { getAlumnoByCorreo, postAlumno, getProfesorByCorreo, getAllMundos } from "../../api/apiCalls"
import { panelCarga } from "../../utils/panelCarga"

export function registro(scene){
    const {width, height} = scene.scale
    const container = scene.add.container(width/2, height/2)
    const fondo = scene.add.nineslice(0, 
        -50, 
        'marco3',0,
        300, 300, 10, 10, 10, 10).setOrigin(0.5)
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

    const banner = scene.add.nineslice(
        0, - fondo.height / 2 - 60, 
        'marco1', 0, 
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
        const text = scene.add.text(-100, field.yOffset-25 , field.placeholder, {
            fontFamily: 'Arial Black',
            fontSize: '14px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0,0.5)
        container.add(text)
        const inputType = field.placeholder.toLowerCase().includes('contraseña')  ? 'password' : 'text';
        const input = scene.add.dom(0, field.yOffset).createFromHTML(`
            <input type="${inputType}" id="input-${field.placeholder}" style="width: 200px; padding: 5px;" />
        `)
        container.add(input)
    });
    const emailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordType = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const botones = [
        {icon:'cross', callback:  () => {
            scene.buttonEnabled = true
            disappearance(container, scene)}},
        {icon:'check', callback: () => {
            const emailInput = document.getElementById('input-Correo');
            const nameInput = document.getElementById('input-Nombre');
            const passwordInput = document.getElementById('input-Contraseña');
            const classCodeInput = document.getElementById('input-Código de clase');
            const panel = panelCarga(scene, 'REGISTRANDO...')
            emailInput.style.border = '1px solid #ccc'
            nameInput.style.border = '1px solid #ccc'
            passwordInput.style.border = '1px solid #ccc'
            classCodeInput.style.border = '1px solid #ccc'

            if (!emailInput.value || 
            !nameInput.value  || 
            !passwordInput.value  || 
            !classCodeInput.value ) {
                !emailInput.value ? emailInput.style.border = '4px solid red' : emailInput.style.border = '1px solid #ccc'
                !nameInput.value ? nameInput.style.border = '4px solid red' : nameInput.style.border = '1px solid #ccc'
                !passwordInput.value ? passwordInput.style.border = '4px solid red' : passwordInput.style.border = '1px solid #ccc'
                !classCodeInput.value ? classCodeInput.style.border = '4px solid red' : classCodeInput.style.border = '1px solid #ccc'
                panel.setMensaje('FALTAN CAMPOS POR RELLENAR')
                setTimeout(() => {
                    panel.destroy()
                }, 500)
            }else if (!emailType.test(emailInput.value)) { 
                emailInput.style.border = '4px solid red'
                panel.setMensaje('CORREO NO VALIDO')
                setTimeout(() => {
                    panel.destroy()
                }, 500)
            }else if (!passwordType.test(passwordInput.value)) {
                passwordInput.style.border = '4px solid red'
                panel.setMensaje('CONTRASEÑA NO VALIDA')
                setTimeout(() => {
                    panel.setMensaje('Min 8 caracteres, con al menos 1 mayúscula, 1 minúscula y 1 número')
                    setTimeout(() => {
                        panel.destroy()
                    },1000)
                }, 500)
            }
            else{
                emailInput.style.border = '1px solid #ccc'
                nameInput.style.border = '1px solid #ccc'
                passwordInput.style.border = '1px solid #ccc'
                classCodeInput.style.border = '1px solid #ccc'
                const alumno = {
                    nombre: nameInput.value,
                    correo: emailInput.value,
                    password: passwordInput.value,
                    aula: classCodeInput.value
                };
                
                postAlumno(alumno).then((response) => {
                    emailInput.style.border = '1px solid #ccc'
                    nameInput.style.border = '1px solid #ccc'
                    passwordInput.style.border = '1px solid #ccc'
                    classCodeInput.style.border = '1px solid #ccc'
                    localStorage.removeItem('usuario')
                    localStorage.setItem('usuario', JSON.stringify({
                        nombre: response.nombre,
                        correo: response.correo,
                        aula: response.aula,
                        avatar: response.avatar,
                        progreso: response.progreso,
                        insignias: response.insignias,
                        biblioteca: response.biblioteca,
                        puntosTotales: response.puntosTotales,
                        estrellasTotales: response.estrellasTotales,
                    }))
                    panel.setMensaje('REGISTRO EXITOSO') 
                    getAllMundos().then((mundos) => {
                    localStorage.removeItem('mundos')
                    localStorage.setItem('mundos', JSON.stringify(mundos))
                    }).catch((error) => {
                        console.error("Error fetching worlds:", error)
                    })
                    setTimeout(() => {
                        scene.scene.start('MainMenuJugador')  
                    }, 500)
                })
                .catch((error) => {
                    if (error.response.status === 400) {

                        console.log('Error: ',error)
                        emailInput.style.border = '4px solid red'
                        panel.setMensaje('CORREO YA REGISTRADO')
                        setTimeout(() => {
                            panel.destroy()
                        }, 500)
                    }else if (error.response.status === 404) {
                        emailInput.style.border = '1px solid #ccc'
                        console.log('Error: ',error)
                        classCodeInput.style.border = '4px solid red'
                        panel.setMensaje('AULA NO EXISTE')
                        setTimeout(() => {
                            panel.destroy()
                        }, 500)
                    } 
                    else {
                        console.log('Error:', error)
                        panel.setMensaje('ERROR INESPERADO')
                        setTimeout(() => {
                            panel.destroy()
                        }, 1000)
                    }
                });

                
            }
        }
    }
    ]
    const spacing= 15
    const buttonHeight =  32
    const startX=-(buttonHeight+spacing)
    const startY= 50

    botones.forEach((boton, i) => {
        const x = startX + i * ((buttonHeight + spacing)*2)
        const y = startY

        const button = scene.add.image(x, y, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5)
        container.add(icon)

        button.on('pointerdown', () => {
            scene.tweens.add({
                targets: [button, icon],
                scale: 0.9, 
                duration: 100,
                ease: 'Power1',
                yoyo: true, 
                onComplete: () => {
                    boton.callback(); 
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
    appearance(container, scene)
}   
export function inicioSesion(scene){
    const {width, height} = scene.scale
    const container = scene.add.container(width/2, height/2)
    const fondo = scene.add.nineslice(0, 
        -50, 
        'marco3',0,
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

    const banner = scene.add.nineslice(
        0, - fondo.height / 2 - 60, 
        'marco1', 0, 
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
        const text = scene.add.text(-100, field.yOffset - 25, field.placeholder, {
            fontFamily: 'Arial Black',
            fontSize: '14px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0,0.5)
        container.add(text)
        const inputType = field.placeholder.toLowerCase().includes('contraseña')  ? 'password' : 'text';
        const input = scene.add.dom(0, field.yOffset).createFromHTML(`
            <input type="${inputType}" id="input-${field.placeholder}" style="width: 200px; padding: 5px;" />
        `)
        container.add(input)
    });
    const emailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const botones = [
        {icon:'cross', callback:  () => {
            scene.buttonEnabled = true
            disappearance(container, scene)}},
        {icon:'check', callback: () => {
            const emailInput = document.getElementById('input-Correo')
            const passwordInput = document.getElementById('input-Contraseña')
            if (!emailInput.value || !passwordInput.value) {
                !emailInput.value ? emailInput.style.border = '4px solid red' : emailInput.style.border = '1px solid #ccc'
                !passwordInput.value ? passwordInput.style.border = '4px solid red' : passwordInput.style.border = '1px solid #ccc'
                const panel = panelCarga(scene, 'FALTAN CAMPOS POR RELLENAR')
                setTimeout(() => {
                    panel.destroy()
                }, 500)
            } else if (!emailType.test(emailInput.value)) {
                emailInput.style.border = '4px solid red'
                const panel = panelCarga(scene, 'CORREO NO VALIDO')
                setTimeout(() => {
                    panel.destroy()
                }, 500)
            } else {
                emailInput.style.border = '1px solid #ccc'
                passwordInput.style.border = '1px solid #ccc'
                intentarlogin(emailInput, passwordInput,scene)
            }
        }}
    
    ]
    const spacing= 15
    const buttonHeight =  32
    const startX=-(buttonHeight+spacing)
    const startY= 0 

    botones.forEach((boton, i) => {
        const x = startX + i * ((buttonHeight + spacing)*2)
        const y = startY

        const button = scene.add.image(x, y, 'fondoBoton').setOrigin(0.5).setInteractive({useHandCursor: true})
        container.add(button)
        const icon = scene.add.image(x, y, boton.icon).setOrigin(0.5)
        container.add(icon)

        button.on('pointerdown', () => {
           scene.tweens.add({
                targets: [button, icon],
                scale: 0.9, 
                duration: 100,
                ease: 'Power1',
                yoyo: true, 
                onComplete: () => {
                    boton.callback(); 
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
    appearance(container, scene)
}

async function intentarlogin(email, password,scene){
    const emailInput = email.value
    const passwordInput = password.value
    const panel = panelCarga(scene, 'INICIANDO SESIÓN...')
    try{
        const profesor = await getProfesorByCorreo(emailInput)
        const alumno = await getAlumnoByCorreo(emailInput)
        console.log('Profesor:', profesor)
        console.log('Alumno:', alumno)
        if(profesor && profesor.password=== passwordInput){
            console.log('Sesion iniciada')
            localStorage.removeItem('mundos')
            getAllMundos().then((mundos) => {
                localStorage.setItem('mundos', JSON.stringify(mundos))
            }).catch((error) => {
                console.error("Error fetching worlds:", error)
            })
            localStorage.removeItem('usuario')
            localStorage.setItem('usuario', JSON.stringify({
                nombre: profesor.nombre,
                correo: profesor.correo,
                profesor: true,
                aula: profesor.aula,
                avatar: profesor.avatar,
                aulas: profesor.aulas,
                progreso: profesor.progreso,
                insignias: profesor.insignias,
                biblioteca: profesor.biblioteca,
                puntosTotales: profesor.puntosTotales,
                estrellasTotales: profesor.estrellasTotales,
            }))
            panel.setMensaje(`SESION INICIADA COMO ${profesor.nombre.toUpperCase()}`)
            setTimeout(() => {
                panel.destroy()
                scene.scene.start('MainMenuProfesor')
            }, 500)
        }
        else if (profesor && profesor.password !== passwordInput){
            console.log('Contraseña incorrecta')
            password.style.border = '4px solid red'
            panel.setMensaje('CONTRASEÑA INCORRECTA')
            setTimeout(() => {
                panel.destroy()
            }, 1000)
        }
        else if (alumno && alumno.password === passwordInput) {
            console.log('Sesion iniciada')
            localStorage.removeItem('mundos')
            getAllMundos().then((mundos) => {
                localStorage.setItem('mundos', JSON.stringify(mundos))
            }).catch((error) => {
                console.error("Error fetching worlds:", error)
            })
            localStorage.removeItem('usuario')
            localStorage.setItem('usuario', JSON.stringify({
                nombre: alumno.nombre,
                correo: alumno.correo,
                profesor: false,
                aula: alumno.aula,
                avatar: alumno.avatar,
                progreso: alumno.progreso,
                insignias: alumno.insignias,
                biblioteca: alumno.biblioteca,
                puntosTotales: alumno.puntosTotales,
                estrellasTotales: alumno.estrellasTotales,
            }))
            panel.setMensaje(`SESION INICIADA COMO ${alumno.nombre.toUpperCase()}`)
            setTimeout(() => {
                panel.destroy()
                scene.scene.start('MainMenuJugador')                    
            }, 500)
        }
        else if (alumno && alumno.password !== passwordInput){
            console.log('Contraseña incorrecta')
            password.style.border = '4px solid red'
            panel.setMensaje('CONTRASEÑA INCORRECTA')
            setTimeout(() => {
                panel.destroy()
            }, 1000)
        }
        else{
            email.style.border = '4px solid red'
            panel.setMensaje('CORREO NO VALIDO')
            setTimeout(() => {
                panel.destroy()
            }, 1000)
        }
    }catch (error) {
        console.error(error)
    }
}