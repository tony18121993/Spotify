import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import "./ListaReproduccionCrear.css";
const CrearListaReproduccion = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [listaReproduccion, setListaReproduccion] = useState("");
  const [listasUsuario, setListasUsuario] = useState([]);
  const usuario = localStorage.getItem("usuario"); // Obtener el nombre de usuario del localStorage

  useEffect(() => {
    const tipoUsuarioGuardado = localStorage.getItem("tipo_usuario");
    if (tipoUsuarioGuardado) {
      setTipoUsuario(tipoUsuarioGuardado);
    }

    // Simulación de cargar las listas de reproducción del usuario desde algún origen de datos
    const listasUsuarioGuardadas = [
      {
        propietario: "pepe",
        nombreLista: "Lista 1",
        canciones: ["Canción 1", "Canción 2", "Canción 3"],
      },
      {
        propietario: "maria",
        nombreLista: "Lista 2",
        canciones: ["Canción 4", "Canción 5", "Canción 6"],
      },
      {
        propietario: "pepe",
        nombreLista: "Lista 3",
        canciones: ["Canción 7", "Canción 8", "Canción 9"],
      },
    ];

    // Filtrar las listas de reproducción del usuario actual
    const listasUsuarioFiltradas = listasUsuarioGuardadas.filter(
      (lista) => lista.propietario === usuario
    );
    setListasUsuario(listasUsuarioFiltradas);
  }, [usuario]);

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
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleGuardarLista = () => {
    // Crear la nueva lista de reproducción
    const nuevaLista = {
      propietario: usuario, // Usar el nombre de usuario del usuario actual
      nombreLista: listaReproduccion, // Usar el nombre de la lista ingresado
      canciones: [], // Inicialmente la lista de canciones está vacía
    };

    // Actualizar el array listasUsuario agregando la nueva lista
    setListasUsuario([...listasUsuario, nuevaLista]);

    // Aquí podrías incluir la lógica para guardar la nueva lista en tu base de datos
    console.log("Lista de reproducción guardada:", nuevaLista);

    // Cerrar el modal de crear lista
    setShowCreateModal(false);
  };

  return (
    <div className="crear-lista">
      {tipoUsuario === "gratuito" && (
        <div>
          <p>No puedes crear listas de reproducción. </p>
          <button onClick={handleChangePlan}>Pásate a Premium</button>
        </div>
      )}
      {tipoUsuario === "premium" && (
        <div>
          <h3>Crea tu lista de reproducción</h3>
          <button onClick={handleCrearLista}>
            Crear Lista de Reproducción
          </button>
          <div>
            <h3 className="mt-3">Tus listas de reproducción:</h3>
            <ListGroup className="lista_reproducciones">
              {listasUsuario.map((lista, index) => (
                <ListGroup.Item key={index}>
                  <h5>{lista.nombreLista}</h5>
                  <p>Propietario: {lista.propietario}</p>
                  <p>Canciones: {lista.canciones.join(", ")}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
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
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Introduce tus datos bancarios:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del titular"
                className="mb-2"
              />
              <Form.Control
                type="text"
                placeholder="Número de tarjeta"
                className="mb-2"
              />
              <Form.Control
                type="month"
                placeholder="Fecha de expiración"
                className="mb-2"
              />
              <Form.Control
                type="text"
                placeholder="Código de seguridad"
                className="mb-2"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpgradePlan}>
            Confirmar pago
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal para crear lista de reproducción */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Lista de Reproducción</Modal.Title>
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
                className="mb-2"
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
