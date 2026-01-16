const urlTareas = import.meta.env.VITE_API_TAREAS;

// GET - listar tareas
export const leerTareasApi = async () => {
  try {
    const respuesta = await fetch(urlTareas);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// POST - crear tarea
export const crearTareaApi = async (tareaNueva) => {
  try {
    const respuesta = await fetch(urlTareas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaNueva),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// PUT - editar tarea
export const editarTareaApi = async (id, tareaEditada) => {
  try {
    const respuesta = await fetch(`${urlTareas}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// DELETE - borrar tarea
export const borrarTareaApi = async (id) => {
  try {
    const respuesta = await fetch(`${urlTareas}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
