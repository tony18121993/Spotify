import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as PlayIcon } from "../../svgs/play.svg";
import { ReactComponent as HeartIcon } from "../../svgs/heart.svg";
import { ReactComponent as NoteIcon } from "../../svgs/note.svg";

const PlaylistPage = ({ setCurrentSongIndex, setnumeroalbum }) => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userPremium, setUserPremium] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:5186/CancionesporAlbum/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAlbum(data[0]);
        setSongs(data[0].canciones);
        setUserPremium(data[0].userPremium);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [id, message]);

  const handleAddToPlaylist = async (song) => {
    if (userPremium) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5186/ObtenerListasUsuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPlaylists(data);
        setSelectedSong(song);
        setShowPopup(true);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    } else {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  const handleAddSongToPlaylist = async (playlistId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5186/AnadirCancionAPlaylist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ IdLista: playlistId, IdCancion: selectedSong.idCancion })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const handleClosePopup = () => {
    setMessage("");
    setShowPopup(false);
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            <img src={album.imagen} alt={album.nombre} />
          </div>
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Álbum</p>
            <h1>{album.nombre}</h1>
            <p className="tagline">{album.genero}</p>
            <div className="playlistPageDesc">
              <p className="spotify">{album.descripcion}</p>
              <span>{songs.length} canciones</span>
            </div>
          </div>
        </div>
        <div className="playlistPageSongs">
          <div className="playlistButtons">
            <span className="playIcon">
              <PlayIcon />
            </span>
            <div className="icons">
              <div className="icon iconsHeart mb-2">
                <HeartIcon />
              </div>
              <div className="icon iconsDots"></div>
            </div>
          </div>
          <ul className="songList">
            {showPopup && (
              <>
                <div className="overlay" onClick={handleClosePopup}></div>
                <div className="popup my-4">
                  <button className="close-btn" onClick={handleClosePopup}>&times;</button>
                  {message ? (<p className="message">{message}</p>) : null}
                  {userPremium ? (
                    <div>
                      <h3>Elige una de tus listas de reproducción</h3>
                      <ul>
                        {playlists.map((playlist) => (
                          <li key={playlist.idLista} onClick={() => handleAddSongToPlaylist(playlist.idLista)}>
                            {playlist.nombre}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="premium-message">No eres usuario premium, no puedes crear listas de reproducción.</p>
                  )}
                </div>
              </>
            )}
            {songs.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setnumeroalbum(id);
                }}
              >
                <div className="songIcon">
                  <NoteIcon className="noteI" />
                  <PlayIcon className="playI" />
                </div>
                <div className="songDetails">
                  <h3>{song.nombre}</h3>
                  <span>{song.artista}</span>
                </div>
                <div className="songTime">
                  <span>{song.duracion}</span>
                </div>
                <button className="add-button" onClick={() => handleAddToPlaylist(song)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                    />
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

export default PlaylistPage;
