export default class TileResolver {
  constructor(matrix, tileSize = 32) {
    this.matrix = matrix
    this.tileSize = tileSize
  }

  toIndex(pos) {
    return Math.floor(pos / this.tileSize)
  }

  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY)
    if (tile) {
      const y1 = indexY * this.tileSize
      const y2 = y1 + this.tileSize
      return {
        tile,
        y1,
        y2,
      }
    }
  }
  searchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
  }
}
