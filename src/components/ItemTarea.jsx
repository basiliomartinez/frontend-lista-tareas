import { Button, ListGroup } from "react-bootstrap";

const ItemTarea = ({ tarea, borrarTarea, iniciarEdicion }) => {
  return (
    <ListGroup className="mb-2">
<ListGroup.Item className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
        <span>{tarea.tarea}</span>
<div className="d-flex flex-wrap gap-2">
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
