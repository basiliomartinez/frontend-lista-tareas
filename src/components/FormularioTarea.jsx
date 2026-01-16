import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FormularioTarea = ({ agregarTarea }) => {
  const [tarea, setTarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarTarea(tarea);
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
      </Form>
    </section>
  );
};

export default FormularioTarea;
