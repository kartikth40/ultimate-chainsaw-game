import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import InputHandler from './classes/InputHandler'
import Compositor from './classes/Compositor'
import { createBackgroundLayer, createSpriteLayer } from './functions/layers'
import { loadMap } from './functions/loader'
import { loadBackgroundSprites } from './functions/sprites'
import { createPlayer } from './functions/entities'
import Timer from './classes/Timer'

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

      const gravity = 700

      player.pos.set(100, 200)
      player.vel.set(100, -300)

      input = new InputHandler()
      input.addMapping('Space', (keyState) => {
        console.log(keyState)
        if (keyState) {
          player.jump.start()
        } else {
          player.jump.cancel()
        }
      })
      input.listenTo(window)

      const spriteLayer = createSpriteLayer(player)
      comp.layers.push(spriteLayer)

      const timer = new Timer(1 / 60)
      timer.update = function update(deltaTime) {
        player.update(deltaTime)
        comp.draw(ctx)
        player.vel.y += gravity * deltaTime
      }

      timer.start()
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
