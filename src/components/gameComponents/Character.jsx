import React, { useEffect } from 'react'
import styled from 'styled-components'

const Character = ({ positionx, positiony }) => {
  useEffect(() => {
    const characterElement = document.querySelector('.character')
    // console.log(characterElement)
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
  transform: translate(
    ${(props) => props.positionx + 'px'},
    ${(props) => props.positiony + 'px'}
  );
  /* left: 100px;
  bottom: 200px; */
  width: 50px;
  height: 50px;
  background-color: hsl(0, 0%, 0%);
  /* transition: transform 0.25s linear; */
`
