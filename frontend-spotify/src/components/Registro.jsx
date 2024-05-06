import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Registrostyles.css'; 
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const onSubmit = (data) => {
    // Aquí puedes realizar la lógica para enviar los datos del formulario al backend
    console.log(data);
    // Simplemente mostraremos un mensaje de éxito
    alert('¡Registro exitoso!');
    history("/");
  };

  return (
    <div className="register-page">
      <div className="form-register">
        <img src="https://www.scdn.co/i/_global/open-graph-default.png" alt="Spotify Logo" className="spotify-logo" />
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
            {errors.email && <span className="error">Email requerido</span>}
          </div>
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Nombre de usuario" {...register('username', { required: true })} />
            {errors.username && <span className="error">Nombre de usuario requerido</span>}
          </div>
          <div className="col-md-6">
            <input type="password" className="input-field" placeholder="Contraseña" {...register('password', { required: true, minLength: 4 })} />
            {errors.password && errors.password.type === "required" && <span className="error">Contraseña requerida</span>}
            {errors.password && errors.password.type === "minLength" && <span className="error">La contraseña debe tener al menos 4 caracteres</span>}
          </div>
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Dirección" {...register('direccion', { required: true })} />
            {errors.direccion && <span className="error">Dirección requerida</span>}
          </div>
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Teléfono" {...register('telefono', { required: true, pattern: /^[0-9]+$/ })} />
            {errors.telefono && <span className="error">Teléfono requerido (solo números)</span>}
          </div>
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Fecha de nacimiento" {...register('fecha_nacimiento', { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ })} />
            {errors.fecha_nacimiento && <span className="error">Fecha de nacimiento requerida (formato: YYYY-MM-DD)</span>}
          </div>
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Nombre" {...register('nombre', { required: true })} />
            {errors.nombre && <span className="error">Nombre requerido</span>}
          </div>
          <div className="col-md-6">
            <input type="text" className="input-field" placeholder="Apellido" {...register('apellido', { required: true })} />
            {errors.apellido && <span className="error">Apellido requerido</span>}
          </div>
          <div className="col-12">
            <button type="submit" className="register-button">Registrarse</button>
          </div>
          {errorMessage && <span className="error">{errorMessage}</span>}
        </form>
        <p className="register-link pt-4">¿Ya tienes cuenta? <a className='enlace-registro' href="/">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
