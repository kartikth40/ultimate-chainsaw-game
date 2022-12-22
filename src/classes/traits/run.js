import { Trait } from '../Entity'

export class Run extends Trait {
  constructor() {
    super('run')
    this.direction = 0
    this.speed = 20000
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.direction * deltaTime
  }
}
