import { useEffect, useRef, useState } from "react";

const Player = ({ currentSongIndex, setCurrentSongIndex, songs = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); 
  const audioRef = useRef(new Audio());
 
  useEffect(() => {
    // Inicializar currentSongIndex con 0 si es null
    if (currentSongIndex === null) {
      setCurrentSongIndex(0);
    }
  }, [currentSongIndex, setCurrentSongIndex]);

  const playSong = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const playPreviousSong = () => {
    const previousIndex = (currentSongIndex - 1 + songs.length) % songs.length;
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

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].source;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying, songs]);
  return (
    <div className="player">
      <div className="album-cover">
        <img src={songs[currentSongIndex].cover} alt="Album cover" />
      </div>
      <div className="song-info">
        <h3>{songs[currentSongIndex].title}</h3>
        <p>{songs[currentSongIndex].artist} - {songs[currentSongIndex].album}</p>
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
