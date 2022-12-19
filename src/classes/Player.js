export class Player {
  constructor(id, name, x, y, direction) {
    this.id = id
    this.name = name
    this.position = { x, y }
    this.direction = direction
  }
}
