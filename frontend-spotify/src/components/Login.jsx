import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Loginstyle.css';
import { useNavigate } from 'react-router-dom';

// Función para generar un token aleatorio
function generateToken() {
  // Longitud del token
  const tokenLength = 20;
  // Caracteres posibles para el token
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  // Generar el token aleatorio
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}


const usuarios = [
  { username: 'pepe', password: 'pepe', tipo_usuario: 'premium' },
  { username: 'maria', password: 'maria', tipo_usuario: 'gratuito' },
  { username: 'juan', password: 'juan123', tipo_usuario: 'premium' },
  { username: 'laura', password: 'laura123', tipo_usuario: 'gratuito' },
  { username: 'carlos', password: 'carlos123', tipo_usuario: 'premium' },
  { username: 'ana', password: 'ana123', tipo_usuario: 'gratuito' }
];


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    // Buscar el usuario ingresado en el array de usuarios
    const usuario = usuarios.find(u => u.username === data.username && u.password === data.password);
    
    if (usuario) {
      // Si el usuario es encontrado, generar un token aleatorio
      const token = generateToken();
      // Guardar el token en el localStorage
      localStorage.setItem('token', token);
      // Guardar el tipo de usuario en el localStorage
      localStorage.setItem('tipo_usuario', usuario.tipo_usuario);
      // Redirigir a la página de inicio
      navigate('/inicio');
    } else {
      // Si el usuario no es encontrado, mostrar un mensaje de error
      setErrorMessage('Nombre de usuario o contraseña incorrectos');
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
          <p className="register-link">¿No tienes cuenta? <a className='enlace-registro' href="/registro">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
