import { Button, ListGroup } from "react-bootstrap";

const ItemTarea = ({ tarea, borrarTarea, iniciarEdicion }) => {
  return (
    <ListGroup className="mb-2">
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <span>{tarea.tarea}</span>
        <div>
          <Button
            variant="warning"
            className="me-2"
            onClick={() => iniciarEdicion(tarea)}
          >
            Editar
          </Button>
          <Button variant="danger" onClick={() => borrarTarea(tarea._id)}>
            Borrar
          </Button>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ItemTarea;
