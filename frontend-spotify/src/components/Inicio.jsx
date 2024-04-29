import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Player from "./Reproductor";
import { Main } from "./Main";
import Nav from "./Nav";

export function Inicio() {
  const navigate = useNavigate();

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
        <Main />
      </div>
      <div className="musicControls">
        <Player />
      </div>
    </div>
  );
}
