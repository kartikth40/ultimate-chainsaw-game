// import logo from './logo.svg'
// import './App.css'
import { useEffect } from 'react'
import styled from 'styled-components'
import Character from './components/gameComponents/Character'

function App() {
  let positionx = 100
  let positiony = window.innerHeight - 100

  console.log(positionx, positiony)
  return (
    <GameContainer className="game-container">
      <Character positionx={positionx} positiony={positiony} />
    </GameContainer>
  )
}

export default App

const GameContainer = styled.div`
  background-color: hsl(350, 100%, 80%);
  width: 100vw;
  height: 100vh;
`
