import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "./Reproductor";
import { Main } from "./Main";
import Nav from "./Nav";

export function Inicio() {
  const navigate = useNavigate();
  const [numeroalbum, setnumeroalbum] = useState(16);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [Songs, setSongs] = useState([]);
  const [imagenAlbum, setimagenAlbum] = useState("");
  const [contextType, setContextType] = useState("album"); // Nuevo estado
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (contextType === "album") {
          url = `http://localhost:5186/CancionesporAlbum/${numeroalbum}`;
        } else if (contextType === "playlist") {
          url = `http://localhost:5186/Canciones/listas/${numeroalbum}`;
        }
        
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        if (contextType === "album") {
          setimagenAlbum(data[0].imagen);
          setSongs(data[0].canciones);
        } else if (contextType === "playlist") {
          setimagenAlbum("https://cdn-icons-png.flaticon.com/512/565/565267.png"); 
          setSongs(data);
        }
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroalbum, contextType, token]);

  return (
    <div className="outerWrap">
      <div className="App">
        <Nav />
        <Main
          setCurrentSongIndex={setCurrentSongIndex}
          setnumeroalbum={setnumeroalbum}
          setContextType={setContextType} // Pasar el setter de contextType
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
