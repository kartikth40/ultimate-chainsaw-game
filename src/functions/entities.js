import Entity from '../classes/Entity'
import { Jump } from '../classes/traits/Jump'
import { Run } from '../classes/traits/run'
import { loadCharacterSpriteSheet } from './loader'

export const createPlayer = async () => {
  const sprite = await loadCharacterSpriteSheet('trex')
  const player = new Entity()
  player.size.set(32, 32)

  player.addTrait(new Run())
  player.addTrait(new Jump())
  player.draw = function drawPlayer(context) {
    sprite.drawFrames('idle', context, 0, 0)
  }
  return player
}
