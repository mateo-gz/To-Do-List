document.addEventListener("DOMContentLoaded", () => {
    const nombreTarea = document.querySelector(".tarea-nombre");
    const tareaEnviar = document.querySelector(".tarea-enviar");
    const contenedorTareas = document.querySelector(".contenedor-tareas");
    const tareasForm = document.querySelector(".tareas-form");
    const abrirContenedorTareas = document.getElementById("abrir-contenedor");

    // Función para mostrar tareas
    function mostrarTareas() {
        contenedorTareas.innerHTML = ""; // Evita duplicados limpiando el contenedor

        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

        tareas.forEach((tarea) => {
            let tareaDiv = document.createElement("div");
            tareaDiv.classList.add("tarea-div");
            tareaDiv.innerHTML = `${tarea.nombre} <button class="btn-remove" onclick="eliminarTarea(${tarea.id})">X</button>`;
            contenedorTareas.appendChild(tareaDiv);
        });
    }

    // Función para eliminar una tarea por ID
    window.eliminarTarea = (id) => {
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

        // Filtrar las tareas y quitar la que tiene el ID que queremos eliminar
        tareas = tareas.filter((tarea) => tarea.id !== id);

        // Guardar la nueva lista de tareas en localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas));

        // Volver a mostrar las tareas para actualizar la lista
        mostrarTareas();
    };

    tareasForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let nombreNuevaTarea = nombreTarea.value.trim();

        if (nombreNuevaTarea !== "") {
            let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

            let nuevaTarea = {
                id: Date.now(),
                nombre: nombreNuevaTarea
            };

            tareas.push(nuevaTarea);
            localStorage.setItem("tareas", JSON.stringify(tareas));

            nombreTarea.value = ""; // Limpiar input
            mostrarTareas(); // Volver a renderizar las tareas
        } else {
            alert("El nombre de la tarea está vacío");
        }
    });

    // Cargar tareas guardadas al inicio
    mostrarTareas();

    // Mostrar u ocultar el contenedor basado en el estado inicial del checkbox
    if (abrirContenedorTareas.checked) {
        contenedorTareas.style.display = "flex";
    } else {
        contenedorTareas.style.display = "none";
    }

    // Agregar evento para detectar cambios en el checkbox
    abrirContenedorTareas.addEventListener("change", () => {
        if (abrirContenedorTareas.checked) {
            contenedorTareas.style.display = "flex";
        } else {
            contenedorTareas.style.display = "none";
        }});
})
