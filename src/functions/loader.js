import { SpriteSheet } from '../classes/SpriteSheet'

export const loadImage = (url) => {
  return new Promise((resolve) => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

export const loadMapJSON = async (name) => {
  const json = await import(`../maps/${name}.json`)
  return json
}
export const loadCharacterJSON = async (name) => {
  const json = await import(`../entities/${name}.json`)
  return json
}

export const loadMapSpriteSheet = async (name) => {
  const sheetSpec = await loadMapJSON(name)
  const image = await loadImage(sheetSpec.imageURL)
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
  sheetSpec.TILES.forEach((tileSpec) => {
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
