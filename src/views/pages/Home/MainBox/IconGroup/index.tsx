import React from 'react'
import { Github } from '@styled-icons/boxicons-logos/Github'
import { ReactLogo } from '@styled-icons/fa-brands/ReactLogo'
import { Threedotjs } from '@styled-icons/simple-icons/Threedotjs'
import { Typescript } from '@styled-icons/simple-icons/Typescript'
import { Javascript } from '@styled-icons/fluentui-system-filled/Javascript'
import {Gitee} from '@styled-icons/simple-icons/Gitee'
import styled from 'styled-components'

const IconGroupBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const GithubIcon = styled(Github)`
  color: white;
  margin: 0 5px;
  padding: 10px;
  background-color: rgb(51, 51, 51);
`

const ReactLogoIcon = styled(ReactLogo)`
  color: #38d2f8;
  margin: 0 5px;
  padding: 10px;
  background-color: rgb(51, 51, 51);
`

const ThreedotjsIcon = styled(Threedotjs)`
  color: white;
  margin: 0 5px;
  padding: 10px;
  background-color: rgb(51, 51, 51);
`

const TypescriptIcon = styled(Typescript)`
  color: #067ceb;
  margin: 0 5px;
  padding: 10px;
  background-color: rgb(51, 51, 51);
`
const GiteeIcon = styled(Gitee)`
  color: #f74141;
  margin: 0 5px;
  padding: 10px;
  background-color: rgb(51, 51, 51);
`

const IconGroup:React.FC = () => {
    return (
        <>
            <IconGroupBox>
                <ReactLogoIcon title='React icon' size='36'></ReactLogoIcon>
                <ThreedotjsIcon title='Three.js icon' size='36'></ThreedotjsIcon>
                <TypescriptIcon title='Typescript icon' size='36'></TypescriptIcon>
                <GiteeIcon title='Javascript icon' size='36'></GiteeIcon>
                <GithubIcon title='Github icon' size='36'></GithubIcon>
            </IconGroupBox>
        </>
    )
}

export default IconGroup