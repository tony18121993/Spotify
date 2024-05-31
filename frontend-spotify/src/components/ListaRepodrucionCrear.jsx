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
  const [recarga,setRecarga]=useState(false);
  const [isPublica, setIsPublica] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTipoUsuario = async () => {
      try {
        const response = await fetch("http://localhost:5186/usuario/tipo", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTipoUsuario(data.tipoUsuario);
        } else {
          console.error(
            "Error al obtener el tipo de usuario:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error al obtener el tipo de usuario:", error);
      }
    };

    const fetchListasUsuario = async () => {
      try {
        const response = await fetch("http://localhost:5186/ObtenerListasUsuario", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setListasUsuario(data);
        } else {
          console.error(
            "Error al obtener las listas de reproducción del usuario:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error al obtener las listas de reproducción del usuario:", error);
      }
    };

    fetchTipoUsuario();
    if (tipoUsuario) {
      fetchListasUsuario();
    }
  }, [tipoUsuario, token,recarga,showCreateModal]);

  const handleChangePlan = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCrearLista = () => {
    setListaReproduccion("");
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleGuardarLista = async () => {
    try {
      const nuevaLista = {
        nombre: listaReproduccion,
        publica: isPublica,
      };

      const response = await fetch("http://localhost:5186/CrearLista", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevaLista),
      });

      if (response.ok) {
        const data = await response.json();
        
        setShowCreateModal(false);
      } else {
        console.error("Error al crear la lista:", response.status);
      }
    } catch (error) {
      console.error("Error al crear la lista:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    const isFormValid = Object.keys(errors).length === 0;
    setFormValid(isFormValid);
  };

  const onSubmit = async (data) => {
    try {
      // Obtener el valor del mes y el año de la fecha de expiración
      const [anno, mes] = data.FechaExpiracion.split("-");
      // Construir la fecha con el formato yyyy-mm-dd
      const fechaExpiracion = `${anno}-${mes}-01`;
      // Agregar la fecha de expiración al objeto de datos
      data.FechaExpiracion = fechaExpiracion;
  
      const response = await fetch("http://localhost:5186/Agregartarjeta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setShowModal(false);
        setRecarga(true);
      } else {
        console.error("Error al agregar la tarjeta:", response.status);
      }
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
    }
  };

  const handleEliminarPremium = async (data) => {
    try {
      const response = await fetch("http://localhost:5186/EliminarTarjeta", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecarga(true);
      } else {
        console.error(
          "Error al eliminar la tarjeta  del usuario:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al obtener las listas de reproducción del usuario:", error);
    }
  }

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
          <button onClick={handleCrearLista}>
            Crear Lista de Reproducción
          </button>
         
          <div>
            <h3 className="mt-3">Tus listas de reproducción:</h3>
            <div className="card-container-propia">
              {listasUsuario.map((lista, index) => (
                <Link
                  to={`/inicio/listas/${lista.idLista}`}
                  key={index}
                  className="enlace-card-propia"
                >
                  <div className="card-propia">
                    <div className="card-propia-Image">
                      <img src="https://cdn-icons-png.flaticon.com/512/565/565267.png" alt={lista.nombre} />
                    </div>
                    <div className="card-propia-Content mt-2">
                      <h3 className="mb-2">{lista.nombre}</h3>
                     
                      <p>{lista.publica ?  "Lista pública" : "Lista privada"}</p>

                    </div>
                    <span className="card-propia-playIcon">
                      <PlayIcon />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <button className="mt-5" onClick={handleEliminarPremium}>
            Cancelar suscripcion Premium
          </button>
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
                type="hidden"
                value={null}
                {...register("IdUsuario", { value: null })}
              />
              <Form.Control
                type="text"
                placeholder="Nombre del titular"
                className="mb-2"
                {...register("NombreTarjeta", {
                  required: true,
                  pattern: /^[A-Za-z ]{3,}$/,
                })}
              />
              {errors.NombreTarjeta && (
                <span className="error">
                  Por favor, introduce un nombre válido (mínimo 3 caracteres)
                </span>
              )}
              <Form.Control
                type="text"
                placeholder="Número de tarjeta"
                className="mb-2"
                {...register("NumeroTarjeta", {
                  required: true,
                  pattern: /^[0-9]{16}$/,
                })}
              />
              {errors.NumeroTarjeta && (
                <span className="error">
                  Por favor, introduce un número de tarjeta válido (16 dígitos)
                </span>
              )}
              <Form.Control
                type="month"
                placeholder="Fecha de expiración"
                className="mb-2"
                {...register("FechaExpiracion", { required: true })}
              />
              {errors.FechaExpiracion && (
                <span className="error">Este campo es obligatorio</span>
              )}
              <Form.Control
                type="text"
                placeholder="Código de seguridad"
                className="mb-2"
                {...register("Cvv", { required: true, pattern: /^[0-9]{3}$/ })}
              />
              {errors.Cvv && (
                <span className="error">
                  Por favor, introduce un código de seguridad válido (3 dígitos)
                </span>
              )}
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
            <Form.Group controlId="formBasicCheckbox" className="mt-3">
              <Form.Check 
                type="checkbox" 
                label="¿Lista pública?" 
                checked={isPublica}
                onChange={(e) => setIsPublica(e.target.checked)}
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
