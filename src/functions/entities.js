import Entity from '../classes/Entity'
import { Jump } from '../classes/traits/Jump'
import { Run } from '../classes/traits/run'
import { loadCharacterSpriteSheet } from './loader'
import { createAnime } from './anime'

export const createPlayer = async () => {
  const sprite = await loadCharacterSpriteSheet('trex')
  const player = new Entity()
  player.size.set(32, 32)

  player.addTrait(new Run())
  player.addTrait(new Jump())

  const frames = sprite.tiles.get('run')
  const runAnime = createAnime(frames, 10)

  const routeFrame = (player) => {
    if (player.run.direction !== 0) {
      return runAnime(player.run.distance)
    }

    return ['idle', 0]
  }

  player.draw = function drawPlayer(context) {
    const [state, frameIndex] = routeFrame(this)
    const flip = player.run.heading < 0
    sprite.drawFrames(state, context, frameIndex, 0, 0, flip)
  }
  return player
}
