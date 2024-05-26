import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ListaReproduccionCrear.css";
import { ReactComponent as PlayIcon } from "../svgs/play.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const CrearListaReproduccion = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [listaReproduccion, setListaReproduccion] = useState("");
  const [listasUsuario, setListasUsuario] = useState([]);
  const usuario = localStorage.getItem("usuario");

  useEffect(() => {
    const fetchTipoUsuario = async () => {
      try {
        const response = await fetch("http://localhost:5186/usuario/tipo", {
          method: "Post",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          
          setTipoUsuario(data.tipoUsuario);
        
        } else {
          console.error("Error al obtener el tipo de usuario:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener el tipo de usuario:", error);
      }
    };

    fetchTipoUsuario();

    // Resto del código para obtener y filtrar las listas de reproducción del usuario...
  }, [tipoUsuario]);
    // Filtrar las listas de reproducción del usuario actual
  //   const listasUsuarioFiltradas = listasUsuarioGuardadas.filter(
  //     (lista) => lista.propietario === usuario
  //   );
  //   setListasUsuario(listasUsuarioFiltradas);
  // }, [usuario]);

  const handleChangePlan = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpgradePlan = () => {
    // Lógica para actualizar el tipo de usuario
    localStorage.setItem("tipo_usuario", "premium");
    setShowModal(false);
    setTipoUsuario("premium");
  };

  const handleCrearLista = () => {
    setListaReproduccion('');
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    
  };

  const handleGuardarLista = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const nuevaLista = {
      id: id,
      propietario: usuario,
      nombreLista: listaReproduccion,
      img: "https://images.unsplash.com/photo-1587169544748-d21bd810f57e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      canciones: ["Canción 1", "Canción 2", "Canción 3"],
    };
    setListasUsuario([...listasUsuario, nuevaLista]);
    setShowCreateModal(false);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    const isFormValid = Object.keys(errors).length === 0;
    setFormValid(isFormValid);
  };

  const onSubmit = (data) => {
    
    handleUpgradePlan();
  };

  return (
    <div className="crear-lista">
      {tipoUsuario === false && (
        <div>
          <p>No puedes crear listas de reproducción. </p>
          <button onClick={handleChangePlan}>Pásate a Premium</button>
        </div>
      )}
      {tipoUsuario === true && (
       <div>
       <h3>Crea tu lista de reproducción</h3>
       <button onClick={handleCrearLista}>Crear Lista de Reproducción</button>
       <div>
         <h3 className="mt-3">Tus listas de reproducción:</h3>
         <div className="card-container-propia">
           {listasUsuario.map((lista, index) => (
             <Link to={`/inicio/playlist/${lista.id}`} key={index} className="enlace-card-propia">
               <div className="card-propia">
                 <div className="card-propia-Image">
                   <img src={lista.img} alt={lista.nombreLista} />
                 </div>
                 <div className="card-propia-Content">
                   <h3>{lista.nombreLista}</h3>
                   <p>Propietario: {lista.propietario}</p>
                   <p>Canciones: {lista.canciones.join(", ")}</p>
                 </div>
                 <span className="card-propia-playIcon">
                   <PlayIcon />
                 </span>
               </div>
             </Link>
           ))}
         </div>
       </div>
     </div>
      )}

<Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton={false} className="modal-header">
        <Modal.Title>Pásate a Premium</Modal.Title>
        <div className="custom-close-icon" onClick={handleCloseModal}>
          X
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>El precio del plan Premium es de 10 euros al año.</p>
        <Form onSubmit={handleSubmit(onSubmit)} onChange={validateForm}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Introduce tus datos bancarios:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del titular"
              className="mb-2"
              {...register('nombreTitular', { required: true, pattern: /^[A-Za-z ]{3,}$/ })}
            />
            {errors.nombreTitular && <span className="error">Por favor, introduce un nombre válido (mínimo 3 caracteres)</span>}
            <Form.Control
              type="text"
              placeholder="Número de tarjeta"
              className="mb-2"
              {...register('numeroTarjeta', { required: true, pattern: /^[0-9]{16}$/ })}
            />
            {errors.numeroTarjeta && <span className="error">Por favor, introduce un número de tarjeta válido (16 dígitos)</span>}
            <Form.Control
              type="month"
              placeholder="Fecha de expiración"
              className="mb-2"
              {...register('fechaExpiracion', { required: true })}
            />
            {errors.fechaExpiracion && <span className="error">Este campo es obligatorio</span>}
            <Form.Control
              type="text"
              placeholder="Código de seguridad"
              className="mb-2"
              {...register('codigoSeguridad', { required: true, pattern: /^[0-9]{3}$/ })}
            />
            {errors.codigoSeguridad && <span className="error">Por favor, introduce un código de seguridad válido (3 dígitos)</span>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Confirmar pago
        </Button>
      </Modal.Footer>
    </Modal>
      {/* Modal para crear lista de reproducción */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crea tu lista de reproducción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre de la lista de reproducción:</Form.Label>
              <Form.Control
                type="text"
                value={listaReproduccion}
                onChange={(e) => setListaReproduccion(e.target.value)}
                placeholder="Nombre de la lista"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarLista}>
            Guardar lista
          </Button>
        </Modal.Footer>
      </Modal>
 
    </div>
  );
};

export default CrearListaReproduccion;
