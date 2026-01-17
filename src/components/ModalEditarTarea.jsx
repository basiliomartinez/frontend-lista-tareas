import { useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

const ModalEditarTarea = ({ show, handleClose, tareaSeleccionada, guardarEdicion }) => {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (tareaSeleccionada) {
      setTexto(tareaSeleccionada.tarea);
      setError("");
    }
  }, [tareaSeleccionada]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!texto || texto.trim().length < 2) {
      setError("La tarea debe tener al menos 2 caracteres");
      return;
    }

    guardarEdicion(tareaSeleccionada._id, texto.trim());
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar tarea</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva tarea</Form.Label>
            <Form.Control
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditarTarea;
