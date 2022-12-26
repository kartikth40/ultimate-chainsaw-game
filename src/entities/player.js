import Entity from '../classes/Entity'
import { Jump } from '../classes/traits/Jump'
import { Run } from '../classes/traits/run'
import { loadCharacterSpriteSheet } from '../functions/loader'
import { createAnime } from '../functions/anime'

export const loadPlayer = async () => {
  const sprite = await loadCharacterSpriteSheet('trex')
  return createPlayerFactory(sprite)
}

const createPlayerFactory = (sprite) => {
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

  function drawPlayer(context) {
    const [state, frameIndex] = routeFrame(this)
    const flip = this.run.heading < 0
    if (this.run.heading > 0) this.offset.set(8, 0)
    else this.offset.set(0, 0)
    sprite.drawFrames(state, context, frameIndex, 0, 0, flip)
  }

  return function createPlayer() {
    const player = new Entity()
    player.size.set(24, 30)
    player.offset.set(8, 0)

    player.addTrait(new Run())
    player.addTrait(new Jump())

    player.draw = drawPlayer
    return player
  }
}
