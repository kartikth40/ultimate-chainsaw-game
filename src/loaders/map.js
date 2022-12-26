import { Map } from '../classes/Map'
import { Matrix } from '../classes/Math'
import { createBackgroundLayer, createSpriteLayer } from '../functions/layers'
import { loadMapJSON, loadMapSpriteSheet } from '../functions/loader'

export const loadMap = async (name) => {
  const [mapSpec, backgroundSprites] = await Promise.all([
    loadMapJSON(name),
    loadMapSpriteSheet(name),
  ])
  const map = new Map()

  const mergedTiles = mapSpec.layers.reduce((mergedTiles, layerSpec) => {
    return mergedTiles.concat(layerSpec.tiles)
  }, [])

  const collisionGrid = createCollisionGrid(mergedTiles, mapSpec.patterns)
  map.setCollisionGrid(collisionGrid)

  mapSpec.layers.forEach((layer) => {
    const backgroundGrid = createBackgroundGrid(layer.tiles, mapSpec.patterns)
    const backgroundLayer = createBackgroundLayer(
      backgroundGrid,
      backgroundSprites
    )
    map.comp.layers.push(backgroundLayer)
  })

  const spriteLayer = createSpriteLayer(map.entities)
  map.comp.layers.push(spriteLayer)

  return map
}

const createCollisionGrid = (tiles, patterns) => {
  const grid = new Matrix()
  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { state: tile.state })
  }
  return grid
}

const createBackgroundGrid = (tiles, patterns) => {
  const grid = new Matrix()
  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { name: tile.name })
  }
  return grid
}

function* expandSpan(xStart, xLen, yStart, yLen) {
  const xEnd = xStart + xLen
  const yEnd = yStart + yLen
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      yield { x, y }
    }
  }
}

function expandRange(range) {
  if (range.length === 4) {
    const [xStart, xLen, yStart, yLen] = range
    return expandSpan(xStart, xLen, yStart, yLen)
  } else if (range.length === 2) {
    const [xStart, yStart] = range
    return expandSpan(xStart, 1, yStart, 1)
  }
}

function* expandRanges(ranges) {
  for (const range of ranges) {
    for (const item of expandRange(range)) {
      yield item
    }
  }
}

const expandTiles = (tiles, patterns) => {
  const expandedTiles = []
  function walkTiles(tiles, offsetX, offsetY) {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX
        const derivedY = y + offsetY
        if (tile.pattern) {
          const tiles = patterns[tile.pattern].tiles
          walkTiles(tiles, derivedX, derivedY)
        } else {
          expandedTiles.push({ tile, x: derivedX, y: derivedY })
        }
      }
    }
  }

  walkTiles(tiles, 0, 0)
  return expandedTiles
}
