// import logo from './logo.svg'
// import './App.css'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Player } from './classes/Player'
import { inputHandler } from './classes/KeyPressListner'
import Character from './components/gameComponents/Character'

function App() {
  let canvas
  let ctx

  useEffect(() => {
    console.log('helo')
    const input = new inputHandler()
    canvas = document.querySelector('#game-container')
    ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 380
  }, [])

  // const [player, setPlayer] = useState(new Player(1, 'zolo', 100, 100, 'right'))

  // console.log('------->', player.position)

  // const handleKeyPress = (xChange, yChange) => {
  //   setPlayer((prev) => {
  //     const newX = prev.position.x + xChange
  //     const newY = prev.position.y + yChange
  //     let newDirection = player.direction

  //     if (xChange > 0) {
  //       newDirection = 'right'
  //     }
  //     if (xChange < 0) {
  //       newDirection = 'left'
  //     }
  //     return {
  //       ...prev,
  //       direction: newDirection,
  //       position: { x: newX, y: newY },
  //     }
  //   })
  // }

  const animate = () => {}
  return (
    <GameContainer id="game-container">
      {/* <Character positionx={player.position.x} positiony={player.position.y} /> */}
    </GameContainer>
  )
}

export default App

const GameContainer = styled.canvas`
  background-color: hsl(350, 100%, 80%);
  /* width: 100vw;
  max-width: 100vw;
  max-height: 100vh; */
`
