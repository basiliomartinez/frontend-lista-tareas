import { useEffect, useState } from "react";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
import {
  leerTareasApi,
  crearTareaApi,
  borrarTareaApi,
  editarTareaApi,
} from "./helpers/queries";

const App = () => {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    const respuesta = await leerTareasApi();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      setTareas(datos);
    } else {
      console.error("Error al leer tareas");
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const agregarTarea = async (texto) => {
    // validación simple (después mejoramos con alert)
    if (!texto || texto.trim().length < 2) {
      return;
    }

    const respuesta = await crearTareaApi({ tarea: texto.trim() });
    if (respuesta && respuesta.status === 201) {
      cargarTareas();
    } else {
      const error = respuesta ? await respuesta.json() : null;
      console.error("Error al crear tarea", error);
    }
  };

  const borrarTarea = async (id) => {
    const respuesta = await borrarTareaApi(id);
    if (respuesta && respuesta.status === 200) {
      cargarTareas();
    } else {
      console.error("Error al borrar tarea");
    }
  };

  const iniciarEdicion = async (tarea) => {
    const nuevoTexto = prompt("Editar tarea:", tarea.tarea);

    if (!nuevoTexto) return;

    const respuesta = await editarTareaApi(tarea._id, { tarea: nuevoTexto });
    if (respuesta && respuesta.status === 200) {
      cargarTareas();
    } else {
      const error = respuesta ? await respuesta.json() : null;
      console.error("Error al editar tarea", error);
    }
  };

  return (
    <main className="container py-4">
      <div className="notebook">
        <div className="notebook-content"></div>
        <header className="text-center">
          <h1 className="display-5">Lista de Tareas</h1>
          <p className="text-muted">React + Node + MongoDB</p>
        </header>

        <FormularioTarea agregarTarea={agregarTarea} />

        <ListaTareas
          tareas={tareas}
          borrarTarea={borrarTarea}
          iniciarEdicion={iniciarEdicion}
        />
      </div>
    </main>
  );
};

export default App;
