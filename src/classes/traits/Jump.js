import { Trait } from '../Entity'

export class Jump extends Trait {
  constructor() {
    super('jump')
    this.onGround = false
    this.wallSlide = false
    this.wallSlideVelocity = 70
    this.wallJumpVelocity = 500
    this.duration = 0.3
    this.velocity = 500
    this.engageTime = 0
  }

  start(entity) {
    if (this.onGround || this.wallSlide) {
      if (this.wallSlide) {
        if (entity.run.direction > 0) entity.vel.x = -this.wallJumpVelocity
        else if (entity.run.direction < 0) entity.vel.x = this.wallJumpVelocity
        // console.log(entity.pos.x, entity.vel.x)
        entity.run.wallJumping = true
        entity.vel.y = -this.wallJumpVelocity
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
      this.wallSlide = true
      entity.vel.y = this.wallSlideVelocity
    }
  }

  update(entity, deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity
      this.engageTime -= deltaTime
    }
    this.onGround = false
    this.wallSlide = false
  }
}
