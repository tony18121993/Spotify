import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "./Reproductor";
import { Main } from "./Main";
import Nav from "./Nav";

export function Inicio() {
  const navigate = useNavigate();
  const [numeroalbum, setnumeroalbum] = useState(4);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(); // Estado de reproducción de audio
  const [Songs, setSongs] = useState([]);
  const [imagenAlbum, setimagenAlbum] = useState("");
const token = localStorage.getItem("token");
  useEffect(() => {
    // Comprobar si existe un token en el localStorage
    
    // Si no hay token, redirigir al usuario a la página de inicio de sesión
    if (!token) {
      navigate("/");
    }
  },[navigate]);
  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5186/CancionesporAlbum/${numeroalbum}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setimagenAlbum(data[0].imagen);
        setSongs(data[0].canciones);
        console.log(Songs)
        console.log(currentSongIndex)
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    fetchAlbumData();
  }, [numeroalbum]);

  return (
    <div className="outerWrap">
      <div className="App">
        <Nav />
        <Main
          setCurrentSongIndex={setCurrentSongIndex}
          setnumeroalbum={setnumeroalbum}
        />
      </div>
      <div className="musicControls">
        <Player
          Songs={Songs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          imagenAlbum={imagenAlbum}
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
        />
      </div>
    </div>
  );
}
