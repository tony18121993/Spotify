import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "./Reproductor";
import { Main } from "./Main";
import Nav from "./Nav";

export function Inicio() {
  const navigate = useNavigate();
  const [numeroalbum, setnumeroalbum] = useState(4);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // Estado de reproducción de audio
  const [Songs, setSongs] = useState([]);
  const [imagenAlbum, setimagenAlbum] = useState("");

  useEffect(() => {
    // Comprobar si existe un token en el localStorage
    const token = localStorage.getItem("token");
    // Si no hay token, redirigir al usuario a la página de inicio de sesión
    if (!token) {
      navigate("/");
    }
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
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    fetchAlbumData();
  }, [navigate, numeroalbum]);

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
          isPlaying={isPlaying} // Pasar estado de reproducción al componente Player
          setIsPlaying={setIsPlaying} // Pasar función para actualizar el estado de reproducción
        />
      </div>
    </div>
  );
}
