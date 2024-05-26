import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Player from "./Reproductor";
import { Main } from "./Main";
import Nav from "./Nav";
const playlist = [
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
];
export function Inicio() {
  const navigate = useNavigate();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  useEffect(() => {
    // Comprobar si existe un token en el localStorage
    const token = localStorage.getItem('token');
    // Si no hay token, redirigir al usuario a la página de inicio de sesión
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="outerWrap">
      <div className="App">
        <Nav />
        <Main setCurrentSongIndex={setCurrentSongIndex} /> 
      </div>
      <div className="musicControls">
      <Player songs={playlist} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex}/>
      </div>
    </div>
  );
}
