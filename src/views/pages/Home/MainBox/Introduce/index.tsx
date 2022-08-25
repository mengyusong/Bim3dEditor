import React from 'react'
import styled from 'styled-components'


const Tips = styled.span`
  color: rgb(242, 112, 19);
`

const Introduce: React.FC = () => {
  return (
    <>
        <h1>
          <span>欢迎来到<Tips> Bim3dEditor </Tips><br/>这是为您精心打造的可预</span><br />
          <span>览和编辑的</span>
          <span><Tips> WebGL </Tips>项目</span>
        </h1>
        <h5>
          <span>Bim3dEditor 使用流行的前端框架 React 和优秀的 webgl</span><br />
          <span>库 Three.js 打造在线可编辑的Cad解析编辑器</span>
        </h5>
    </>
  )
}

export default Introduce