import { SpriteSheet } from '../classes/SpriteSheet'
import { loadImage } from './loader'

export const loadPlayerSprite = async () => {
  const image = await loadImage('/img/trex_player.png')
  const sprites = new SpriteSheet(image, 32, 32)
  sprites.define('idle', 0, 0)
  return sprites
}

export const loadBackgroundSprites = async () => {
  const image = await loadImage('/img/tiles.png')
  const sprites = new SpriteSheet(image, 32, 32)
  sprites.define('ground', 0, 0)
  sprites.define('sky', 0, 1)
  return sprites
}
