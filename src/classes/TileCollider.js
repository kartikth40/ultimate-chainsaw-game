import TileResolver from './TileResolver'
export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix)
  }

  checkX(entity) {
    let x
    if (entity.vel.x > 0) {
      x = entity.bounds.right
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left
    } else return

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom
    )

    matches.forEach((match) => {
      if (match.tile.state !== 'solid') return

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.bounds.right = match.x1
          entity.vel.x = 0

          entity.obstruct('left')
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2
          entity.vel.x = 0

          entity.obstruct('right')
        }
      }
    })
  }

  checkY(entity) {
    let y
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top
    } else return

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y
    )

    matches.forEach((match) => {
      if (match.tile.state !== 'solid') return

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.bottom = match.y1
          entity.vel.y = 0

          entity.obstruct('bottom')
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2
          entity.vel.y = 0
        }
      }
    })
  }

  test(entity) {
    this.checkY(entity)
    const match = this.tiles.searchByPosition(entity.pos.x, entity.pos.y)
    if (match) {
      // console.log('Matched Tile -> ', match.tile.name)
    }
  }
}
