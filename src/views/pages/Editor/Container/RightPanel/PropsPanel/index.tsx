import React from 'react'
import styled from 'styled-components'
import TitleItem from './TitleItem'

const PropsPanelBox = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-top: 2px;
    color: white;
    text-align: left;
    line-height: 40px;
    background-color: rgb(38,38,38);
    border-radius: 5px;
`

const PropsBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
`

const PropsPanel = () => {
  return (
    <>
        <PropsPanelBox>
            <PropsBox>
                <TitleItem label='属性'/>
            </PropsBox>
        </PropsPanelBox>
    </>
  )
}

export default PropsPanel