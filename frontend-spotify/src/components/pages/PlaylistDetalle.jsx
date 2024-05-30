import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as PlayIcon } from "../../svgs/playIcon.svg";
import { ReactComponent as NoteIcon } from "../../svgs/note.svg";

const Listas = ({ setCurrentSongIndex, setContextType, setnumeroalbum }) => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("token");

  const handleRemoveSongToPlaylist = async (idCancion) => {
    try {
      const response = await fetch(`http://localhost:5186/EliminarCancionAPlaylist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ IdLista: id, IdCancion: idCancion })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setSongs((prevSongs) => prevSongs.filter(song => song.idCancion !== idCancion));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      setMessage('Error removing song from playlist.');
    }
  };

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5186/listas/${id}`
        );
        const data = await response.json();
        setPlaylist(data[0]);

        const respuestacanciones = await fetch(
          `http://localhost:5186/Canciones/listas/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        const data1 = await respuestacanciones.json();
        setSongs(data1);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [id, token]);

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
          {message ? (<p className="message">{message}</p>) : null}
        </div>
        <div className="playlistPageSongs mt-3">
          <ul className="songList">
            {songs.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setContextType("playlist");
                  setnumeroalbum(id);
                }}
              >
                <div className="songIcon">
                  <NoteIcon className="noteI" />
                  <PlayIcon className="playI" />
                </div>
                <div className="songDetails">
                  <h3>{song.nombre}</h3>
                </div>
                <div className="songTime me-3">
                  <span>{song.duracion}</span>
                </div>
                <button className="close-button" onClick={() => handleRemoveSongToPlaylist(song.idCancion)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Listas;
