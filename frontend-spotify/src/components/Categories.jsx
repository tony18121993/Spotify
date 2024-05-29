import React, { useRef, useEffect, useState } from 'react';
import Artistas from './Artistas'; // Asegúrate de que la ruta sea correcta
import Playlist from './Playlist';

const Categories = () => {
  const [limiter, setLimiter] = useState(0);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const mainInnerRef = useRef();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:5186/ArtistasTodos');
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    const fetchPlaylists = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5186/ObtenerListasPublicas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchArtists();
    fetchPlaylists();

    const handleWindowResize = () => {
      const calculation = Math.floor(mainInnerRef.current.getBoundingClientRect().width / 195);
      setLimiter(calculation);
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div className="mainInner" ref={mainInnerRef}>
      <div className="cardsWrap">
        <h2>Artistas</h2>
        <Artistas items={artists} type="playlist" />
      </div>

      <div className="cardsWrap">
        <h2>Listas de Reproducción</h2>
        <Playlist items={playlists} type="playlist" />
      </div>
    </div>
  );
};

export default Categories;
