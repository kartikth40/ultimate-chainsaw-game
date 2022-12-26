export const setupMouse = (canvas, entity, camera) => {
  const mouseStates = ['mousedown']
  mouseStates.forEach((eName) => {
    canvas.addEventListener(eName, (e) => {
      if (e.buttons === 1) {
        entity.vel.set(0, 0)
        entity.pos.set(e.offsetX + camera.pos.x, e.offsetY + camera.pos.y)
      }
    })
  })
}
