import { appearance,disappearance } from "../../utils/animations";
import { ALL_ACHIEVEMENTS } from "../../utils/achivements";
import { panelCarga } from "../../utils/panelCarga";
import { Scene } from "phaser";

export function insignias(scene, usuario){
    return new Promise((resolve) => {
        try {
            const {width, height} = scene.scale
            const container = scene.add.container(width/2, height/2)
            const fondo = scene.add.nineslice(
                0, -30, 'marco3', 0,500,450,10,10,10,10).setOrigin(0.5)
            container.add(fondo)
            const bannerText = scene.add.text(0, 0, 'INSIGNIAS', {
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
            const icon = scene.add.image(0, 165, 'cross').setOrigin(0.5)
            container.add(icon)
            buttonClose.on('pointerdown', () => {
                const panel = panelCarga(scene, 'CERRANDO INSIGNIAS...')
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

            const earned = usuario.insignias
            const cols = 7;                                  
            const cellW = 65, cellH = 65;
            const startX = -cellW * (cols-1)/2;
            const startY = -170;

            
            ALL_ACHIEVEMENTS.forEach((ach, idx) => {

                const col = idx % cols;
                const row = Math.floor(idx / cols);
                const x = startX + col * cellW;
                const y = startY + row * cellH;

                const icon = scene.add.image(x, y-10, ach.icon).setOrigin(0.5).setScale(1.5)
                container.add(icon)

                const isEarned = earned.includes(ach.id);

                if (!isEarned) {            
                icon.setAlpha(0.35);
                } else {                    
                const tip = scene.add.text(0,0, ach.desc, {
                    fontSize:'12px', backgroundColor:'#000', padding:{x:6,y:4}
                }).setOrigin(0.5).setVisible(false).setDepth(1000);
                container.add(tip);

                icon.setInteractive({useHandCursor:false})
                    .on('pointerover', p=>{
                        tip.setPosition(x, y-50).setVisible(true);
                    })
                    .on('pointerout', ()=> tip.setVisible(false));
                }
            });
            appearance(container, scene)
            resolve(true)
        } catch (error) {
            console.error('Error en insignias:', error);
            resolve(false);
        }
    })
}