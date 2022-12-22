import TileResolver from './TileResolver'
export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix)
  }

  test(entity) {
    const match = this.tiles.searchByPosition(entity.pos.x, entity.pos.y)
    if (match) {
      console.log('Matched Tile -> ', match, match.tile)
    }
  }
}
