import styled from 'styled-components'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import TopBar from './TopBar'

const TopBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 48px;
    cursor: pointer;
`
const LeftBox = styled.div`
    position: absolute;
    top: 48px;
    left: 0px;
    width: 288px;
    height: calc(100vh - 48px);
    cursor: pointer;
`

const RightBox = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    width: 240px;
    height: calc(100vh - 48px);
    cursor: pointer;
`

const Container = () => {
    return (
        <>
            <TopBox>
                <TopBar></TopBar>
            </TopBox>
            <LeftBox>
                <LeftPanel></LeftPanel>
            </LeftBox>
            <RightBox>
                <RightPanel></RightPanel>
            </RightBox>
        </>
    )
}

export default Container