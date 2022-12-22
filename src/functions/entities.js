import Entity from '../classes/Entity'
import { Jump } from '../classes/traits/Jump'
import { Velocity } from '../classes/traits/Velocity'
import { loadPlayerSprite } from './sprites'

export const createPlayer = () => {
  return loadPlayerSprite().then((sprite) => {
    const player = new Entity()

    player.addTrait(new Velocity())
    player.addTrait(new Jump())

    player.draw = function drawPlayer(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y)
    }

    return player
  })
}
