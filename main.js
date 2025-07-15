
const listaAlumnos = JSON.parse(localStorage.getItem('lista_alumnos')) || []
const alumnosContenedor = document.getElementById("alumnos-contenedor")
let listaRenderizada = []

class Alumno {
    constructor(id, nombre, apellido, sexo, imagen, curso, notaMate, notaLengua, notaIngles,) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.imagen = imagen || "img/retrato-alumno.jpg";
        this.curso = curso;
        this.notaMate = notaMate;
        this.notaLengua = notaLengua;
        this.notaIngles = notaIngles;
        this.promedio = Number((notaMate + notaLengua + notaIngles)/3).toFixed(2)
    }
}

function generarIdUnico() {
    const parte1 = Date.now().toString(36);
    const parte2 = Math.random().toString(36).substring(2);
    return parte1 + parte2;
}

function renderizarCards(lista, mensajeVacio, mensajeCallback = () => "") {
    listaRenderizada = []

    if (lista.length == 0) {
            alumnosContenedor.innerHTML = `
                <div class="mensaje-centrado">${mensajeVacio}</div>`
        }else {
            alumnosContenedor.innerHTML = ``
        }

    lista.forEach((alumno) => {
        const card = document.createElement("article")
        card.className = "alumno-card"
        card.innerHTML = `
            <img src="${alumno.imagen}" alt="Foto del Alumno" class="alumno-img">
            <h2 class="alumno-nombre">${alumno.nombre}<br>${alumno.apellido}</h2>
            <h3>${mensajeCallback(alumno)}</h3>
            <button class="alumno-boton">Más info</button>
        `
        card.querySelector(".alumno-boton").addEventListener("click", () => mostrarInfo(alumno))
        alumnosContenedor.appendChild(card)
        listaRenderizada.push(alumno)
    })
}

renderizarCards(listaAlumnos, "No hay alumnos registrados aún.", alumno => `Curso: ${alumno.curso}`)

function agregarAlumno() {
    const menuAbierto = document.getElementById("agregar-alumno-menu")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }

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
                    <input type="text" name="nombre" id="alumno-nombre">
                </div>
                <div class="input-contenedor">
                    <label for="alumno-apellido">Apellido:</label>
                    <input type="text" name="apellido" id="alumno-apellido">
                </div>
                <div class="input-contenedor">
                    <label for="alumno-sexo">Sexo:</label>
                    <select name="sexo" id="alumno-sexo">
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                    </select>
                </div>
            </div>
            <div class="columna">
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
    ventanaEmergente.querySelector("#boton-salir").addEventListener("click", () => {
        ["agregar-alumno-menu"].forEach(salir)
    })

    ventanaEmergente.addEventListener("submit", async (ele) => {
        ele.preventDefault()
        const id = generarIdUnico()
        const nombre = document.getElementById("alumno-nombre").value
        const apellido = document.getElementById("alumno-apellido").value
        let sexo = document.getElementById("alumno-sexo").value
        const curso = document.getElementById("alumno-curso").value
        const notaMate = Number(document.getElementById("alumno-nota-matematica").value)
        const notaLengua = Number(document.getElementById("alumno-nota-lengua").value)
        const notaIngles = Number(document.getElementById("alumno-nota-ingles").value)

        if (!nombre || !apellido) {
            swal.fire({
                title: `<div class="alert-titulo">Por favor, completa todos los campos</div>`,
                icon: "warning",
                iconColor: "#cb1818",
                color: "#000",
                background: "#1B246B",
                timer: "3000",
                timerProgressBar: "true",
                showConfirmButton: false,
            })
            return
        }

        const duplicado = listaAlumnos.some(a => a.nombre === nombre && a.apellido === apellido && a.curso === curso)
        if (duplicado) {
            swal.fire({
                title: `<div class="alert-titulo">Por favor, completa todos los campos</div>`,
                icon: "warning",
                iconColor: "#cb1818",
                color: "#000",
                background: "#1B246B",
                timer: "3000",
                timerProgressBar: "true",
                showConfirmButton: false,
            })
            return
        }

        const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        if (!soloLetras.test(nombre) || !soloLetras.test(apellido)) {
            alerta("El nombre y el apellido no deben contener números.")
            return
        }

        const imagenAlumno = await crearImagen(sexo) || img/retrato-alumno.jpg

        if (sexo == "male") {
            sexo = "Masculino"
        }else {
            sexo = "Femenino"
        }

        const nuevoAlumno = new Alumno(id, nombre, apellido, sexo, imagenAlumno, curso, notaMate, notaLengua, notaIngles)
        
        listaAlumnos.push(nuevoAlumno)
        localStorage.setItem('lista_alumnos', JSON.stringify(listaAlumnos))

        renderizarCards(listaAlumnos, "No hay alumnos registrados aún.", alumno => `Curso: ${alumno.curso}`)
        salir("agregar-alumno-menu")
        swal.fire({
            title: `<div class="alert-titulo">Alumno añadido</div>`,
            icon: "success",
            color: "#000",
            background: "#1B246B",
            timer: "2000",
            timerProgressBar: "true",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
        })
    })
}

const agregarAlumnoBoton = document.getElementById("agregar-alumno")
agregarAlumnoBoton.addEventListener("click", agregarAlumno)

async function crearImagen(sexo) {
    try {
        let res = await fetch(`https://randomuser.me/api/?gender=${sexo}`)
        let data = await res.json()
        return data.results[0].picture.large
    } catch (error) {
        alert(error.name)
    }
}

function salir(ventanaID) {
    const ventanaEmergente = document.getElementById(ventanaID)
    if (ventanaEmergente) {
        ventanaEmergente.remove()
    }
}

function crearOpcionesNota() {
    let opcion = ""
    for (let i = 1; i <= 10; i++) {
        opcion += `<option value="${i}">${i}</option>`
    }
    return opcion
}

function mostrarInfo(alumno) {
    const menuAbierto = document.getElementById(`alumno-info-${alumno.id}`)
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }

    document.querySelectorAll(".pop-up").forEach(ele => ele.remove())

    const ventanaEmergente = document.createElement("article")
    ventanaEmergente.className = "alumno-info pop-up"
    ventanaEmergente.id = `alumno-info-${alumno.id}`
    ventanaEmergente.innerHTML = `
    <div class="encabezado">
        <img src="${alumno.imagen}" alt="Retrato">
        <div class="info-sexo">
            Sexo: ${alumno.sexo}
        </div>
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
    document.getElementById("boton-salir").addEventListener("click", () => salir(`alumno-info-${alumno.id}`))
}

function eliminarAlumno() {
    const menuAbierto = document.getElementById("eliminar-alumno-menu")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }

    document.querySelectorAll(".pop-up").forEach(popup => popup.remove())

    const ventanaEmergente = document.createElement("div")
    ventanaEmergente.className = "eliminar-alumno-menu pop-up"
    ventanaEmergente.id = "eliminar-alumno-menu"

    function renderizarLista() {
        const nombres = nombresDeAlumnos()
        if (nombres.length == 0) {
            ventanaEmergente.innerHTML = `
                <div class="mensaje">
                    No hay alumnos registrados aún
                </div>
                <button class="boton-salir" id="boton-salir">Cerrar</button>
            `
        }else {
            ventanaEmergente.innerHTML = `
                <div class="alumnos-eliminar-contenedor">
                    ${nombres.map((datos, i) => `
                    <div class="alumno-item" data-index="${i}">${datos}
                        <button class="boton-eliminar" id="boton-eliminar">Eliminar</button>
                    </div>`).join("")}
                </div>
                <button class="boton-salir" id="boton-salir">Cerrar</button>
            `
        }
        
        const botonesEliminar = ventanaEmergente.querySelectorAll(".boton-eliminar")
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", () => {
                const i = boton.closest(".alumno-item").dataset.index
                listaAlumnos.splice(i, 1)
                localStorage.setItem('lista_alumnos', JSON.stringify(listaAlumnos))
                renderizarCards(listaAlumnos, "No hay registrados aún.", alumno => `Curso: ${alumno.curso}`)
                renderizarLista()
                swal.fire({
                    title: `<div class="alert-titulo">Alumno eliminado</div>`,
                    icon: "warning",
                    iconColor: "#cb1818",
                    color: "#000",
                    background: "#1B246B",
                    timer: "2000",
                    timerProgressBar: "true",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                })
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
    const menuAbierto = document.getElementById("filtro-desplegable")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }

    const menuFiltro = document.createElement("ul")
    menuFiltro.className = "desplegable"
    menuFiltro.id = "filtro-desplegable"
    menuFiltro.innerHTML = `
        <li id="cursos-opcion"><button class="opcion" id="abrir-cursos">Por Curso</button><div id="cursos-contenedor"></div></li>
        <li><button class="opcion" id="promedio-aprobado">Aprobados por promedio</button></li>
        <li><button class="opcion" id="promedio-desaprobado">Desaprobados por promedio</button></li>
        <li><button class="opcion" id="borrar-filtros">Borrar filtros</button></li>
    `
    
    const contenedorMenu = document.getElementById("filtro-contenedor")
    contenedorMenu.append(menuFiltro)

    document.getElementById("filtro-desplegable").addEventListener("click", (e) => {
        const id = e.target.id

        switch (id) {
            case "abrir-cursos":
                menuCursos()
                break
            case "promedio-aprobado":
                filtrarListaPromedio(prom => prom >= 7)
                swal.fire({
                    title: `<div class="alert-titulo">Filtro aplicado</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
                break
            case "promedio-desaprobado":
                filtrarListaPromedio(prom => prom <= 6)
                swal.fire({
                    title: `<div class="alert-titulo">Filtro aplicado</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
                break
            case "borrar-filtros":
                renderizarCards(listaAlumnos, "No hay alumnos registrados aún.", alumno => `Curso: ${alumno.curso}`)
                const menuCursosAbierto = document.getElementById("cursos-contenedor")
                menuCursosAbierto.innerHTML = ""
                swal.fire({
                    title: `<div class="alert-titulo">Filtros eliminados</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
                break
        }
    })
}

const botonFiltroMenu = document.getElementById("filtro-abrir-desplegable")
botonFiltroMenu.addEventListener("click", () => abrirMenuFiltro())

const cursos = [
    { id: "primero", curso: "1°" },
    { id: "segundo", curso: "2°" },
    { id: "tercero", curso: "3°" },
    { id: "cuarto", curso: "4°" },
    { id: "quinto", curso: "5°" },
    { id: "sexto", curso: "6°" }
]

function menuCursos() {
    const contenedor = document.getElementById("cursos-contenedor")

    if (contenedor.innerHTML !== "") {
        contenedor.innerHTML = ""
        return
    }

    cursos.forEach(({ id, curso }) => {
        const bloque = document.createElement("div")
        bloque.className = "bloque-curso"
        bloque.id = `bloque-${id}`

        const btn = document.createElement("button")
        btn.className = "opcion"
        btn.id = id
        btn.textContent = curso

        btn.addEventListener("click", () => {
            menuCursosYProm(id, curso)
            })

        bloque.append(btn)
        contenedor.append(bloque)
    })
}

function menuCursosYProm(id, curso) {
    const contenedor = document.getElementById(`bloque-${id}`)

    const menuAbierto = contenedor.querySelector(".curso-y-prom-desplegable")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }
    document.querySelectorAll(".curso-y-prom-desplegable").forEach(menu => {
        menu.remove()
        })
    filtrarPorCurso(curso)
    swal.fire({
        title: `<div class="alert-titulo">Filtro aplicado</div>`,
        icon: "success",
        color: "#000",
        background: "#1B246B",
        timer: "1500",
        timerProgressBar: "true",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
    })

    const submenu = document.createElement("ul")
    submenu.className = "curso-y-prom-desplegable"
    submenu.id = "cursos-y-prom"
    submenu.innerHTML = `
        <li><button class="opcion" id="curso-aprobados">Aprobado</button></li>
        <li><button class="opcion" id="curso-desaprobados">Desaprobado</button></li>
        <li><button class="opcion" id="curso-todos">Todos</button></li>
    `
    contenedor.appendChild(submenu)

    document.getElementById("cursos-y-prom").addEventListener("click", (e) => {
        const id = e.target.id

        switch (id) {
            case "curso-aprobados":
                filtrarPorCursoYProm(curso, "aprobado")
                swal.fire({
                    title: `<div class="alert-titulo">Filtros aplicados</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
                break
            case "curso-desaprobados":
                filtrarPorCursoYProm(curso, "desaprobado")
                swal.fire({
                    title: `<div class="alert-titulo">Filtros aplicados</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
                break
            case "curso-todos":
                filtrarPorCursoYProm(curso, "todos")
                swal.fire({
                    title: `<div class="alert-titulo">Filtros aplicados</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
                break
        }
    })
}

function filtrarPorCurso(curso) {
    const listaFiltrada =  listaAlumnos.filter(alumno => alumno.curso === curso)

    renderizarCards(listaFiltrada, "No hay alumnos registrados de este curso aún." , alumno => `Curso: ${alumno.curso}`)
}

function filtrarPorCursoYProm(curso, criterio) {
    let listaFiltrada = listaAlumnos.filter(a => a.curso === curso)

    if (criterio === "aprobado") listaFiltrada = listaFiltrada.filter(a => a.promedio >= 7)
    if (criterio === "desaprobado") listaFiltrada = listaFiltrada.filter(a => a.promedio < 7)

    renderizarCards(listaFiltrada, "No hay alumnos registrados de este curso que cumplan esta condición aún.", alumno => `Promedio: ${alumno.promedio}<br>Curso: ${alumno.curso}`)
}

function filtrarListaPromedio(criterio) {
    const listaFiltrada = listaAlumnos.filter(alumno => criterio(alumno.promedio))

    renderizarCards(listaFiltrada, "No hay alumnos registrados que cumplan esta condición aún.", alumno => `Promedio: ${alumno.promedio}`)
}

document.getElementById("ordenar-contenedor").addEventListener("click", (e) => {
    const boton = e.target

    switch (boton.id) {
        case "por-curso":
            menuOrdenarAlumnos("ordenar-curso-contenedor", (a, b) => parseInt(b.curso) - parseInt(a.curso),(a, b) => parseInt(a.curso) - parseInt(b.curso))
            break
        case "por-promedio":
            menuOrdenarAlumnos("ordenar-prom-contenedor", (a, b) => b.promedio - a.promedio,(a, b) => a.promedio - b.promedio)
            break
        case "sin-orden":
            renderizarCards(listaAlumnos, "No hay alumnos registrados aún.", alumno => `Curso: ${alumno.curso}`)
            swal.fire({
                    title: `<div class="alert-titulo">Orden eliminado</div>`,
                    icon: "success",
                    color: "#000",
                    background: "#1B246B",
                    timer: "1500",
                    timerProgressBar: "true",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                })
            const submenuAbierto = document.getElementById("orden-opciones-desplegable");
            if (submenuAbierto) submenuAbierto.remove()
            break
    }
})

function abrirOrdenarAlumnosMenu() {
    const menuAbierto = document.getElementById("ordenar-desplegable")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }
    
    const contenedor = document.getElementById("ordenar-contenedor")
    const ordenarMenu = document.createElement("ul")
    ordenarMenu.className = "desplegable"
    ordenarMenu.id = "ordenar-desplegable"
    ordenarMenu.innerHTML = `
        <li id="ordenar-curso-contenedor" class="opciones-orden"><button class="opcion" id="por-curso">Por curso</button></li>
        <li id="ordenar-prom-contenedor" class="opciones-orden"><button class="opcion" id="por-promedio">Por Promedio</button></li>
        <li class="opciones-orden"><button class="opcion" id="sin-orden">Borrar orden</button></li>
    `
    contenedor.append(ordenarMenu)
}

const botonOrdenarMenu = document.getElementById("ordenar-abrir-desplegable")
botonOrdenarMenu.addEventListener("click", () => abrirOrdenarAlumnosMenu())

function menuOrdenarAlumnos(contenedor, criterio1, criterio2) {
    const contenedorMenu = document.getElementById(contenedor)

    const menuAbierto = contenedorMenu.querySelector("#orden-opciones-desplegable")
    if (menuAbierto) {
        menuAbierto.remove()
        return
    }
    document.querySelectorAll("#orden-opciones-desplegable").forEach(menu => {
        menu.remove()
    })

    const ordenarMenu = document.createElement("ul")
    ordenarMenu.id = "orden-opciones-desplegable"
    ordenarMenu.innerHTML = `
        <li><button class="opcion" id="mayor-menor">Mayor a menor</button></li>
        <li><button class="opcion" id="menor-mayor">Menor a mayor</button></li>
    `

    contenedorMenu.append(ordenarMenu)

    document.getElementById("mayor-menor").addEventListener("click", () => {
        ordenarAlumnos(criterio1, alumno => `Promedio: ${alumno.promedio}<br>Curso: ${alumno.curso}`)
    })
    document.getElementById("menor-mayor").addEventListener("click", () => {
        ordenarAlumnos(criterio2, alumno => `Promedio: ${alumno.promedio}<br>Curso: ${alumno.curso}`)
    })
}

function ordenarAlumnos(criterio, dato) {
    const listaOrdenada = listaRenderizada.sort(criterio)
    renderizarCards(listaOrdenada, "No hay alumnos registrados aún.", dato)
    swal.fire({
        title: `<div class="alert-titulo">Orden aplicado</div>`,
        icon: "success",
        color: "#000",
        background: "#1B246B",
        timer: "1500",
        timerProgressBar: "true",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
    })
}