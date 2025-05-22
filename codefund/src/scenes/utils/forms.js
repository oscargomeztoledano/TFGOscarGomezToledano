import { disappearance,appearance } from "./animations"
import { getAlumnoByCorreo, postAlumno, getProfesorByCorreo } from "../../utils/apiCalls"

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

    const botones = [
        {icon:'cross', callback:  () => {
            scene.buttonEnabled = true
            disappearance(container, scene)}},
        {icon:'check', callback: () => {
            const emailInput = document.getElementById('input-Correo');
            const nameInput = document.getElementById('input-Nombre');
            const passwordInput = document.getElementById('input-Contraseña');
            const classCodeInput = document.getElementById('input-Código de clase');

           if (!emailInput.value || 
            !nameInput.value  || 
            !passwordInput.value  || 
            !classCodeInput.value ) {
                !emailInput.value ? emailInput.style.border = '4px solid red' : emailInput.style.border = '1px solid #ccc'
                !nameInput.value ? nameInput.style.border = '4px solid red' : nameInput.style.border = '1px solid #ccc'
                !passwordInput.value ? passwordInput.style.border = '4px solid red' : passwordInput.style.border = '1px solid #ccc'
                !classCodeInput.value ? classCodeInput.style.border = '4px solid red' : classCodeInput.style.border = '1px solid #ccc'
           }else{
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
                postAlumno(alumno)
                    .then((response) => {
                        emailInput.style.border = '1px solid #ccc'
                        nameInput.style.border = '1px solid #ccc'
                        passwordInput.style.border = '1px solid #ccc'
                        classCodeInput.style.border = '1px solid #ccc'
                        disappearance(container, scene)
                        localStorage.removeItem('usuario')
                        localStorage.setItem('usuario', JSON.stringify({
                            nombre: response.nombre,
                            correo: response.correo,
                            aula: response.aula,
                            avatar: response.avatar,
                            mundos: response.mundos,
                            insignias: response.insignias,
                            biblioteca: response.biblioteca,
                            puntosTotales: response.puntosTotales,
                            estrellasTotales: response.estrellasTotales,
                        }))
                        scene.time.delayedCall(200, () => {
                            scene.scene.start('MainMenu')
                        })
                    })
                    .catch((error) => {
                        if (error.response.status === 400) {
                            console.log('Error: ',error)
                            emailInput.style.border = '4px solid red'
                        }else if (error.response.status === 404) {
                            emailInput.style.border = '1px solid #ccc'
                            console.log('Error: ',error)
                            classCodeInput.style.border = '4px solid red'
                        } 
                        else {
                            console.log('Error:', error)
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

    const botones = [
        {icon:'cross', callback:  () => {
            scene.buttonEnabled = true
            disappearance(container, scene)}},
        {icon:'check', callback: () => {
            const emailInput = document.getElementById('input-Correo');
            const passwordInput = document.getElementById('input-Contraseña');
            intentarlogin(emailInput, passwordInput,scene) 
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

async function intentarlogin(email, password,scene){
    const emailInput = email.value
    const passwordInput = password.value
    try{
        const profesor = await getProfesorByCorreo(emailInput)
        if(profesor.password=== passwordInput){
            console.log('Sesion iniciada')
            localStorage.removeItem('usuario')
            localStorage.setItem('usuario', JSON.stringify({
                nombre: profesor.nombre,
                correo: profesor.correo,
                profesor: true,
                aula: profesor.aula,
                avatar: profesor.avatar,
                aulas: profesor.aulas,
                mundos: profesor.mundos,
                insignias: profesor.insignias,
                biblioteca: profesor.biblioteca,
                puntosTotales: profesor.puntosTotales,
                estrellasTotales: profesor.estrellasTotales,
            }))
            scene.time.delayedCall(200, () => {
                scene.scene.start('MainMenuProfesor')
            })
            }
            else{
                console.log('Contraseña incorrecta')
                password.style.border = '4px solid red'
            }
    }catch (error) {
        if (error.response?.status !== 404) {
            console.error('Error al intentar iniciar sesión:', error);
        }
        try{
            const alumno = await getAlumnoByCorreo(email.value)
            if(alumno.password=== password.value){
                console.log('Sesion iniciada')
                localStorage.removeItem('usuario')
                localStorage.setItem('usuario', JSON.stringify({
                    nombre: alumno.nombre,
                    correo: alumno.correo,
                    profesor: false,
                    aula: alumno.aula,
                    avatar: alumno.avatar,
                    mundos: alumno.mundos,
                    insignias: alumno.insignias,
                    biblioteca: alumno.biblioteca,
                    puntosTotales: alumno.puntosTotales,
                    estrellasTotales: alumno.estrellasTotales,
                }))
                scene.time.delayedCall(200, () => {
                    scene.scene.start('MainMenu')
                })

            }else{
                console.log('Contraseña incorrecta')
                passwordInput.style.border = '4px solid red'
            }
        }catch (error2) {
                if (error2.response?.status === 404) {
                    console.log('El correo no existe')
                    email.style.border = '4px solid red'
                }
                else (console.log('Error al comprobar el alumno:', error2))
        }
    }
}