import Logo from '@/views/pages/Home/Header/Logo'
import React from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import User from './User'

const TopBarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 48px;
  background-color: rgb(18,18,18);
`

const TopBar = () => {
  return (
    <>
      <TopBarBox>
        <Logo primary={false} />
        <Menu />
        <User />
      </TopBarBox>
    </>
  )
}

export default TopBar