import ItemTarea from "./ItemTarea";

const ListaTareas = ({ tareas, borrarTarea, iniciarEdicion }) => {
  return (
    <section className="my-4">
      {tareas.map((t) => (
        <ItemTarea
          key={t._id}
          tarea={t}
          borrarTarea={borrarTarea}
          iniciarEdicion={iniciarEdicion}
        />
      ))}
    </section>
  );
};

export default ListaTareas;
