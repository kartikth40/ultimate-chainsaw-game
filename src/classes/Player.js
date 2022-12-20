export class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    // this.id = id
    // this.name = name
    // this.direction = direction
    this.width = 50
    this.height = 50
    this.x = 0
    this.y = this.gameHeight - this.height
    this.SPEED_X = 7
    this.SPEED_Y = 25
    // this.GRAVITY = 1
    this.velocityX = 0
    this.velocityY = 0
    this.weight = 2
  }

  draw(context) {
    context.fillStyle = 'white'
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  update(input) {
    // console.log(input.keys)
    this.x += this.velocityX
    if (input.keys.indexOf('KeyD') > -1) {
      this.velocityX = this.SPEED_X
    } else if (input.keys.indexOf('KeyA') > -1) {
      this.velocityX = -1 * this.SPEED_X
    } else {
      this.velocityX = 0
    }
    if (input.keys.indexOf('KeyW') > -1 && this.onGround()) {
      this.velocityY = -1 * this.SPEED_Y
      console.log('UP')
    }
    // horizontal movement
    if (this.x < 0) this.x = 0
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width
    // vertical movement
    this.y += this.velocityY
    if (!this.onGround()) {
      this.velocityY += this.weight
    } else {
      this.velocityY = 0
    }

    if (this.y >= this.gameHeight - this.height) {
      this.y = this.gameHeight - this.height
    }
  }

  onGround() {
    return this.y >= this.gameHeight - this.height
  }
}
