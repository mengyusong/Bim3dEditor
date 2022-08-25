import React from 'react'
import styled from 'styled-components'

const OrderDiv = styled.div`
    height:40px;
    line-height:40px;
    text-align: center;
    .line {
        display: inline-block;
        width:35%;
        border-top: 1px solid #ccc ;
    }
    .txt {
        color: #7c7c7c;
        vertical-align: -4px;
        margin: 0 5px;
    }
`

const TextLine = (props:any) => {
  return (
    <OrderDiv>
        <span className="line"></span>
        <span className="txt">{props.label}</span>
        <span className="line"></span>
    </OrderDiv>
  )
}

export default TextLine