
const listaAlumnos = JSON.parse(localStorage.getItem('lista_alumnos')) || []
const alumnosContenedor = document.getElementById("alumnos-contenedor")

class alumno {
    constructor(nombre, apellido, curso, notaMate, notaLengua, notaIngles) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.curso = curso;
        this.notaMate = notaMate;
        this.notaLengua = notaLengua;
        this.notaIngles = notaIngles;
        this.promedio = Number((notaMate + notaLengua + notaIngles)/3).toFixed(2)
    }
}

creadoraDeCards()

function agregarAlumno() {
    document.querySelectorAll(".pop-up").forEach(popup => popup.remove())

    const ventanaEmergente = document.createElement("form")
    ventanaEmergente.className = "agregar-alumno-menu pop-up"
    ventanaEmergente.id = "agregar-alumno-menu"
    ventanaEmergente.innerHTML = `
        <h2 class="titulo">Agregar Alumno</h2>
        <div class="inputs">
            <div class="columna">
                <div class="input-contenedor">
                    <label for="alumno-nombre">Nombre:</label>
                    <input type="text" name="nombre" id="alumno-nombre" required>
                </div>
                <div class="input-contenedor">
                    <label for="alumno-apellido">Apellido:</label>
                    <input type="text" name="apellido" id="alumno-apellido" required>
                </div>
                <div class="input-contenedor">
                    <label for="alumno-curso">Curso:</label>
                    <select name="curso" id="alumno-curso">
                        <option value="1°">Primer Grado</option>
                        <option value="2°">Segundo Grado</option>
                        <option value="3°">Tercero Grado</option>
                        <option value="4°">Cuarto Grado</option>
                        <option value="5°">Quinto Grado</option>
                        <option value="6°">Sexto Grado</option>
                    </select>
                </div>
            </div>
            <div class="columna">
                <div class="input-contenedor">
                    <label for="alumno-nota-matematica">Nota de Matemática:</label>
                        <select name="nota-matematica" id="alumno-nota-matematica">
                            ${crearOpcionesNota()}
                        </select>
                </div>
                <div class="input-contenedor">
                    <label for="alumno-nota-lengua">Nota de Lenguaje:</label>
                        <select name="nota-lengua" id="alumno-nota-lengua">
                            ${crearOpcionesNota()}
                        </select>
                </div>
                <div class="input-contenedor">
                    <label for="alumno-nota-ingles">Nota de Inglés:</label>
                        <select name="nota-ingles" id="alumno-nota-ingles">
                            ${crearOpcionesNota()}
                        </select>
                </div>
            </div>
        </div>
        <input type="submit" class="submit">
        <button class="boton-salir" id="boton-salir">X</button>
        `
    document.body.append(ventanaEmergente)
    ventanaEmergente.querySelector("#boton-salir").addEventListener("click", () => salir("agregar-alumno-menu"))

    ventanaEmergente.addEventListener("submit", (ele) => {
        ele.preventDefault()
        const nombre = document.getElementById("alumno-nombre").value
        const apellido = document.getElementById("alumno-apellido").value
        const curso = document.getElementById("alumno-curso").value
        const notaMate = Number(document.getElementById("alumno-nota-matematica").value)
        const notaLengua = Number(document.getElementById("alumno-nota-lengua").value)
        const notaIngles = Number(document.getElementById("alumno-nota-ingles").value)

        const nuevoAlumno = new alumno(nombre, apellido, curso, notaMate, notaLengua, notaIngles)
        listaAlumnos.push(nuevoAlumno)
        localStorage.setItem('lista_alumnos', JSON.stringify(listaAlumnos))

        console.log(listaAlumnos)
        salir("agregar-alumno-menu")
        creadoraDeCards()
    })
}
const agregarAlumnoBoton = document.getElementById("agregar-alumno")
agregarAlumnoBoton.addEventListener("click", agregarAlumno)

function salir(ventanaID) {
    const ventanaEmergente = document.getElementById(ventanaID)
    ventanaEmergente.remove()
}

function crearOpcionesNota() {
    let opcion = ""
    for (let i = 1; i <= 10; i++) {
        opcion += `<option value="${i}">${i}</option>`
    }
    return opcion
}

function creadoraDeCards() {
    if (listaAlumnos.length == 0) {
        alumnosContenedor.innerHTML = `<div class="mensaje centrado">No hay alumnos registrados aún</div>`
    }else {
        alumnosContenedor.innerHTML = ``
    }

    listaAlumnos.forEach((alumno) => {
        const card = document.createElement("article")
        card.className = "alumno-card"
        card.innerHTML = `
            <img src="img/retrato-alumno.jpg" alt="Foto del Alumno" class="alumno-img">
            <h2 class="alumno-nombre">${alumno.nombre}<br>${alumno.apellido}</h2>
            <h3>Curso: ${alumno.curso}</h3>
            <button class="alumno-boton">Más info</button>
        `
        card.querySelector(".alumno-boton").addEventListener("click", () => mostrarInfo(alumno))
        alumnosContenedor.appendChild(card)
	})
}

function mostrarInfo(alumno) {
    document.querySelectorAll(".pop-up").forEach(ele => ele.remove())

    const ventanaEmergente = document.createElement("article")
    ventanaEmergente.className = "alumno-info pop-up"
    ventanaEmergente.id = "alumno-info"
    ventanaEmergente.innerHTML = `
    <div class="encabezado">
        <h2 class="titulo">${alumno.nombre} ${alumno.apellido}</h2>
        <div class="info">
            Curso: ${alumno.curso}
        </div>
    </div>
    <div class="info-contenedor">
        <div class="info">
            Nota de Matemáticas: ${alumno.notaMate}
        </div>
        <div class="info">
            Nota de Lenguaje: ${alumno.notaLengua}
        </div>
        <div class="info">
            Nota de Inglés: ${alumno.notaIngles}
        </div>
        <div class="info">
            Promedio: ${alumno.promedio}
        </div>
    </div>
    <button class="boton-salir" id="boton-salir">Cerrar</button>
    `
    document.body.append(ventanaEmergente)
    document.getElementById("boton-salir").addEventListener("click", () => salir("alumno-info"))
}

function eliminarAlumno() {
    document.querySelectorAll(".pop-up").forEach(popup => popup.remove())

    const ventanaEmergente = document.createElement("div")
    ventanaEmergente.className = "eliminar-alumno-menu pop-up"
    ventanaEmergente.id = "eliminar-alumno-menu"

    function renderizarLista() {
        const nombres = nombresDeAlumnos()
        if (nombres.length == 0) {
            ventanaEmergente.innerHTML = `
                <div class="mensaje fondo">
                    No hay alumnos registrados aún
                </div>
                <button class="boton-salir" id="boton-salir">Cerrar</button>
        `}else {
            ventanaEmergente.innerHTML = `
            <div class="alumnos-eliminar-contenedor">
                ${nombres.map((datos, i) => `
                <div class="alumno-item" data-index="${i}">${datos}
                    <button class="boton-eliminar" id="boton-eliminar">Eliminar</button>
                </div>`).join("")}
            </div>
            <button class="boton-salir" id="boton-salir">Cerrar</button>
        `}
        
        const botonesEliminar = ventanaEmergente.querySelectorAll(".boton-eliminar")
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", () => {
                const i = boton.closest(".alumno-item").dataset.index
                listaAlumnos.splice(i, 1)
                localStorage.setItem('lista_alumnos', JSON.stringify(listaAlumnos))
                creadoraDeCards()
                renderizarLista()
            })
        })
        document.getElementById("boton-salir").addEventListener("click", () => salir("eliminar-alumno-menu"))
    }
    document.body.append(ventanaEmergente)
    renderizarLista()
}

function nombresDeAlumnos() {
    return listaAlumnos.map(ele => `Alumno: ${ele.nombre} ${ele.apellido}. Curso: ${ele.curso}`)
}

const eliminarAlumnoBoton = document.getElementById("eliminar-alumno")
eliminarAlumnoBoton.addEventListener("click", () => eliminarAlumno())

function abrirMenuFiltro() {
    const menuAbierto = document.querySelector(".filtro-desplegable")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }

    const menuFiltro = document.createElement("ul")
    menuFiltro.className = "filtro-desplegable"
    menuFiltro.innerHTML = `
        <li id="cursos-contenedor"><button class="opcion-filtro" id="abrir-cursos">Por Curso</button></li>
        <li><button class="opcion-filtro" id="promedio-aprobado">Por promedio aprobado</button></li>
        <li><button class="opcion-filtro" id="promedio-desaprobado">Por promedio desaprobado</button></li>
        <li><button class="opcion-filtro" id="borrar-filtros">Borrar filtros</button></li>
    `
    
    const contenedorMenu = document.getElementById("filtro-contenedor")
    contenedorMenu.append(menuFiltro)

    const botonAbrirCursos = document.getElementById("abrir-cursos")
    botonAbrirCursos.addEventListener("click", () => menuCursos())
    const botonFiltrarPromAprob = document.getElementById("promedio-aprobado")
    botonFiltrarPromAprob.addEventListener("click", () => filtrarListaProm(prom => prom >= 7))
    const botonFiltrarPromDesaprob = document.getElementById("promedio-desaprobado")
    botonFiltrarPromDesaprob.addEventListener("click", () => filtrarListaProm(prom => prom <= 6))
    const botonBorrarFiltros = document.getElementById("borrar-filtros")
    botonBorrarFiltros.addEventListener("click", () => creadoraDeCards())
}

const botonFiltroMenu = document.getElementById("filtro-abrir-desplegable")
botonFiltroMenu.addEventListener("click", () => abrirMenuFiltro())

function menuCursos() {
    const menuAbierto = document.querySelector(".cursos-desplegable")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }

    const menuCursos = document.createElement("ul")
    menuCursos.className = "cursos-desplegable"
    menuCursos.innerHTML = `
        <li><button class="opcion-filtro curso" id="primero">1°</button></li>
        <li><button class="opcion-filtro curso" id="segundo">2°</button></li>
        <li><button class="opcion-filtro curso" id="tercero">3°</button></li>
        <li><button class="opcion-filtro curso" id="cuarto">4°</button></li>
        <li><button class="opcion-filtro curso" id="quinto">5°</button></li>
        <li><button class="opcion-filtro curso" id="sexto">6°</button></li>
    `
    const menuContenedor = document.getElementById("cursos-contenedor")
    menuContenedor.append(menuCursos)

    const botones = [
        { id: "primero", curso: "1°" },
        { id: "segundo", curso: "2°" },
        { id: "tercero", curso: "3°" },
        { id: "cuarto", curso: "4°" },
        { id: "quinto", curso: "5°" },
        { id: "sexto", curso: "6°" }
    ]

    botones.forEach(({ id, curso }) => {    
        document.getElementById(id).addEventListener("click", () => {
            filtrarPorCurso(c => c === curso)
        })
    })
}

function filtrarPorCurso(curso) {
    const listaFiltrada = []

    listaAlumnos.forEach((ele) => {
        if (curso(ele.curso)) {
            listaFiltrada.push(ele)
        }
    })

    console.log(listaFiltrada)

    if (listaFiltrada.length == 0) {
        alumnosContenedor.innerHTML = `<div class="mensaje centrado">No hay alumnos de este curso aún</div>`
        return
    }else {
        alumnosContenedor.innerHTML = ``
    }

    listaFiltrada.forEach((alumno) => {
        const card = document.createElement("article")
        card.className = "alumno-card"
        card.innerHTML = `
            <img src="img/retrato-alumno.jpg" alt="Foto del Alumno" class="alumno-img">
            <h2 class="alumno-nombre">${alumno.nombre}<br>${alumno.apellido}</h2>
            <h3>Curso: ${alumno.curso}</h3>
            <button class="alumno-boton">Más info</button>
        `
        card.querySelector(".alumno-boton").addEventListener("click", () => mostrarInfo(alumno))
        alumnosContenedor.appendChild(card)
    })
}

function filtrarListaProm(criterio) {
    const listaFiltrada = []

    listaAlumnos.forEach((ele) => {
        if (criterio(ele.promedio)) {
            listaFiltrada.push(ele)
        }
    })

    if (listaFiltrada.length == 0) {
        alumnosContenedor.innerHTML = `<div class="mensaje centrado">No hay alumnos con que cumplan aún</div>`
        return
    }else {
        alumnosContenedor.innerHTML = ``
    }

    listaFiltrada.forEach((alumno) => {
        const card = document.createElement("article")
        card.className = "alumno-card"
        card.innerHTML = `
            <img src="img/retrato-alumno.jpg" alt="Foto del Alumno" class="alumno-img">
            <h2 class="alumno-nombre">${alumno.nombre}<br>${alumno.apellido}</h2>
            <h3>Promedio: ${alumno.promedio}</h3>
            <button class="alumno-boton">Más info</button>
        `
        card.querySelector(".alumno-boton").addEventListener("click", () => mostrarInfo(alumno))
        alumnosContenedor.appendChild(card)
    })
}