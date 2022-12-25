import InputHandler from '../classes/InputHandler'
export const setupKeyboard = (entity) => {
  const input = new InputHandler()
  input.addMapping('Space', (keyState) => {
    if (keyState) {
      entity.jump.start(entity)
    } else {
      entity.jump.cancel()
    }
  })

  input.addMapping('ArrowUp', (keyState) => {
    if (keyState) {
      entity.jump.start(entity)
    } else {
      entity.jump.cancel()
    }
  })

  input.addMapping('ArrowRight', (keyState) => {
    entity.run.direction += keyState ? 1 : -1
  })
  input.addMapping('ArrowLeft', (keyState) => {
    entity.run.direction += keyState ? -1 : 1
  })
  input.listenTo(window)
}
