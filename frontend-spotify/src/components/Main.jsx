import React from "react";
import Categories from "./Categories";
import PlaylistPage from "./pages/Albumetalle";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./Search";
import  CrearListaReprodruccion  from "./ListaRepodrucionCrear";

import AlbumArtista from "./AlbumsArtista";


export function Main({ setCurrentSongIndex , setnumeroalbum}) {
  return (
    <div className="main">
      <div className="upperNav">Bienvenido a Spotify Music</div>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/search" element={<SearchBar  />} />
          <Route path="/your-library" element={<CrearListaReprodruccion />} />
          <Route path="/artista/:idArtista" element={<AlbumArtista />} />
          <Route path="/playlist/:id" element={<PlaylistPage setCurrentSongIndex={setCurrentSongIndex} setnumeroalbum={setnumeroalbum}/>} /> {/* Pasar la función setCurrentSongIndex como prop */}
          <Route path="/search/playlist/:id" element={<PlaylistPage setCurrentSongIndex={setCurrentSongIndex} />} /> {/* Pasar la función setCurrentSongIndex como prop */}
        </Routes>

        
      </div>
    </div>
  );
}


