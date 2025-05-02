export function controls ({player,keys}){
    const isPlayerTouchingFloor = player.body.touching.down
    const isKeyAPressed = keys.A.isDown;
    const isKeyDPressed = keys.D.isDown;
    const isSpacePressed = keys.SPACE.isDown;

    if (isKeyAPressed) {
        isPlayerTouchingFloor && player.anims.play('player-run', true)
        player.x -= 4
        player.flipX = true
    }
    else if (isKeyDPressed) {
        isPlayerTouchingFloor && player.anims.play('player-run', true)
        player.x += 4
        player.flipX = false
    } else if (isPlayerTouchingFloor) {
        player.anims.play('player-idle', true)
    }

    if (isSpacePressed && isPlayerTouchingFloor) {
        player.setVelocityY(-350)
        player.anims.play('player-jump')
    }
    if (!isPlayerTouchingFloor && player.body.velocity.y >=  -30 ) {
        player.anims.play('player-fall', true)
        player.setVelocityY(200)
    }
}