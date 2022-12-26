export class SpriteSheet {
  constructor(image, width, height) {
    this.image = image
    this.width = width
    this.height = height
    this.tiles = new Map()
    this.flippedTiles = new Map()
  }

  defineBuffer(x, y) {
    const buffers = [false, true].map((flip) => {
      const buffer = document.createElement('canvas')
      buffer.width = this.width
      buffer.height = this.height

      const context = buffer.getContext('2d')

      if (flip) {
        context.scale(-1, 1)
        context.translate(-this.width, 0)
      }

      context.drawImage(
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
    })
    return buffers
  }

  // define current sprite at (x,y) of the spritesheet
  define(name, x, y) {
    const buffers = this.defineBuffer(x, y)
    this.tiles.set(name, buffers[0])
    this.flippedTiles.set(name, buffers[0])
  }

  defineState(name, range) {
    const [row, len] = range
    for (let col = 0; col < len; col++) {
      // console.log(row, col, name)
      const [currentBuffer, currentFlippedBuffer] = this.defineBuffer(col, row)
      if (this.tiles.has(name)) {
        let buf = this.tiles.get(name)
        buf.push(currentBuffer)
        this.tiles.set(name, buf)

        let flippedBuf = this.flippedTiles.get(name)
        flippedBuf.push(currentFlippedBuffer)
        this.flippedTiles.set(name, flippedBuf)
      } else {
        this.tiles.set(name, [currentBuffer])
        this.flippedTiles.set(name, [currentFlippedBuffer])
      }
    }
  }

  // draw the sprite on 'context' at (x,y)
  drawTile(name, context, x, y, flip = false) {
    let buffer
    if (flip) {
      buffer = this.flippedTiles.get(name)
    } else {
      buffer = this.tiles.get(name)
    }
    // console.log(this.tiles)
    context.drawImage(buffer, x * this.width, y * this.height)
  }

  // draw the animation sprite on 'context' at (x,y) index
  drawFrames(name, context, frameNo, x, y, flip) {
    let buffers
    if (flip) {
      buffers = this.flippedTiles.get(name)
    } else {
      buffers = this.tiles.get(name)
    }
    context.drawImage(buffers[frameNo], x * this.width, y * this.height)
  }
}
