
const notas = []
const notasAprobadas = []
const notasSobresalientes = []
const notasDesaprobadas = []

function comprobarNum(prompted, num1, num2, mensaje) {
    while (isNaN(prompted) || prompted < num1 || prompted > num2) {
        alert("No es un número válido")
        prompted = Number(prompt(mensaje))
    }
    return prompted
}

function agregarNotas() {
    let cantidad = Number(prompt("Cuántas notas deseás ingresar?"))
    cantidad = comprobarNum(cantidad, 0, Infinity, "Cuántas notas deseás ingresar?")
    for (let i = 0; i < cantidad; i++) {
        let notasPrompt = Number(prompt(`Introduzca la nota n° ${i + 1}`))
        notasPrompt = comprobarNum(notasPrompt, 1, 10, `Introduzca la nota n° ${i + 1}`)
        notas.push(notasPrompt)
    }
}

function clasificarNota(lista, limiteInf, limiteSup) { 
    lista.splice(0, lista.length)
    for (let i = 0; i < notas.length; i++) {
        if (notas[i] < limiteInf || notas[i] > limiteSup) {
            continue
        }else {
            lista.push(notas[i])
        }
    }
}

function actualizarListas() {
    clasificarNota(notasAprobadas, 7, 10)
    clasificarNota(notasSobresalientes, 9, 10)
    clasificarNota(notasDesaprobadas, 1, 6)
}

agregarNotas()
let notasIngresadas = true
actualizarListas()

function calcularPromedio(lista) {
    let suma = 0;
    for (let i = 0; i < lista.length; i++) {
        suma += lista[i];
    }
    return (suma / lista.length).toFixed(2);
}

function mostrarLista(nombre, lista) {
    if (lista.length === 0) {
        alert(`No hay notas ${nombre} todavía.`)
    } else {
        alert(`Las notas ${nombre} son:\n  -  ${lista.join("\n  -  ")}`)
    }
}

const menuText = "Qué querés ver?\n 1- Ver todas las Notas\n 2- Agregar notas\n 3- Aprobadas\n 4- Sobresalientes\n 5- Desaprobadas\n 6- Ver promedio\n 7- Salir"

while (notasIngresadas) {
    menu = Number(prompt(menuText))
    menu = comprobarNum(menu, 1, 7, menuText)
    switch (menu) {
        case 1:
            if (notas == 0) {
                alert("Aún no hay notas ingresadas")
            }else {
                alert(`Las notas son:\n  -  ${notas.join("\n  -  ")}`)
            }
            break
        case 2:
            agregarNotas()
            actualizarListas()
            break
        case 3:
            console.log(`Notas aprobadas ${notasAprobadas}`)
            mostrarLista("aprobadas", notasAprobadas)
            break
        case 4:
            console.log(`Notas sobresalientes ${notasSobresalientes}`)
            mostrarLista("sobresalientes", notasSobresalientes)
            break
        case 5:
            console.log(`Notas desaprobadas ${notasDesaprobadas}`)
            mostrarLista("desaprobadas", notasDesaprobadas)
            break
        case 6:
            console.log(`Promedio ${calcularPromedio(notas)}`)
            if (notas == 0) {
                alert("No hay notas para promediar")
            }else {
                alert(`El promedio de notas es de ${calcularPromedio(notas)}`)
            }
            break
        case 7:
            alert("Chau")
            notasIngresadas=false
    }
}