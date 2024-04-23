import React from 'react'
import Nav from './components/Nav'
import Main from './components/Main'
import './App.css'
import Player from './components/Reproductor'

const App = () => {
  return (
    <div className="outerWrap">
      <div className="App">
        <Nav />
        <Main />
      </div>
      <div className="musicControls">
        <Player />
      </div>
    </div>
  )
}

export default App
