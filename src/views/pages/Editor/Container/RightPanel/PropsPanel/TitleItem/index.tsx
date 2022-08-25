import React from 'react'
import styled from 'styled-components'

const TitleBox = styled.div`
    width: 100%;
    height: 40px;
    background-color: rgb(54,54,54);
    border-radius: 5px;
`

const TitleLabel = styled.span`
    margin-left: 10px;
    width: 100%;
    color:white;
    font-size: 15px;
    line-height: 40px;
    background-color: rgb(54,54,54);
`

const TitleItem = (props:any) => {
    return (
        <>
            <TitleBox>
                <TitleLabel>{props.label}</TitleLabel>
            </TitleBox>
        </>
    )
}

export default TitleItem