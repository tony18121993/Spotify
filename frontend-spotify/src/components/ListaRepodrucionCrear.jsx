import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaReproduccionCrear.css';

const CrearListaReprodruccion = () => {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState('');

  useEffect(() => {
    const tipoUsuarioGuardado = localStorage.getItem('tipo_usuario');
    if (tipoUsuarioGuardado) {
      setTipoUsuario(tipoUsuarioGuardado);
    }
  }, []);

  const handleChangePlan = () => {
    // Redirigir a la página para cambiar de plan
    navigate('/cambiar-plan');
  };

  const handleCrearLista = () => {
    // Lógica para crear lista de reproducción
    // Aquí puedes redirigir a la página para crear la lista de reproducción o ejecutar la lógica necesaria.
    console.log('Lista de reproducción creada');
  };

  return (
    <div className="crear-lista">
      {tipoUsuario === 'gratuito' && (
        <div>
          <p>No puedes crear listas de reproducción. </p>
          <button onClick={handleChangePlan}>Pásate a Premium</button>
        </div>
      )}
      {tipoUsuario === 'premium' && (
        <div>
          <p>Crea tu lista de reproducción</p>
          <button onClick={handleCrearLista}>Crear Lista de Reproducción</button>
        </div>
      )}
    </div>
  );
};

export default CrearListaReprodruccion;
