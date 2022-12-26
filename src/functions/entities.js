import Entity from '../classes/Entity'
import { Jump } from '../classes/traits/Jump'
import { Run } from '../classes/traits/run'
import { loadCharacterSpriteSheet } from './loader'
import { createAnime } from './anime'

export const createPlayer = async () => {
  const sprite = await loadCharacterSpriteSheet('trex')
  const player = new Entity()
  player.size.set(24, 32)
  player.offset.set(8, 0)

  player.addTrait(new Run())
  player.addTrait(new Jump())

  const runFrames = sprite.tiles.get('run')
  const runAnime = createAnime('run', runFrames, 10)

  const idleFrames = sprite.tiles.get('idle')
  const idleAnime = createAnime('idle', idleFrames, 0.1)

  const routeFrame = (player) => {
    if (player.jump.wallSlide) {
      return ['wall_slide', 0]
    }
    if (!player.jump.onGround) {
      return ['jump', 0]
    }
    if (player.run.direction !== 0) {
      return runAnime(player.run.distance)
    }

    return idleAnime(player.totalTime)
  }

  player.draw = function drawPlayer(context) {
    const [state, frameIndex] = routeFrame(this)
    const flip = player.run.heading < 0
    if (this.run.heading > 0) this.offset.set(8, 0)
    else this.offset.set(0, 0)
    sprite.drawFrames(state, context, frameIndex, 0, 0, flip)
  }
  return player
}
