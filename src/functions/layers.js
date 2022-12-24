export const createBackgroundLayer = (map, sprites) => {
  const tiles = map.tiles
  const resolver = map.tileCollider.tiles

  const buffer = document.createElement('canvas')
  buffer.width = 2560
  buffer.height = 640

  const ctx = buffer.getContext('2d')

  const redraw = (startXIndex, endXIndex, startYIndex, endYIndex) => {
    for (let x = startXIndex; x <= endXIndex; x++) {
      for (let y = startYIndex; y <= endYIndex; y++) {
        const col = tiles.grid[x]
        if (!col) continue
        const tile = col[y]
        if (!tile) continue

        sprites.drawTile(tile.name, ctx, x, y)
      }
    }
  }

  return function drawBackgroundLayer(context, camera) {
    const drawWidth = resolver.toIndex(camera.size.x)
    const drawHeight = resolver.toIndex(camera.size.y)
    const drawXFrom = resolver.toIndex(camera.pos.x)
    const drawXTo = drawXFrom + drawWidth
    const drawYFrom = resolver.toIndex(camera.pos.y)
    const drawYTo = drawYFrom + drawHeight
    redraw(drawXFrom, drawXTo, drawYFrom, drawYTo)

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

export const createCameraLayer = (cameraToDraw) => {
  return function drawCameraRect(context, fromCamera) {
    context.strokeStyle = 'purple'
    context.beginPath()
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
    )
    context.stroke()
  }
}
