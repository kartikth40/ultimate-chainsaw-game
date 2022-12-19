// import logo from './logo.svg'
// import './App.css'
import styled from 'styled-components'
import Character from './components/gameComponents/Character'

function App() {
  return (
    <GameContainer>
      <Character />
    </GameContainer>
  )
}

export default App

const GameContainer = styled.div`
  background-color: hsl(350, 100%, 80%);
  width: 100vw;
  height: 100vh;
`
