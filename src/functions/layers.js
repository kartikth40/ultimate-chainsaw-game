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

export const createCollisionLayer = (map) => {
  const resolvedTiles = []

  const tileResolver = map.tileCollider.tiles
  const tileSize = tileResolver.tileSize

  const getByIndexOriginal = tileResolver.getByIndex
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y })
    return getByIndexOriginal.call(tileResolver, x, y)
  }
  return function drawCollision(context) {
    // marking the collision range in blue
    context.strokeStyle = 'blue'
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath()
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
      context.stroke()
    })

    // marking the player RED
    context.strokeStyle = 'red'
    map.entities.forEach((entity) => {
      context.beginPath()
      context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y)
      context.stroke()
    })
    resolvedTiles.length = 0
  }
}
