import React, { useState, useRef, useEffect } from 'react';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Estado para el volumen, inicializado en 50
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs] = useState([
    {
      title: 'Fuego',
      artist: 'Estopa',
      album: 'Destrangis',
      cover: 'https://cdn-p.smehost.net/sites/a3c9c5557eb6401b8e297cd112827890/wp-content/uploads/2019/05/portada_disco-300x300.jpg',
      source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      title: 'American Idiot',
      artist: 'Greenday',
      album: 'Greenday album',
      cover: 'https://media.pitchfork.com/photos/5929bfa1ea9e61561daa7aba/16:9/w_1280,c_limit/9f6ffeb1.jpg',
      source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      title: 'El paraiso',
      artist: 'Izal',
      album: 'Izal album',
      cover: 'https://www.theproject.es/archivos/izal.jpg',
      source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      cover: 'https://th.bing.com/th/id/R.635d9b3d53354b824ae097ebb61d04e3?rik=rN963ykGvcLuug&pid=ImgRaw&r=0',
      source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      cover: 'https://img.discogs.com/62TIXCoioV2sttD_Go7G1AwiRYs=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11176377-1511277884-5662.mpo.jpg',
      source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
  ]);
  const audioRef = useRef(new Audio());

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

  // Manejar cambios en la canción actual
  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].source;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

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
