import React from 'react'
import styled from 'styled-components'

const List = styled.div`

    position: relative;
    min-height: 200vh;
    z-index: 1;

`

const ListBox: React.FC  = () => {
  return (
    <>
        <List></List>
    </>
  )
}

export default ListBox