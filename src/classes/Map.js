import Compositor from './Compositor'
import { Matrix } from './Math'

export class Map {
  constructor() {
    this.comp = new Compositor()
    this.entities = new Set()
    this.tiles = new Matrix()
  }

  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime)
    })
  }
}
