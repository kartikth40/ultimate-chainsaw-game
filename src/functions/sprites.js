import { SpriteSheet } from '../classes/SpriteSheet'
import { loadImage } from './loader'

export const loadPlayerSprite = async () => {
  const image = await loadImage('/img/trex_player.png')
  const sprites = new SpriteSheet(image, 32, 32)
  sprites.define('idle', 0, 0)
  return sprites
}
