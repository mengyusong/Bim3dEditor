import React from 'react'
import styled from 'styled-components'
import IdcPanel from './IdcPanel'
import PropsPanel from './PropsPanel'

const RightPanelBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const RightPanel = () => {
  return (
    <>
      <RightPanelBox>
          <IdcPanel></IdcPanel>
          <PropsPanel></PropsPanel>
      </RightPanelBox>
    </>
  )
}

export default RightPanel