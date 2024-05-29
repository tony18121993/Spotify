import React from "react";
import { ReactComponent as PlayIcon } from "../svgs/play.svg";
import { Link } from "react-router-dom";

const Artistas = ({ items, type }) => {

  return (
    <div className="cardsWrapInner">
      {items.map((item, idArtista) => (
        <Link to={`/inicio/artista/` + item.idArtista} key={idArtista}>
          <div className="card" key={idArtista}>
            <div className="cardImage">
              <img src={item.imagenPrimerAlbum} alt={item.name || item.nombre} />
            </div>
            <div className="cardContent mt-2">
              <h3>{item.name || item.nombre}</h3>
              <span>{item.desc || item.descripcion}</span>
            </div>
            {(
              <span className="playIcon">
                <PlayIcon />
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Artistas;
