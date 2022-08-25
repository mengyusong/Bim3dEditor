import React from 'react'
import styled from 'styled-components'

const FootBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: black;
    width: 100%;
    height: 10%;
    /* background-color: greenyellow; */
`

const SongBox = styled.div`

    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    font-size: 14px;
    /* background-color: #2f71ff; */
    margin-left: 200px;
    
`

const InfoBox = styled.div`
 
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-right: 200px;
    width: 100%;
    height: 10%;
   
    font-size: 14px;
    /* background-color: greenyellow; */
`

const Linksmy = styled.a`
    margin: 0 20px;
    color:  #7c7c7c;
    text-decoration:none;
    &:hover{
        color:  black;
        text-decoration:underline;
        text-decoration-color:black;
    }
`

const Footer = () => {
  return (
    <>
        <FootBox>
           <SongBox>
                <Linksmy href=''>本网站受隐私政策保护</Linksmy>
           </SongBox>
           <InfoBox>
                <Linksmy href=''>服务条款</Linksmy>   
                <Linksmy href=''>隐私政策</Linksmy>      
                <Linksmy href=''>开发团队</Linksmy>               
           </InfoBox>
        </FootBox>
    </>
  )
}

export default Footer