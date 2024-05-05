import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../svgs/play.svg';
import { ReactComponent as HeartIcon } from '../../svgs/heart.svg';
import { ReactComponent as NoteIcon } from '../../svgs/note.svg';

const PlaylistPage = () => {
  // const { id } = useParams();
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  console.log(currentSongIndex);
  const playlistOptions = [
    {
      name: "Atrapado",
      artist: "Toni Hernandez",
      duration: "4:07",
    },
    {
      name: "Otra canción",
      artist: "Artista 2",
      duration: "3:45",
    },
    {
      name: "Canción genial",
      artist: "Artista 3",
      duration: "5:02",
    },
    {
      name: "Mi canción favorita",
      artist: "Artista 4",
      duration: "4:30",
    },
    {
      name: "Buen ritmo",
      artist: "Artista 5",
      duration: "3:15",
    },
  ];

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
              Minimalismo, electrónica y música clásica moderna para concentrarse
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
              <div className="icon iconsHeart">
                <HeartIcon />
              </div>
              <div className="icon iconsDots"></div>
            </div>
          </div>
          <ul className="songList">
          {playlistOptions.map((song, index) => (
              <li key={index} onClick={() => { setCurrentSongIndex(index); }}>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaylistPage;
