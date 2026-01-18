import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const FormularioTarea = ({ agregarTarea }) => {
  const [tarea, setTarea] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tarea || tarea.trim().length < 2) {
      setError("La tarea debe tener al menos 2 caracteres");
      return;
    }

    setError("");
    agregarTarea(tarea.trim());
    setTarea("");
  };

  return (
    <section className="my-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese una tarea</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Comprar pan"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar
        </Button>

        {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
      </Form>
    </section>
  );
};

export default FormularioTarea;
