export function panelCarga(scene, mensaje){
    const {width, height} = scene.scale
    const panel = scene.add.container(width/2, height/2).setDepth(9999)
    const x= 350
    const y= -340
    const texto = scene.add.text(x, y, mensaje, {
        fontSize: '16px',
        fontFamily: 'Arial',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
        align: 'center',
        wordWrap: {
            width: 200,
            useAdvancedWrap: true
        }
    }).setOrigin(0.5)

    const fondo = scene.add.nineslice(
        x, y, 'marco3', 0, texto.displayWidth + 20, texto.displayHeight + 20, 10, 10, 10, 10
    ).setOrigin(0.5)

    panel.add(fondo)
    panel.add(texto)
    panel.setAlpha(0)

    scene.tweens.add({
        targets: panel,
        alpha: 1,
        duration: 500,
        ease: 'Power2'
    });

    return {
        panel,
        setMensaje: (nuevoMensaje) => {
            texto.setText(nuevoMensaje)
            scene.time.delayedCall(0, () => {
            fondo.setSize(texto.width + 20, texto.height + 20)
            });
        },
        destroy: () => {
            scene.tweens.add({
                targets: panel,
                alpha: 0,
                duration: 200,
                ease: 'Power2',
                onComplete: () => panel.destroy()
            });
        }
    }
} 