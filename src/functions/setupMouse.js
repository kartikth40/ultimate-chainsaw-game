export const setupMouse = (canvas, entity, camera) => {
  let lastEvent
  const mouseStates = ['mousedown', 'mousemove']
  mouseStates.forEach((eName) => {
    canvas.addEventListener(eName, (e) => {
      if (e.buttons === 1) {
        entity.vel.set(0, 0)
        entity.pos.set(e.offsetX + camera.pos.x, e.offsetY + camera.pos.y)
      } else if (
        e.buttons === 2 &&
        lastEvent &&
        lastEvent.buttons === 2 &&
        lastEvent.type === 'mousemove'
      ) {
        camera.pos.x -= e.offsetX - lastEvent.offsetX
      }
      lastEvent = e
    })
  })
  canvas.addEventListener('contextmenu', (e) => e.preventDefault())
}
