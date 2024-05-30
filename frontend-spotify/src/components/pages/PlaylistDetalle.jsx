import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as PlayIcon } from "../../svgs/playIcon.svg";

const Listas = ({ setCurrentSongIndex }) => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5186/listas/${id}`
        );
        const data = await response.json();
        setPlaylist(data[0]);
        
        const respuestacanciones=await fetch(
          `http://localhost:5186/Canciones/listas/${id}`
        );
        const data1 = await respuestacanciones.json();
        setSongs(data1);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlistPage ms-3">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage mb-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/565/565267.png"
              alt={playlist.nombre}
            />
          </div>
          <h1 className="ms-3">{playlist.nombre}</h1>
          <p className="ms-3">{playlist.publica ? "Pública" : "Privada"}</p>
          <span className="ms-3">{songs.length} canciones</span>
        </div>
        <div className="playlistPageSongs">
          <ul className="songList">
            {songs.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentSongIndex(index);
                }}
              >
                <div className="songIcon">
                  <PlayIcon />
                </div>
                <div className="songDetails">
                  <h3>{song.nombre}</h3>
                  <span>{song.duracion}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Listas;
