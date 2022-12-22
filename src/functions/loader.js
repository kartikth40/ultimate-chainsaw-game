import { Map } from '../classes/Map'
import { createBackgroundLayer, createSpriteLayer } from './layers'
import { loadBackgroundSprites } from './sprites'

export const loadImage = (url) => {
  return new Promise((resolve) => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

const createTiles = (map, backgrounds) => {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; x++) {
        for (let y = y1; y < y2; y++) {
          map.tiles.set(x, y, {
            name: background.tile,
          })
        }
      }
    })
  })
}

export const loadMap = async (name) => {
  const [mapSpec, backgroundSprites] = await Promise.all([
    import(`../maps/${name}.json`),
    loadBackgroundSprites(),
  ])
  const map = new Map()

  createTiles(map, mapSpec.backgrounds)

  const backgroundLayer = createBackgroundLayer(map, backgroundSprites)
  map.comp.layers.push(backgroundLayer)

  const spriteLayer = createSpriteLayer(map.entities)
  map.comp.layers.push(spriteLayer)

  return map
}
