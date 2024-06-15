import React, { useState, useEffect } from "react";
import { ReactComponent as PlayIcon } from "../svgs/play.svg";
import { Link, useParams } from "react-router-dom";

const AlbumArtista = ({ type }) => {
  const [albums, setAlbums] = useState([]);
  const { idArtista } = useParams();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://www.spotify-backend.work.gd/AlbumsporArtista/${idArtista}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [idArtista]);

  return (
    <div className="mainInner" >
      <div className="cardsWrap">
        <h2 className="mb-3">Albums</h2>
    <div className="cardsWrapInner">
      {albums.map((album, index) => (
        <Link to={`/inicio/playlist/` + album.idAlbum} key={album.idAlbum}>
          <div className="card" key={album.idAlbum}>
            <div className="cardImage">
              <img src={album.imagen} alt={album.nombre} />
            </div>
            <div className="cardContent mt-2">
              <h3>{album.nombre}</h3>
              <span>{album.descripcion}</span>
              
            </div>
            
              <span className="playIcon">
                <PlayIcon />
              </span>
            
          </div>
        </Link>
      ))}
    </div>
    </div>
    </div>
  );
};

export default AlbumArtista;
