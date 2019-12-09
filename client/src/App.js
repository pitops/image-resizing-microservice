import React from 'react'
import styled from 'styled-components'
import FileUpload from './components/FileUpload'
import './App.css'

function App () {
  return (
    <AppContainer>
      <AppHeader>Image resizing service</AppHeader>
      <FileUpload />
    </AppContainer>
  )
}

const AppContainer = styled.div`
  height: 100vh;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const AppHeader = styled.header`
  font-size: 36px;
  color: #2196f3;
  font-weight: 300;
`

export default App
