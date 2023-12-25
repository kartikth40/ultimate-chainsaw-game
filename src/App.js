import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { loadMap } from './loaders/map'
import { loadPlayer } from './entities/player'
import { setupKeyboard } from './functions/setupKeyboard'
import { setupMouse } from './functions/setupMouse'
import Timer from './classes/Timer'
import { createCameraLayer, createCollisionLayer } from './functions/layers'
import Camera from './classes/Camera'
import { setupCameraMovement } from './functions/setupCamera'

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
    const [createPlayer, map] = await Promise.all([
      loadPlayer(),
      loadMap('pink'),
    ])

    const player = createPlayer()
    const camera = new Camera()

    player.pos.set(200, 0)
    map.entities.add(player)

    // debug layers
    map.comp.layers.push(createCollisionLayer(map), createCameraLayer(camera))

    const input = setupKeyboard(player)
    const mouse = setupMouse(canvas, player, camera)

    const timer = new Timer()
    timer.update = function update(deltaTime) {
      map.update(deltaTime)
      setupCameraMovement(player, camera)
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
