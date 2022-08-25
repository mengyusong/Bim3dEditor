import React from 'react'
import styled from 'styled-components'

const Container = styled.div<{pleft?:string}>`
    overflow: hidden;
    position: absolute;
    top: 48px;
    /* left: 0px; */
    margin-left: ${props=>props.pleft};
    width: 140px;
    height: 0px;
    background-color: rgb(38, 38, 38);
    box-shadow: 0 0 3px rgb(102, 102, 102);
    text-align: left;
    line-height: 40px;
    transition-duration: 300ms;
    z-index: 1000;
    color: #ccc;
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
`

const MenuItem = styled.li`
    width: 100%;
    height: 40px;
    margin: 0;
    left: 0;
    top: 0;
    &:hover {
        color: #fff;
        background-color: rgb(242, 112, 19);
    }
`
const LabelItem = styled.span`
    padding-left: 10px;
`

/** 下拉菜单 */
const ComboBox = (props: any) => {
    return (
        <>
            <Container pleft={props.pleft}>
                <ul>
                    {
                        props.menus.map((data) => {
                            return (
                                <MenuItem key={data.key}>
                                    <LabelItem>{data.label}</LabelItem>
                                </MenuItem>
                            )
                        })
                    }
                </ul>

            </Container>
        </>
    )
}

export default ComboBox;