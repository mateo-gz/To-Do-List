document.addEventListener("DOMContentLoaded", () => {
    const nombreTarea = document.querySelector(".tarea-nombre");
    const tareaEnviar = document.querySelector(".tarea-enviar");
    const contenedorTareas = document.querySelector(".contenedor-tareas");
    const contenedorTareasCompletadas = document.querySelector(".contenedor-tareas-completadas");
    const tareasForm = document.querySelector(".tareas-form");
    const abrirContenedorTareas = document.getElementById("abrir-contenedor");
    const abrirContenedorTareasCompletadas = document.getElementById("abrir-contenedor-tareas-completadas");

    // Mostrar tareas pendientes
    const mostrarTareas = ()=> {
        contenedorTareas.innerHTML = ""; 

        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

        tareas.forEach((tarea) => {
            let tareaDiv = document.createElement("div");
            tareaDiv.classList.add("tarea-div");
            tareaDiv.innerHTML = `
                <input type="checkbox" class="tarea-checkbox" data-id="${tarea.id}">
                ${tarea.nombre} 
                <button class="btn-remove" onclick="eliminarTarea(${tarea.id})">X</button> 
            `;
            contenedorTareas.appendChild(tareaDiv);
        });

        // Agregar eventos a los checkboxes
        document.querySelectorAll(".tarea-checkbox").forEach((checkbox) => {
            checkbox.addEventListener("change", (e) => {
                if (e.target.checked) {
                    moverATareasCompletadas(parseInt(e.target.dataset.id));
                }
            });
        });
    }

    // Mostrar tareas completadas
    const mostrarTareasCompletadas = ()=> {
        contenedorTareasCompletadas.innerHTML = "";

        let tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

        tareasCompletadas.forEach((tarea) => {
            let tareaDiv = document.createElement("div");
            tareaDiv.classList.add("tarea-div");
            tareaDiv.innerHTML = `
                ${tarea.nombre} 
                <button class="btn-remove" onclick="eliminarTareaCompletada(${tarea.id})">X</button>
            `;
            contenedorTareasCompletadas.appendChild(tareaDiv);
        });
    }

    // Mover tarea a completadas
    const moverATareasCompletadas = (id)=> {
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        let tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

        // Buscar la tarea
        let tarea = tareas.find(t => t.id === id);
        if (!tarea) return;

        // Moverla a completadas
        tareasCompletadas.push(tarea);
        tareas = tareas.filter(t => t.id !== id);

        // Guardar en localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas));
        localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));

        // Actualizar interfaz
        mostrarTareas();
        mostrarTareasCompletadas();
    }

    // Eliminar una tarea pendiente
    window.eliminarTarea = (id) => {
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareas = tareas.filter(tarea => tarea.id !== id);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrarTareas();
    };

    // Eliminar una tarea completada
    window.eliminarTareaCompletada = (id) => {
        let tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];
        tareasCompletadas = tareasCompletadas.filter(tarea => tarea.id !== id);
        localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
        mostrarTareasCompletadas();
    };

    // Agregar tarea nueva
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
            mostrarTareas(); // Volver a renderizar
        } else {
            alert("El nombre de la tarea está vacío");
        }
    });

    // Mostrar tareas al cargar
    mostrarTareas();
    mostrarTareasCompletadas();

    // Mostrar u ocultar contenedores según checkboxes
    abrirContenedorTareas.addEventListener("change", () => {
        contenedorTareas.style.display = abrirContenedorTareas.checked ? "flex" : "none";
    });

    abrirContenedorTareasCompletadas.addEventListener("change", () => {
        contenedorTareasCompletadas.style.display = abrirContenedorTareasCompletadas.checked ? "flex" : "none";
    });
});