export class SpriteSheet {
  constructor(image, width, height) {
    this.image = image
    this.width = width
    this.height = height
    this.tiles = new Map()
  }

  defineBuffer(x, y) {
    const buffer = document.createElement('canvas')
    buffer.width = this.width
    buffer.height = this.height
    buffer
      .getContext('2d')
      .drawImage(
        this.image,
        x * this.width,
        y * this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      )

    return buffer
  }

  // define current sprite at (x,y) of the spritesheet
  define(name, x, y) {
    const buffer = this.defineBuffer(x, y)
    this.tiles.set(name, buffer)
  }

  defineState(name, range) {
    const [row, len] = range
    for (let col = 0; col < len; col++) {
      console.log(row, col, name)
      const currentBuffer = this.defineBuffer(col, row)
      if (this.tiles.has(name)) {
        let val = this.tiles.get(name)
        val.push(currentBuffer)
        this.tiles.set(name, val)
      } else {
        this.tiles.set(name, [currentBuffer])
      }
    }
  }

  // draw the sprite on 'context' at (x,y)
  draw(name, context, x, y) {
    const buffer = this.tiles.get(name)
    context.drawImage(buffer, x, y)
  }

  drawFrames(name, context, x, y) {
    const buffers = this.tiles.get(name)
    context.drawImage(buffers[3], x * this.width, y * this.height)
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height)
  }
}
