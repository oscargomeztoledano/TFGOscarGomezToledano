export function controls ({player,keys}){
    const isPlayerTouchingFloor = player.body.touching.down
    const isKeyAPressed = keys.A.isDown;
    const isKeyDPressed = keys.D.isDown;
    const isSpacePressed = keys.SPACE.isDown;
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    if (isKeyAPressed) {
        isPlayerTouchingFloor && player.anims.play(`player-run${usuario.avatar}`, true)
        player.x -= 4
        player.flipX = true
    }
    else if (isKeyDPressed) {
        isPlayerTouchingFloor && player.anims.play(`player-run${usuario.avatar}`, true)
        player.x += 4
        player.flipX = false
    } else if (isPlayerTouchingFloor) {
        player.anims.play(`player-idle${usuario.avatar}`, true)
    }

    if (isSpacePressed && isPlayerTouchingFloor) {
        player.setVelocityY(-350)
        player.anims.play(`player-jump${usuario.avatar}`)
    }
    if (!isPlayerTouchingFloor && player.body.velocity.y >=  -30 ) {
        player.anims.play(`player-fall${usuario.avatar}`, true)
        player.setVelocityY(200)
    }
}