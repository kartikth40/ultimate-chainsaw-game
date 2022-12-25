const playzoneWidth = 1900
const playerHoldPositionX = 400
const playerHoldPositionXY = 500
const smoothness = 32

export const setupCameraMovement = (player, camera) => {
  if (player.pos.x > playzoneWidth) {
    camera.pos.x +=
      (playzoneWidth - camera.pos.x - playerHoldPositionX) / smoothness
  } else if (player.pos.x > playerHoldPositionX) {
    camera.pos.x +=
      (player.pos.x - camera.pos.x - playerHoldPositionX) / smoothness
  }

  // if (player.pos.y < playerHoldPositionXY) {
  //   camera.pos.y =
  //     (player.pos.y - camera.pos.y - playerHoldPositionXY) / smoothness
  // }
}
