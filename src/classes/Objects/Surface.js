export class Surface {
  constructor(context, x, y, w, h, gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.pixelSize = gameWidth / 50
    this.width = w * this.pixelSize
    this.height = h * this.pixelSize
    this.x = x * this.pixelSize
    this.y = this.gameHeight - this.height - y * this.pixelSize

    context.fillStyle = 'black'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}
