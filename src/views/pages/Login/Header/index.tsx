import React from 'react'
import styled from 'styled-components'
import Logo from '../../Home/Header/Logo'

const HeaderBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: black;
    width: 100%;
    height: 10%;
    /* background-color: yellow; */
`

const Header = () => {
  return (
    <>
        <HeaderBox>
            <Logo primary={true}/>
        </HeaderBox>
    </>
  )
}

export default Header