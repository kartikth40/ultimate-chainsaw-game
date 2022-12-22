import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import InputHandler from './classes/InputHandler'
import { loadMap } from './functions/loader'
import { createPlayer } from './functions/entities'
import Timer from './classes/Timer'
import { createCollisionLayer } from './functions/layers'

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

  const init = async () => {
    canvas = document.querySelector('#game-container')
    ctx = canvas.getContext('2d')
    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    // load all
    const [player, map] = await Promise.all([createPlayer(), loadMap('pink')])

    const gravity = 700
    player.pos.set(200, 0)

    map.comp.layers.push(createCollisionLayer(map))

    map.entities.add(player)

    input = new InputHandler()
    input.addMapping('Space', (keyState) => {
      if (keyState) {
        player.jump.start()
      } else {
        player.jump.cancel()
      }
    })
    input.listenTo(window)

    const mouseStates = ['mousedown', 'mousemove']
    mouseStates.forEach((eName) => {
      canvas.addEventListener(eName, (e) => {
        if (e.buttons === 1) {
          player.vel.set(0, 0)
          player.pos.set(e.offsetX, e.offsetY)
        }
      })
    })

    const timer = new Timer(1 / 60)
    timer.update = function update(deltaTime) {
      // console.log(player.pos)
      map.update(deltaTime)
      map.comp.draw(ctx)
      player.vel.y += gravity * deltaTime
    }

    timer.start()
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
