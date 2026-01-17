import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
import ModalEditarTarea from "./components/ModalEditarTarea";
import {
  leerTareasApi,
  crearTareaApi,
  borrarTareaApi,
  editarTareaApi,
} from "./helpers/queries";

const App = () => {
  const [tareas, setTareas] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  // Alert global (errores de API)
  const [mensajeError, setMensajeError] = useState("");

  const cargarTareas = async () => {
    try {
      const respuesta = await leerTareasApi();

      if (respuesta && respuesta.status === 200) {
        const datos = await respuesta.json();
        setTareas(datos);
        setMensajeError("");
      } else {
        setMensajeError("No se pudieron cargar las tareas");
      }
    } catch (error) {
      console.error(error);
      setMensajeError("Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const agregarTarea = async (texto) => {
    if (!texto || texto.trim().length < 2) return;

    try {
      const respuesta = await crearTareaApi({ tarea: texto.trim() });

      if (respuesta && respuesta.status === 201) {
        setMensajeError("");
        cargarTareas();
      } else {
        const error = respuesta ? await respuesta.json() : null;
        console.error(error);
        setMensajeError("No se pudo crear la tarea");
      }
    } catch (error) {
      console.error(error);
      setMensajeError("Error al conectar con el servidor");
    }
  };

  const borrarTarea = async (id) => {
    try {
      const respuesta = await borrarTareaApi(id);

      if (respuesta && respuesta.status === 200) {
        setMensajeError("");
        cargarTareas();
      } else {
        setMensajeError("No se pudo borrar la tarea");
      }
    } catch (error) {
      console.error(error);
      setMensajeError("Error al conectar con el servidor");
    }
  };

  const iniciarEdicion = (tarea) => {
    setTareaSeleccionada(tarea);
    setShowModal(true);
  };

  const guardarEdicion = async (id, nuevoTexto) => {
    try {
      const respuesta = await editarTareaApi(id, { tarea: nuevoTexto });

      if (respuesta && respuesta.status === 200) {
        setMensajeError("");
        setShowModal(false);
        setTareaSeleccionada(null);
        cargarTareas();
      } else {
        const error = respuesta ? await respuesta.json() : null;
        console.error(error);
        setMensajeError("No se pudo editar la tarea");
      }
    } catch (error) {
      console.error(error);
      setMensajeError("Error al conectar con el servidor");
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    setTareaSeleccionada(null);
  };

  return (
    <main className="container py-4">
      <div className="notebook">
        <div className="notebook-content"></div>

        <header className="text-center">
          <h1 className="display-5">Lista de Tareas</h1>
          <p className="text-muted">React + Node + MongoDB</p>
        </header>

        {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}

        <FormularioTarea agregarTarea={agregarTarea} />

        <ListaTareas
          tareas={tareas}
          borrarTarea={borrarTarea}
          iniciarEdicion={iniciarEdicion}
        />

        <ModalEditarTarea
          show={showModal}
          handleClose={cerrarModal}
          tareaSeleccionada={tareaSeleccionada}
          guardarEdicion={guardarEdicion}
        />
      </div>
    </main>
  );
};

export default App;
