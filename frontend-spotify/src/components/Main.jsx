import React from "react";
import Categories from "./Categories";
import PlaylistPage from "./pages/Albumetalle";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./Search";
import  CrearListaReprodruccion  from "./ListaRepodrucionCrear";

import AlbumArtista from "./AlbumsArtista";
import Listas from "./pages/PlaylistDetalle";



export function Main({ setCurrentSongIndex , setnumeroalbum, setContextType}) {
  return (
    <div className="main">
      <div className="upperNav">Bienvenido a Spotify Music</div>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/search" element={<SearchBar  />} />
          <Route path="/your-library" element={<CrearListaReprodruccion />} />
          <Route path="/artista/:idArtista" element={<AlbumArtista />} />
          <Route path="/playlist/:id" element={<PlaylistPage setCurrentSongIndex={setCurrentSongIndex} setContextType={setContextType} setnumeroalbum={setnumeroalbum}/>} /> {/* Pasar la función setCurrentSongIndex como prop */}
          <Route path="/listas/:id" element={<Listas setCurrentSongIndex={setCurrentSongIndex} setContextType={setContextType} setnumeroalbum={setnumeroalbum} />} /> 
        </Routes>

        
      </div>
    </div>
  );
}


