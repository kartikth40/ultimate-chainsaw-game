import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import InputHandler from './classes/InputHandler'
import Compositor from './classes/Compositor'
import { createBackgroundLayer, createSpriteLayer } from './functions/layers'
import { loadMap } from './functions/loader'
import { loadBackgroundSprites } from './functions/sprites'
import { createPlayer } from './functions/entities'

function App() {
  let canvas
  let ctx
  let input
  const GAME_WIDTH = window.innerWidth
  const GAME_HEIGHT = window.innerHeight

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      init()
    }
  }, [])

  const init = () => {
    input = new InputHandler()
    input.addMapping('Space', (keyState) => {
      console.log(keyState)
    })
    input.listenTo(window)
    canvas = document.querySelector('#game-container')
    ctx = canvas.getContext('2d')
    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    // load all
    Promise.all([
      createPlayer(),
      loadBackgroundSprites(),
      loadMap('pink'),
    ]).then(([player, backgroundSprites, map]) => {
      const comp = new Compositor()

      const backgroundLayer = createBackgroundLayer(
        map.backgrounds,
        backgroundSprites
      )
      // comp.layers.push(backgroundLayer)

      const gravity = 10

      player.pos.set(100, 200)
      player.vel.set(100, -300)

      const spriteLayer = createSpriteLayer(player)
      comp.layers.push(spriteLayer)

      const deltaTime = 1 / 60
      let accumulatedTime = 0
      let lastTime = 0

      function update(time) {
        accumulatedTime += (time - lastTime) / 1000
        console.log(time - lastTime)

        while (accumulatedTime > deltaTime) {
          comp.draw(ctx)
          player.update(deltaTime)
          player.vel.y += gravity

          accumulatedTime -= deltaTime
        }

        requestAnimationFrame(update)
        // setTimeout(update, 1000 / 300, performance.now())
        lastTime = time
      }
      update(0)
    })
  }

  return <GameContainer id="game-container"></GameContainer>
}

export default App

const GameContainer = styled.canvas`
  position: absolute;
  /* background-color: hsl(350, 100%, 80%); */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`
