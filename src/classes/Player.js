export class Player {
  constructor(gameWidth, gameHeight) {}

  draw(context) {
    context.fillStyle = 'white'
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  // update(input) {
  // this.gameWidth = gameWidth
  // this.gameHeight = gameHeight
  // this.id = id
  // this.name = name
  // this.direction = direction
  // this.width = this.gameWidth / 50
  // this.height = this.width
  // this.x = 0
  // this.y = this.gameHeight - this.height
  // this.SPEED_X = 5
  // this.SPEED_Y = 15
  // this.GRAVITY = 1
  // this.velocityX = 0
  // this.velocityY = 0
  // this.weight = 1
  // this.isSliding = false
  // this.slidingSpeed = 2
  // this.wallJumping = false

  //   const isPressed = (key) => {
  //     return input.keys.indexOf(key) > -1
  //   }
  //   // console.log(input.keys)
  //   this.x += this.velocityX
  //   if (input.keys.indexOf('KeyD') > -1) {
  //     this.velocityX = this.SPEED_X
  //   } else if (input.keys.indexOf('KeyA') > -1) {
  //     this.velocityX = -1 * this.SPEED_X
  //   } else {
  //     this.velocityX = 0
  //   }

  //   if (input.keys.indexOf('Space') > -1 && this.onGround()) {
  //     this.velocityY = -1 * this.SPEED_Y
  //   }
  //   // horizontal movement
  //   if (this.x < 0) this.x = 0
  //   else if (this.x > this.gameWidth - this.width)
  //     this.x = this.gameWidth - this.width

  //   // vertical movement
  //   this.y += this.velocityY
  //   if (!this.onGround()) {
  //     this.velocityY += this.weight
  //   } else {
  //     this.velocityY = 0
  //   }

  //   if (this.y >= this.gameHeight - this.height) {
  //     this.y = this.gameHeight - this.height
  //   } else if (this.y <= -1 * this.height) {
  //     this.y = -1 * this.height
  //   }

  //   // wall jumping
  //   if (
  //     !this.onGround() &&
  //     this.x + this.width === this.gameWidth &&
  //     input.keys.indexOf('KeyD') > -1
  //   ) {
  //     if (!this.wallJumping) {
  //       this.velocityY = this.slidingSpeed
  //       this.isSliding = true
  //     }
  //   } else {
  //     this.isSliding = false
  //   }
  //   if (this.isSliding) {
  //     if (input.keys.indexOf('Space') > -1) {
  //       this.velocityX -= 10
  //       this.velocityY = -1 * this.SPEED_Y
  //       this.wallJumping = true
  //     }
  //   } else if (this.wallJumping) {
  //     this.velocityX = -50
  //     this.velocityY = -1 * this.SPEED_Y
  //     this.wallJumping = false
  //   }
  // }

  onGround() {
    return this.y >= this.gameHeight - this.height
  }
}
