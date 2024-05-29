import { useEffect, useRef, useState } from "react";

const Player = ({
  currentSongIndex,
  setCurrentSongIndex,
  Songs,
  imagenAlbum,
  isPlaying, // Estado de reproducción de audio
  setIsPlaying, // Función para actualizar el estado de reproducción
}) => {
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(new Audio());
  
 
  useEffect(() => {
    if (currentSongIndex === null) {
      setCurrentSongIndex(0);
    }

    if (Songs.length > 0) {
      audioRef.current.src = Songs[currentSongIndex].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, setCurrentSongIndex, isPlaying, Songs]);

  const playSong = () => {
    setIsPlaying(true); // Actualizar el estado de reproducción a verdadero
    audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false); // Actualizar el estado de reproducción a falso
    audioRef.current.pause();
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % Songs.length;
    setCurrentSongIndex(nextIndex);
    console.log(Songs[currentSongIndex].url)
  };

  const playPreviousSong = () => {
    const previousIndex = (currentSongIndex - 1 + Songs.length) % Songs.length;
    setCurrentSongIndex(previousIndex);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value / 100;
  };

  const handleMute = () => {
    if (volume === 0) {
      setVolume(50);
      audioRef.current.volume = 0.5;
    } else {
      setVolume(0);
      audioRef.current.volume = 0;
    }
  };

  

  return (
    <div className="player">
       <div className="album-cover">
        <img src={imagenAlbum} alt="Album cover" />
      </div>
      <div className="song-info">
        {Songs.length > 0 && (
          <h3>{Songs[currentSongIndex].nombre}</h3>
        )}
      </div>
      <div className="player-controls">
        <button className="control-button" onClick={playPreviousSong}>
          &#9664;
        </button>
        <button className="control-button" onClick={isPlaying ? pauseSong : playSong}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button className="control-button" onClick={playNextSong}>
          &#9658;
        </button>
      </div>
      <div className="progress-controls">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="progress-bar"
        />
        <button className="volume-button" onClick={handleMute}>
          {volume === 0 ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
};

export default Player;
