import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Loginstyle.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://www.spotify-backend.work.gd/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fallo en el login');
      }

      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem('token', token);

      const tipousuarioResponse = await fetch("https://www.spotify-backend.work.gd/usuario/administrador", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!tipousuarioResponse.ok) {
        throw new Error('Fallo al autenticar vuelve a intentarlo en unos momentos ');
      }

      const tipousuarioData = await tipousuarioResponse.json();
      
      const isAdmin = tipousuarioData.tipoUsuario;

      if (isAdmin) {
        var expires = new Date();
    
        // Establecer la fecha de expiración en una hora
        expires.setTime(expires.getTime() + (60 * 60 * 1000)); // 60 minutos * 60 segundos * 1000 milisegundos
    
        // Crear la cadena de la cookie con la fecha de expiración y los atributos SameSite y Secure
        var cookieString = `auth_token=${token}; path=/; SameSite=None; Secure; expires=${expires.toUTCString()}`;
    
        // Establecer la cookie
        document.cookie = cookieString;
        localStorage.removeItem('token');
        window.location.href = `https://www.spotify-backend.work.gd/usuarios`;
    } else {
        navigate('/inicio');
    }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="form-login">
        <img src="https://www.scdn.co/i/_global/open-graph-default.png" alt="Spotify Logo" className="spotify-logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" className="username-input col-12" placeholder="Nombre de usuario" {...register('username', { required: true })} />
          {errors.username && <span className="error">Nombre de usuario requerido</span>}
          <input type="password" className="password-input col-12" placeholder="Contraseña" {...register('password', { required: true })} />
          {errors.password && <span className="error">Contraseña requerida</span>}
          <br />
          {errorMessage && <span className="error">{errorMessage}</span>}
          <button type="submit" className="login-button col-12">Iniciar sesión</button>
        </form>
        <div className="pt-4">
          <p className="register-link">¿No tienes cuenta? <Link className='enlace-registro' to="/registro">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
