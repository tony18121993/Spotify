import { useEffect, useRef, useState } from "react";

const Player = ({
  currentSongIndex,
  setCurrentSongIndex,
  Songs,
  imagenAlbum,
  isPlaying,
  setIsPlaying,
}) => {
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(new Audio());
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (currentSongIndex === null) {
      setCurrentSongIndex(0);
    }

    if (Songs.length > 0) {
      const audio = audioRef.current;
      audio.src = Songs[currentSongIndex]?.url || "";

      const playAudio = () => {
        if (isPlaying && audio.src) {
          audio.play();
        }
      };

      const handleSongEnd = () => {
        playNextSong();
      };

      audio.addEventListener("canplay", playAudio);
      audio.addEventListener("ended", handleSongEnd);

      return () => {
        audio.removeEventListener("canplay", playAudio);
        audio.removeEventListener("ended", handleSongEnd);
      };
    }
  }, [currentSongIndex, setCurrentSongIndex, Songs, isPlaying]);

  const playSong = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % Songs.length;
    setCurrentSongIndex(nextIndex);
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

  if (!Songs.length || currentSongIndex === null || !Songs[currentSongIndex]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player">
      <div className="album-cover">
        <img src={imagenAlbum} alt="Album cover" />
      </div>
      <div className="song-info">
        <h3>{Songs[currentSongIndex].nombre}</h3>
      </div>
      <div className="player-controls">
        <button className="control-button" onClick={playPreviousSong}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-rewind-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696z" />
            <path d="M.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696z" />
          </svg>
        </button>
        <button
          className="control-button"
          onClick={isPlaying ? pauseSong : playSong}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button className="control-button" onClick={playNextSong}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-fast-forward-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" />
            <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" />
          </svg>
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
          {volume === 0 ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
};

export default Player;
