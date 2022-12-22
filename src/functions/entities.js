import Entity from '../classes/Entity'
import { Jump } from '../classes/traits/Jump'
import { Velocity } from '../classes/traits/Velocity'
import { loadPlayerSprite } from './sprites'

export const createPlayer = async () => {
  const sprite = await loadPlayerSprite()
  const player = new Entity()
  player.size.set(32, 64)

  player.addTrait(new Jump())
  player.addTrait(new Velocity())
  player.draw = function drawPlayer(context) {
    sprite.draw('idle', context, this.pos.x, this.pos.y)
  }
  return player
}
