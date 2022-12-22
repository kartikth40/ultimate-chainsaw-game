import TileResolver from './TileResolver'
export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix)
  }

  checkY(entity) {
    const match = this.tiles.searchByPosition(entity.pos.x, entity.pos.y)
    if (!match) return
    if (match.tile.name !== 'ground') return

    if (entity.vel.y > 0) {
      if (entity.pos.y > match.y1) {
        entity.pos.y = match.y1
        entity.vel.y = 0
      }
    } else if (entity.vel.y < 0) {
      if (entity.pos.y < match.y2) {
        entity.pos.y = match.y2
        entity.vel.y = 0
      }
    }
  }

  test(entity) {
    this.checkY(entity)
    const match = this.tiles.searchByPosition(entity.pos.x, entity.pos.y)
    if (match) {
      // console.log('Matched Tile -> ', match.tile.name)
    }
  }
}
