import InputHandler from '../classes/InputHandler'
export const setupKeyboard = (entity) => {
  const input = new InputHandler()
  input.addMapping('Space', (keyState) => {
    if (keyState) {
      entity.jump.start()
    } else {
      entity.jump.cancel()
    }
  })

  input.addMapping('ArrowUp', (keyState) => {
    if (keyState) {
      entity.jump.start()
    } else {
      entity.jump.cancel()
    }
  })

  input.addMapping('ArrowRight', (keyState) => {
    if (keyState) {
      entity.run.direction = 1
    } else if (input.keyStates.get('ArrowLeft') === 1) {
      entity.run.direction = -1
    } else {
      entity.run.direction = 0
    }
  })
  input.addMapping('ArrowLeft', (keyState) => {
    if (keyState) {
      entity.run.direction = -1
    } else if (input.keyStates.get('ArrowRight') === 1) {
      entity.run.direction = 1
    } else {
      entity.run.direction = 0
    }
  })
  input.listenTo(window)
}
