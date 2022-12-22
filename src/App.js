import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import InputHandler from './classes/InputHandler'
import Compositor from './classes/Compositor'
import Entity from './classes/Entity'
import { createBackgroundLayer } from './functions/layers'
import { loadMap } from './functions/loader'
import { loadBackgroundSprites, loadPlayerSprite } from './functions/sprites'

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

    const createSpriteLayer = (entity, pos) => {
      return function drawSpriteLayer(context) {
        entity.draw(context)
      }
    }

    // load all
    Promise.all([
      loadPlayerSprite(),
      loadBackgroundSprites(),
      loadMap('pink'),
    ]).then(([playerSprite, backgroundSprites, map]) => {
      const comp = new Compositor()

      const backgroundLayer = createBackgroundLayer(
        map.backgrounds,
        backgroundSprites
      )
      comp.layers.push(backgroundLayer)

      const gravity = 0.5
      const player = new Entity()
      player.pos.set(100, 576)
      player.vel.set(2, -10)

      player.draw = function drawPlayer(context) {
        playerSprite.draw('idle', context, this.pos.x, this.pos.y)
      }

      player.update = function updatePlayer() {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
      }

      const spriteLayer = createSpriteLayer(player)
      comp.layers.push(spriteLayer)

      function update() {
        comp.draw(ctx)
        player.update()
        player.vel.y += gravity
        requestAnimationFrame(update)
      }
      update()
    })
  }

  // player.draw(ctx)
  // player.update(input)
  // animate()

  const animate = () => {
    // console.log('animate')
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // player.update(input)
    // player.draw(ctx)

    // // Box width
    // var bw = GAME_WIDTH
    // // Box height
    // var bh = GAME_HEIGHT
    // // Padding
    // var p = 0
    // function drawBoard() {
    //   const bw = GAME_WIDTH
    //   const bh = GAME_HEIGHT
    //   const lw = 0.2 // box border
    //   const boxRow = 50 // how many boxes
    //   const box = bw / boxRow // box size
    //   ctx.lineWidth = lw
    //   ctx.strokeStyle = 'rgba(255, 255, 255, 0.822)'
    //   for (let x = 0; x < bw; x += box) {
    //     for (let y = bh; y >= 0; y -= box) {
    //       ctx.strokeRect(x, y, box, box)
    //     }
    //   }
    // }

    // drawBoard()
    requestAnimationFrame(animate)
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
