import { Vector } from './Math'

export default class Camera {
  constructor() {
    this.pos = new Vector(0, 0)
    this.size = new Vector(1300, 640)
  }
}
