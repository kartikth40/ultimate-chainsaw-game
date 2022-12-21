const drawBackground = (bg, ctx, sprites) => {
  bg.ranges.forEach(([x1, x2, y1, y2]) => {
    console.log(x1, x2, y1, y2, '<--', bg.tile)
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(bg.tile, ctx, x, y)
      }
    }
  })
}

export const createBackgroundLayer = (backgrounds, sprites) => {
  const buffer = document.createElement('canvas')
  buffer.width = 40 * 32
  buffer.height = 20 * 32

  backgrounds.forEach((background) => {
    drawBackground(background, buffer.getContext('2d'), sprites)
  })
  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0)
  }
}

export const createSpriteLayer = (sprite, pos) => {
  return function drawSpriteLayer(context) {
    sprite.draw('idle', context, pos.x, pos.y)
  }
}
