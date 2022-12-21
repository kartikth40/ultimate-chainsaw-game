// import logo from './logo.svg'
// import './App.css'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Player } from './classes/Player'
import { SpriteSheet } from './classes/SpriteSheet'
import { InputHandler } from './classes/InputHandler'
import Character from './components/gameComponents/Character'
import { Surface } from './classes/Objects/Surface'

function App() {
  let canvas
  let ctx
  let input
  const GAME_WIDTH = window.innerWidth
  const GAME_HEIGHT = window.innerHeight

  const player = new Player(GAME_WIDTH, GAME_HEIGHT)

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      init()
    }
  }, [])

  const loadImage = (url) => {
    return new Promise((resolve) => {
      const image = new Image()
      image.addEventListener('load', () => {
        resolve(image)
      })
      image.src = url
    })
  }

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

    loadImage('/img/tiles.png').then((image) => {
      const sprites = new SpriteSheet(image, 32, 32)
      sprites.define('ground', 0, 0)
      sprites.draw('ground', ctx, 100, 100)
    })

    player.draw(ctx)
    // player.update(input)

    // animate()
  }

  const animate = () => {
    // console.log('animate')
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    new Surface(ctx, 20, 1, 3, 1, GAME_WIDTH, GAME_HEIGHT)

    // player.update(input)
    player.draw(ctx)

    // Box width
    var bw = GAME_WIDTH
    // Box height
    var bh = GAME_HEIGHT
    // Padding
    var p = 0
    function drawBoard() {
      const bw = GAME_WIDTH
      const bh = GAME_HEIGHT
      const lw = 0.2 // box border
      const boxRow = 50 // how many boxes
      const box = bw / boxRow // box size
      ctx.lineWidth = lw
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.822)'
      for (let x = 0; x < bw; x += box) {
        for (let y = bh; y >= 0; y -= box) {
          ctx.strokeRect(x, y, box, box)
        }
      }
    }

    drawBoard()
    requestAnimationFrame(animate)
  }
  return (
    <GameContainer id="game-container">
      {/* <Character positionx={player.position.x} positiony={player.position.y} /> */}
    </GameContainer>
  )
}

export default App

const GameContainer = styled.canvas`
  position: absolute;
  background-color: hsl(350, 100%, 80%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`
