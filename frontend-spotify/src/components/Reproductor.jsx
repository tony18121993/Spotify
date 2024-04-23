import React, { useState } from 'react';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Estado para el volumen, inicializado en 50

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    // Lógica para ir a la canción anterior
    console.log('Ir a la canción anterior');
  };

  const handleNext = () => {
    // Lógica para ir a la siguiente canción
    console.log('Ir a la siguiente canción');
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleMute = () => {
    // Lógica para silenciar o reactivar el sonido
    setVolume(prevVolume => (prevVolume === 0 ? 50 : 0));
  };

  return (
    <div className="player">
      <div className="album-cover">
        <img src="https://via.placeholder.com/150" alt="Album cover" />
      </div>
      <div className="song-info">
        <h3>Nombre de la canción</h3>
        <p>Artista - Álbum</p>
      </div>
      <div className="player-controls">
        <button className="control-button" onClick={handlePrevious}>&#9664;</button>
        <button className="control-button" onClick={handlePlayPause}>{isPlaying ? '❚❚' : '▶'}</button>
        <button className="control-button" onClick={handleNext}>&#9658;</button>
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
