import React from 'react'
import styled from 'styled-components'
import ButtonGroup from './ButtonGroup'
import IconGroup from './IconGroup'
import Introduce from './Introduce'

const Main = styled.div`
    position: relative;
    background-color: rgb(38, 38, 38);
    overflow: hidden;
    min-height: 100vh;
    z-index: 1;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`

const IntroduceBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    color:white;
    align-items: center;
    justify-content: center;
    /* background-color: rgb(73, 73, 73); */
    overflow: hidden;
    z-index: 1;
`

const Occupying = styled.div`
  display: flex;
  /* background-color: red; */
  width: 100%;
  min-height: 100vh;
`



const MainBox: React.FC = () => {
  return (
    <>
      <Main>
        <Container>
          <IntroduceBox>
            <Introduce />
            <ButtonGroup/>
            <IconGroup />
          </IntroduceBox>
          <Occupying>
          </Occupying>
        </Container>
      </Main>
    </>
  )
}

export default MainBox;