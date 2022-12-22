export const createBackgroundLayer = (map, sprites) => {
  const buffer = document.createElement('canvas')
  buffer.width = 40 * 32
  buffer.height = 20 * 32

  const ctx = buffer.getContext('2d')

  map.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, ctx, x, y)
  })

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0)
  }
}

export const createSpriteLayer = (entites) => {
  return function drawSpriteLayer(context) {
    entites.forEach((entity) => {
      entity.draw(context)
    })
  }
}
