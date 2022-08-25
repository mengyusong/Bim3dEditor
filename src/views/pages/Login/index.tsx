import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

const LayoutBox = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    width: 100%;
    height: 100vh;
`

const Login = () => {
  return (
    <>
      <LayoutBox>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </LayoutBox>
    </>
  )
}

export default Login