import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import { ReactComponent as PlayIcon } from "../../svgs/play.svg";
import { ReactComponent as HeartIcon } from "../../svgs/heart.svg";
import { ReactComponent as NoteIcon } from "../../svgs/note.svg";

const PlaylistPage = () => {
  // const { id } = useParams();
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del popup
  const [userType, setUserType] = useState(""); // Estado para almacenar el tipo de usuario

  useEffect(() => {
    // Obteniendo el tipo de usuario del localStorage
    const tipo_usuario = localStorage.getItem("tipo_usuario");
    setUserType(tipo_usuario);
  }, []);

  const playlistOptions = [
    {
      name: 'Fuego',
      artist: 'Estopa',
      duration: '4:07',
    },
    {
      name: 'American Idiot',
      artist: 'Greenday',
      duration: '3:45',
    },
    {
      name: 'El paraiso',
      artist: 'Izal',
      duration: '5:02',
    },
    {
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      duration: '6:07',
    },
    {
      name: 'Hotel California',
      artist: 'Eagles',
      duration: '6:30',
    },
  ];

  const handleAddToPlaylist = () => {
    if (userType === "premium") {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setShowPopup(true); 
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            <img
              src="https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80"
              alt="pic"
            />
          </div>
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Playlist</p>
            <h1>Lofi </h1>
            <p className="tagline">
              Minimalismo, electrónica y música clásica moderna para
              concentrarse
            </p>
            <div className="playlistPageDesc">
              <p className="spotify">Música</p>
              <span>699,428 likes</span>
              <span>4hr 35 min</span>
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
            {showPopup && <div className="popup my-4">{userType === "premium" ? "Canción añadida a tu playlist personal" : "No eres usuario premium, no puedes crear listas de reproducción."}</div>}
            {playlistOptions.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentSongIndex(index);
                }}
              >
                <div className="songIcon">
                  <NoteIcon className="noteI" />
                  <PlayIcon className="playI" />
                </div>
                <div className="songDetails">
                  <h3>{song.name}</h3>
                  <span>{song.artist}</span>
                </div>
                <div className="songTime">
                  <span>{song.duration}</span>
                </div>
                <button className="add-button" onClick={handleAddToPlaylist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    classname="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
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
