import { Vector } from './Math'
import BoundingBox from './BoundingBox'

export class Trait {
  constructor(name) {
    this.NAME = name
  }

  obstruct() {}

  update() {
    console.warn('Unhandled update call in Trait')
  }
}

export default class Entity {
  constructor() {
    this.pos = new Vector(0, 0)
    this.vel = new Vector(0, 0)
    this.size = new Vector(0, 0)
    this.offset = new Vector(0, 0)
    this.bounds = new BoundingBox(this.pos, this.size, this.offset)
    this.totalTime = 0

    this.traits = []
  }

  addTrait(trait) {
    this.traits.push(trait)
    this[trait.NAME] = trait
  }

  obstruct(side) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side)
    })
  }

  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime)
    })

    this.totalTime += deltaTime
  }
}
