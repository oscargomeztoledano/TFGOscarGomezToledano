import { disappearance } from "./animations";

export function crearVidas(scene){
    const vidas = [];
    const startX = 800; // Starting X position
    const startY = 40; // Starting Y position
    const spacing = 60; // Space between each 'player-head'

    for (let i = 0; i < 3; i++) { // Assuming 3 lives
        const vida = scene.add.image(startX + i * spacing, startY, 'player_head').setOrigin(0,0).setScale(2)
        vidas.push(vida)
    }

    scene.vidas = vidas // Store the array in the scene for later use
}

export function quitarvida(scene){
    if (scene.vidas && scene.vidas.length > 0) {
        const vida = scene.vidas.shift(); // Remove the first life from the array
        vida.destroy(); // Destroy the image
    }
}