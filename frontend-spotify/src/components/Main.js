import React from 'react'
import Categories from './Categories'
import {  Route, Router, Routes } from 'react-router-dom'
import PlaylistPage from './pages/Playlist'

const Main = () => {
  return (
    <div className="main">
      <div className="upperNav">dummy text</div>
      <div className="mainContent">
        <Routes>
          <Route path="/"  element={<Categories />}></Route>
          <Route path="/search">Search</Route>
          <Route path="/your-library">Your library</Route>
          <Route path="/playlist/:id" element={<PlaylistPage />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Main
