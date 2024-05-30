import React from "react";
import { ReactComponent as PlayIcon } from "../svgs/play.svg";
import { Link } from "react-router-dom";

const Playlist = ({ items, type }) => {

  return (
    <div className="cardsWrapInner">
      {items.map((item, idLista) => (
        <Link to={`/inicio/listas/` + item.idLista} key={idLista}>
          <div className="card" key={idLista}>
            <div className="cardImage">
              <img src="https://cdn-icons-png.flaticon.com/512/565/565267.png" alt={item.name || item.nombre} />
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

export default Playlist;
