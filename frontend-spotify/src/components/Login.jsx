// LoginPage.js

import React from 'react';
import './Loginstyle.css'; 

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="form-login">
        <img src="https://www.scdn.co/i/_global/open-graph-default.png" alt="Spotify Logo" className="spotify-logo" />
        <form>
          <input type="text" className="username-input" placeholder="Nombre de usuario" />
          <input type="password" className="password-input" placeholder="Contraseña" />
          <button className="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
