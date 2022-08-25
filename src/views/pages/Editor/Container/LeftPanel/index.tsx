import React from 'react'
import styled from 'styled-components'
import LeftMenu from './LeftMenu'
import SideBar from './SideBar'

const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`

const LeftPanel = () => {
  return (
    <>
        <LeftContainer>
            <SideBar></SideBar>
            <LeftMenu></LeftMenu>
        </LeftContainer>
    </>
  )
}

export default LeftPanel