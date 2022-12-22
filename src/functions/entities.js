import Entity from '../classes/Entity'
import { loadPlayerSprite } from './sprites'

export const createPlayer = () => {
  return loadPlayerSprite().then((sprite) => {
    const player = new Entity()

    player.draw = function drawPlayer(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y)
    }

    player.update = function updatePlayer(deltaTime) {
      this.pos.x += this.vel.x * deltaTime
      this.pos.y += this.vel.y * deltaTime
    }

    return player
  })
}
