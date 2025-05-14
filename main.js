const usuario = "tuti"
const contrasena = "tierno"

let usuarioIngresado = prompt("Ingrese su nombre de usuario")
let contrasenaIngresada = prompt("Ingrese su contraseña")
let seLogueo = false
let bandera = true

while (bandera){
    if (usuarioIngresado === usuario && contrasenaIngresada === contrasena){
        alert("Muy bien hermano, lo lograste")
        seLogueo = true
        bandera = false
    }else {
        alert("no pelotudo, ya te dije cual es el usuario y la contraseña")
        let quiereSeguir = confirm("¿Quiere seguir intentando?")
        if(!quiereSeguir){
            bandera = false
        }else {
        usuarioIngresado = prompt("Ingrese su nombre de usuario")
        contrasenaIngresada = prompt("Ingrese su contraseña")
        }
    }
}

if (seLogueo){
    let saldoInicial = Number(prompt("Con cuanta guita queres empezar?"))

    if (isNaN(saldoInicial)){
        saldoInicial = null
    }

    bandera = true

    let saldo = saldoInicial ?? 0
    let numPrompt = 0
    let deuda = 0
    const menuText = "Que queres hacer bro?\n 1- Ver saldo\n 2- Ingresar tutidolares\n 3- Retirar tutidolares\n 4- Pedir prestamo\n 5- Ver deuda\n 6- Pagar deuda\n 0- Salir"

    while (bandera){
        let menu = Number(prompt(menuText))

        while (isNaN(menu)){
            alert("Lo manejas con los numeros boludazo")
            menu = Number(prompt(menuText))
        }

        switch (menu) {
            case 1:
                alert(`Tu saldo es de $${saldo.toFixed(2)} tutidolares`)
                break;
            case 2: 
                numPrompt = Number(prompt("Cuanta guita queres meter?"))
                while (isNaN(numPrompt) || numPrompt < 0){
                    alert("Valor invalido")
                    numPrompt = Number(prompt("Cuanta guita queres meter?"))
                }
                saldo += numPrompt
                break;
            case 3:
                numPrompt = Number(prompt("Cuanta guita queres sacar?"))
                while (isNaN(numPrompt) || numPrompt < 0 || numPrompt > saldo){
                    alert("Valor invalido")
                    numPrompt = Number(prompt("Cuanta guita queres sacar?"))
                }
                saldo -= numPrompt
                break;
            case 4:
                numPrompt = Number(prompt("Cuanta guita queres pedir?"))
                while (isNaN(numPrompt) || numPrompt < 0){
                    alert("Valor invalido")
                    numPrompt = Number(prompt("Cuanta guita queres pedir?"))
                }
                saldo += numPrompt
                deuda += numPrompt * 1.4
                break;
            case 5:
                alert(`Tu deuda es de $${deuda.toFixed(2)} tutidolares`)
                break;
            case 6:
                alert(`Tu deuda es de $${deuda.toFixed(2)} tutidolares`)
                numPrompt = Number(prompt("Cuanto queres pagar de la deuda?"))
                while (isNaN(numPrompt) || numPrompt < 0 || numPrompt > saldo || numPrompt > deuda){
                    alert("Valor invalido")
                    numPrompt = Number(prompt("Cuanto queres pagar de la deuda?"))
                }
                saldo -= numPrompt
                deuda -= numPrompt
                break;
            case 0:
                alert(`Adios hermac`)
                bandera = false;
        }
    }
}