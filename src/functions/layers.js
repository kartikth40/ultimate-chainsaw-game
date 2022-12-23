export const createBackgroundLayer = (map, sprites) => {
  const buffer = document.createElement('canvas')
  buffer.width = 40 * 32 * 2
  buffer.height = 20 * 32

  const ctx = buffer.getContext('2d')

  map.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, ctx, x, y)
  })

  return function drawBackgroundLayer(context, camera) {
    context.drawImage(buffer, -camera.pos.x, -camera.pos.y)
  }
}

export const createSpriteLayer = (entites, width = 32, height = 32) => {
  const spriteBuffer = document.createElement('canvas')
  spriteBuffer.width = width
  spriteBuffer.height = height
  const spriteBufferContext = spriteBuffer.getContext('2d')

  return function drawSpriteLayer(context, camera) {
    entites.forEach((entity) => {
      spriteBufferContext.clearRect(0, 0, width, height)
      entity.draw(spriteBufferContext)
      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      )
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
  return function drawCollision(context, camera) {
    // marking the collision range in blue
    context.strokeStyle = 'blue'
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath()
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize
      )
      context.stroke()
    })

    // marking the player RED
    context.strokeStyle = 'red'
    map.entities.forEach((entity) => {
      context.beginPath()
      context.rect(
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y,
        entity.size.x,
        entity.size.y
      )
      context.stroke()
    })
    resolvedTiles.length = 0
  }
}
