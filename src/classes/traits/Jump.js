import { Trait } from '../Entity'

export class Jump extends Trait {
  constructor() {
    super('jump')
    this.onGround = false
    this.readyForWallJump = false
    this.wallSlide = false
    this.wallSlideVelocity = 70
    this.wallJumpDistance = 50
    this.duration = 0.3
    this.velocity = 500
    this.engageTime = 0
  }

  start(entity) {
    if (this.onGround || this.readyForWallJump) {
      if (this.wallSlide) {
        if (entity.run.direction > 0) entity.pos.x -= this.wallJumpDistance
        else if (entity.run.direction < 0) entity.pos.x += this.wallJumpDistance
        entity.pos.y -= this.wallJumpDistance
      }

      this.engageTime = this.duration
    }
  }
  cancel() {
    this.engageTime = 0
  }
  obstruct(entity, side) {
    if (side === 'bottom') {
      this.onGround = true
    }
    if ((side === 'left' || side === 'right') && !this.onGround) {
      console.log(this.onGround)
      this.wallSlide = true
      this.readyForWallJump = true
      entity.vel.y = this.wallSlideVelocity
    }
  }

  update(entity, deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity
      this.engageTime -= deltaTime
    }
    this.onGround = false
    this.readyForWallJump = false
    this.wallSlide = false
  }
}
