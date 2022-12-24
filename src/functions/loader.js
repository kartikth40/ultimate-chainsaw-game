import { Map } from '../classes/Map'
import { SpriteSheet } from '../classes/SpriteSheet'
import { createBackgroundLayer, createSpriteLayer } from './layers'

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
  const applyRange = (background, xStart, xLen, yStart, yLen) => {
    const xEnd = xStart + xLen
    const yEnd = yStart + yLen

    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        map.tiles.set(x, y, {
          name: background.tile,
          state: background.state,
        })
      }
    }
  }

  backgrounds.forEach((background) => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range
        applyRange(background, xStart, xLen, yStart, yLen)
      } else if (range.length === 2) {
        const [xStart, yStart] = range
        applyRange(background, xStart, 1, yStart, 1)
      }
    })
  })
}

const loadMapJSON = async (name) => {
  const json = await import(`../maps/${name}.json`)
  return json
}
const loadCharacterJSON = async (name) => {
  const json = await import(`../characters/${name}.json`)
  return json
}

export const loadMapSpriteSheet = async (name) => {
  const sheetSpec = await loadMapJSON(name)
  const image = await loadImage(sheetSpec.imageURL)
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
  sheetSpec.tiles.forEach((tileSpec) => {
    sprites.define(tileSpec.name, tileSpec.index[0], tileSpec.index[1])
  })
  return sprites
}

export const loadCharacterSpriteSheet = async (name) => {
  const sheetSpec = await loadCharacterJSON(name)
  const image = await loadImage(sheetSpec.imageURL)
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
  sheetSpec.states.forEach((frameSpec) => {
    sprites.defineState(frameSpec.name, frameSpec.range)
  })
  return sprites
}

export const loadMap = async (name) => {
  const [mapSpec, backgroundSprites] = await Promise.all([
    loadMapJSON(name),
    loadMapSpriteSheet(name),
  ])
  const map = new Map()

  createTiles(map, mapSpec.backgrounds)

  const backgroundLayer = createBackgroundLayer(map, backgroundSprites)
  map.comp.layers.push(backgroundLayer)

  const spriteLayer = createSpriteLayer(map.entities)
  map.comp.layers.push(spriteLayer)

  return map
}
