// import logo from './logo.svg'
// import './App.css'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Player } from './classes/Player'
import { InputHandler } from './classes/InputHandler'
import Character from './components/gameComponents/Character'

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

  const init = () => {
    input = new InputHandler()
    canvas = document.querySelector('#game-container')
    ctx = canvas.getContext('2d')
    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    player.draw(ctx)
    player.update(input)

    animate()
  }

  const animate = () => {
    // console.log('animate')
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    player.update(input)
    player.draw(ctx)
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
