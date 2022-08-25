import React from 'react'
import { Sketch } from '@styled-icons/boxicons-logos/Sketch'
import styled from 'styled-components'

interface LogoClor {
  primary:boolean;
}

const LogoBox = styled.div<LogoClor>`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    color: ${props=>props.primary?'black':'white'};
    font-size: 1.2rem;
    line-height: 1.57;
    font-family: "Public Sans", sans-serif;
    font-weight: bold;
    text-align: left;
    margin-left: 40px;
    
`

const BlueSketch = styled(Sketch)`
  color: rgb(242, 112, 19);
  margin: 0 5px;
`

const Logo = (props:any) => {
  return (
    <>
      <LogoBox {...props}>
        <BlueSketch title='Sketch Icon' size='32' />
        <span>Bim3dEditor</span>
      </LogoBox>

    </>
  )
}

export default Logo