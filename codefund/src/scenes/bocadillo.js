import { appearance } from "./animations"

export function bocadilloCollectible (scene, collectible){
    if (!scene.bocadillo) {
        const padding = 10
        scene.icon = scene.add.sprite(0, 0, 'E0').setScale(0.5)
        const w = scene.icon.displayWidth + (padding * 2)
        const h = scene.icon.displayHeight + (padding * 2)

        scene.bocadillo = scene.add.nineslice(
            collectible.x+(collectible.width/2), collectible.y - 80,
            'tile1', 0, w, h, 10, 10, 10, 10
        )
        scene.icon.setDepth(scene.bocadillo.depth + 1)
        
        scene.icon.setPosition(
            scene.bocadillo.x,
            scene.bocadillo.y
        )
        appearance(scene.bocadillo, scene, 0)
        appearance(scene.icon, scene, 50)

        scene.icon.anims.play('press_e', true)
        
    }
}
export function bocadilloCheckPoint (scene, prevText, postText){
    if (!scene.bocadillo) {
        scene.isOverLappingCheckpoint = true;
        const padding = 10;

        // Sprite animado de la E
        scene.icon = scene.add.sprite(0, 0, 'E0').setScale(0.5);
        scene.icon.anims.play('press_e', true);

        // Texto adicional
        scene.textBefore = scene.add.text(0, 0, prevText, {
            fontFamily: 'Arial', fontSize: 14, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5, 0.5);

        scene.textAfter = scene.add.text(0, 0, postText, {
            fontFamily: 'Arial', fontSize: 14, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5, 0.5);

        // Calcular dimensiones
        const totalWidth = scene.textBefore.displayWidth + scene.icon.displayWidth + scene.textAfter.displayWidth + (padding * 4);
        const h = Math.max(scene.textBefore.displayHeight, scene.icon.displayHeight, scene.textAfter.displayHeight) + (padding * 2);

        scene.bocadillo = scene.add.nineslice(
            scene.checkpoint.x - 80, scene.checkpoint.y - 100,
            'tile1', 0, totalWidth, h, 10, 10, 10, 10
        );

        // Posiciones relativas
        let xStart = scene.bocadillo.x - totalWidth / 2 + padding;
        const y = scene.bocadillo.y;

        scene.textBefore.setPosition(xStart + scene.textBefore.displayWidth / 2, y);
        xStart += scene.textBefore.displayWidth + padding;

        scene.icon.setPosition(xStart + scene.icon.displayWidth / 2, y);
        xStart += scene.icon.displayWidth + padding;

        scene.textAfter.setPosition(xStart + scene.textAfter.displayWidth / 2, y);

        // Capas
        const depth = scene.bocadillo.depth + 1;
        scene.icon.setDepth(depth);
        scene.textBefore.setDepth(depth);
        scene.textAfter.setDepth(depth);

        appearance(scene.bocadillo, scene, 0);
        appearance(scene.icon, scene, 50);
        appearance(scene.textBefore, scene, 50);
        appearance(scene.textAfter, scene, 50);
    }
}
export function bocadilloScroll(scene, text){
    if (!scene.bocadillo) {
        scene.isOverLappingScroll = true;
        scene.text= scene.add.text(0, 0, text, {
            fontSize: '16px',
            color: '#000',
            wordWrap: { width: 200, useAdvancedWrap: true  }, // más espacio
            align: 'center',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        const padding = 10;

        // Calcular dimensiones del bocadillo
        const w = scene.text.displayWidth + (padding * 2);
        const h = scene.text.displayHeight + (padding * 2);

        // Crear el bocadillo con nine slice
        scene.bocadillo = scene.add.nineslice(
            scene.scroll.x+100, scene.scroll.y - 150,
            'tile1', 0, w, h, 10, 10, 10, 10
        );

        // Reubicar el texto dentro del bocadillo
        scene.text.setPosition(
            scene.bocadillo.x,
            scene.bocadillo.y
        );

        // Ajustar capas
        const depth = scene.bocadillo.depth + 1;
        scene.text.setDepth(depth);

        // Animaciones de aparición
        appearance(scene.bocadillo, scene, 0);
        appearance(scene.text, scene, 50);
    }
}