import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import Menu from './Menu'

const Header = styled.div`
    display: flex;
    position: fixed;
    top: 0px;
    justify-content:center;
    align-items: center;
    width: 100%;
    height: 64px;
    color: red;
    background: rgb(18,18,18);
    z-index: 5;
`

const Layout = styled.div`
    display: flex;
    /* background: yellow; */
    height: 32px;
    width: 80%;
    flex-direction: row;
`

const HeaderBox: React.FC = () => {
    
    return (
        <>
            <Header>
                <Layout>
                    <Logo primary={false}/>
                    <Menu />
                </Layout>
            </Header>
        </>
    )
}

export default HeaderBox