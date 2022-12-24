import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { loadMap } from './functions/loader'
import { createPlayer } from './functions/entities'
import { setupKeyboard } from './functions/setupKeyboard'
import { setupMouse } from './functions/setupMouse'
import Timer from './classes/Timer'
import { createCameraLayer, createCollisionLayer } from './functions/layers'
import Camera from './classes/Camera'

function App() {
  let canvas
  let ctx
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

    const camera = new Camera()

    player.pos.set(200, 0)
    map.entities.add(player)

    // debug layers
    // map.comp.layers.push(createCollisionLayer(map), createCameraLayer(camera))

    const input = setupKeyboard(player)
    const mouse = setupMouse(canvas, player, camera)

    const timer = new Timer(1 / 60)
    timer.update = function update(deltaTime) {
      map.update(deltaTime)
      // if (player.pos.x > 2000) {
      //   camera.pos.x = 2000 - 400
      // } else if (player.pos.x > 400) {
      //   camera.pos.x = player.pos.x - 400
      // }
      // if (player.pos.y > 200) {
      //   camera.pos.y = player.pos.y - 200
      // }
      map.comp.draw(ctx, camera)
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
