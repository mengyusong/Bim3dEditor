import { ViewInAr } from '@styled-icons/material-outlined/ViewInAr'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 0 20px 0;
`

const BorderButton = styled.button`
    width: 140px;
    height: 32px;
    background: transparent;
    color: rgb(242, 112, 19);
    background: none;
    border: 1px solid rgb(242, 112, 19);
    border-radius: 5px 5px;
    font-size: 16px;
    margin: 0 20px;

    &:hover{
        color: rgb(179, 78, 6);
        border: 1px solid rgb(179, 78, 6);
    }
`

const NormalButton = styled.button`
    width: 140px;
    height: 32px;
    color: white;
    background: rgb(242, 112, 19);
    font-size: 16px;
    text-align: center;
    margin: 0 20px;
    border: 0;
    border-radius: 5px 5px;
    &:hover{
        background: rgb(179, 78, 6);
    }
`
const ViewInArIcon = styled(ViewInAr)`
    color: white;
    margin-right: 10px;
    padding-bottom: 2px;
`

const ButtonGroup: React.FC = () => {

    let navigate = useNavigate();
    function gotoEditor() {
        navigate('/editor')
    }

    return (
        <>
            <ButtonBox>
                <a href="https://gitee.com/songmy1093697597/bim3d-editor" target="_blank">
                    <BorderButton>导出项目</BorderButton>
                </a>
                <NormalButton onClick={gotoEditor}>
                    <ViewInArIcon size='16' />
                    预览编辑
                </NormalButton>
            </ButtonBox>
        </>
    )
}

export default ButtonGroup