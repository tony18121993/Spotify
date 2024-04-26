import React from "react";
import Categories from "./Categories";
import PlaylistPage from "./pages/Playlist";
import { Route, Routes } from "react-router-dom";

export function Main() {
  return (
    <div className="main">
      <div className="upperNav">Bienvenido a Spotify Music</div>
      <div className="mainContent">
      <Routes>
          <Route path="/"  element={<Categories />}></Route>
          <Route path="/inicio/search">Buscar</Route>
          <Route path="/inicio/your-library">Your library</Route>
          <Route path="/inicio/playlist/:id" element={<PlaylistPage />}></Route>
        </Routes>
      </div>
    </div>
  );
};


