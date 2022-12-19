import React, { useEffect } from 'react'
import { Player } from '../../classes/Player'
import styled from 'styled-components'

const Character = ({ positionx, positiony }) => {
  useEffect(() => {
    const player = new Player(1, 'zolo', 100, 100, 'right')
    const characterElement = document.querySelector('.character')
    console.log(characterElement)
    // characterElement.style.transform = `translate(20px,0px)`
  }, [])

  // console.log(positionx)
  return (
    <CharacterContainer
      positionx={positionx}
      positiony={positiony}
      className="character"
    ></CharacterContainer>
  )
}

export default Character

const CharacterContainer = styled.div`
  position: absolute;
  left: ${(props) => props.positionx + 'px'};
  top: ${(props) => props.positiony + 'px'};
  width: 50px;
  height: 50px;
  background-color: hsl(0, 0%, 0%);
  transition: transform 0.25s linear;
`
