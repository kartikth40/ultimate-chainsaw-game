import Compositor from './Compositor'
import { Matrix } from './Math'
import TileCollider from './TileCollider'

export class Map {
  constructor() {
    this.comp = new Compositor()
    this.entities = new Set()
    this.tiles = new Matrix()
    this.tileCollider = new TileCollider(this.tiles)
  }

  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime)

      this.tileCollider.test(entity)
    })
  }
}
