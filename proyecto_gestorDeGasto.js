const prompt = require("prompt-sync")();
const listacategoriaDefinidas = ["Alimento", "Salud", "Gastos Fijos", "Ocio", "Ropa", "Emergencia", "Otros"]; // Es una lista predefinida de las categorias de gastos
const listaDeGasto = [];

let presupuesto = 0; //Ingreso del dinero
let presupuestoInicial = 0; // variable que no cambia
let porcentajeDeAviso = 30; //porcentaje de aviso


//Clase del tipo gasto
class Gasto {
    constructor(nombre, monto, categoria) {
        this.nombre = nombre;
        this.monto = monto;
        this.categoria = categoria;
    }
}

// recibe los datos y los lleva a la lista de gastos
function agregarGasto(nombre, monto, categoria) {
    listaDeGasto.push(new Gasto(nombre, monto, categoria));
    presupuesto -= monto;
}

//se le entrega una lista y las muestra
function mostrarGastos(listaDeGastosMostrar) {
    if (!listaDeGastosMostrar.length) { // VALIDACION: si no hay nada en la lista
        console.log("NO EXISTEN GASTOS");
        return;
    }
    listaDeGastosMostrar.forEach(gastoListado => console.log(
        `Nombre: ${gastoListado.nombre}|Gasto: ${gastoListado.monto}|Categoria: ${gastoListado.categoria}`)
    );
}

// suma el gasto de la lista
function sumaDeGastos(listaDeGasto) {
    return listaDeGasto.reduce((acumulador, gasto) => {
        return acumulador + gasto.monto;
    }, 0);
}

// esta funcion se encarga de avisar cuanto presupuesto queda 
function verificacionDePresupuesto(presupuestoVerif, presupuestoInicialVerif, porcentajeDeAvisoVerif) {
    const limitedDeAviso = presupuestoInicialVerif * (porcentajeDeAvisoVerif / 100);

    if (presupuestoVerif < limitedDeAviso) {
        console.log("fuera del porcentaje");
    } else {
        console.log("dentro del porcentaje")
    }
}

// muestra la lista de las categorias de gasto
function mostraCategorias(categoriaDefinidas) {
    categoriaDefinidas.forEach((categoria, id) => console.log(`${id + 1}.- ${categoria}`));
}


//con la id de la lista busca el nombre retornandolo
function obtenerCategoria(categoriaDefinidas, numeroDeLaCategoria) {
    const categoriaBuscada = categoriaDefinidas[numeroDeLaCategoria - 1];
    if (categoriaBuscada === undefined) {
        console.log("NO EXISTEN EN LA CATEGORIA");
        return false;
    }
    return categoriaBuscada;
}
//validacion de campo vacio
function validarTexto(valor) {
    const cadena = String(valor).trim();

    return cadena !== "";
}

//valida que sea un numero
function validarNumero(valor) {
    const cadena = String(valor).trim(); //Convierte el valor a cadena, trim elimina los espacios iniciales y finales de la cadena

    return cadena !== "" && !isNaN(Number(cadena)); //si el valor no esta vacio y es numero TRUE
}

//funcion del menu principal
function menuPrincipal() {
    let opcion;

    let nombreGasto;
    let montoGasto;
    let categoriaGasto;
    let categoriaGastoPrompt;

    while (opcion !== "0") {
        console.log(`
            ---MONTO ACTUAL PARA USAR $ ${presupuesto}---
            1.- Agregar gasto
            2.- Mostrar gasto
            3.- Ver Total gastado
            4.- Verificar Presupuesto
            0.- Salir
            `);
        opcion = prompt(`Elija opcion: `);

        switch (opcion) {
            case "1":
                mostraCategorias(listacategoriaDefinidas);

                categoriaGastoPrompt = prompt(`Seleccione Categoria: `);
                if (!validarNumero(categoriaGastoPrompt)) { //se usa la validacion anterior de numeros
                    console.log("Error el dato debe ser un numero")
                    break;
                }

                categoriaGasto = obtenerCategoria(listacategoriaDefinidas, Number(categoriaGastoPrompt))
                if (!categoriaGasto) { //valida simplemente que el numero este en el rango 
                    console.log("Error: categoría no existe");
                    break;
                }

                nombreGasto = prompt("Nombre del Gasto: ");
                if (!validarTexto(nombreGasto)) {
                    console.log("Error el texto no puede estar vacio")
                    break;
                }

                montoGasto = Number(prompt("Monto Gasto: "));
                if (!validarNumero(montoGasto)) {//se usa la validacion anterior de numeros
                    console.log("Error el monto debe ser numerico")
                    break;
                }

                agregarGasto(nombreGasto, montoGasto, categoriaGasto);
                break;
            case "2":
                mostrarGastos(listaDeGasto);
                break;
            case "3":
                console.log(sumaDeGastos(listaDeGasto));
                break;
            case "4":
                verificacionDePresupuesto(presupuesto, presupuestoInicial, porcentajeDeAviso);
                break;
            case "0":
                console.log("Gracias por utilizar")
                break;
        }

    }

}

console.log("Gestor de Gastos");
presupuesto = Number(prompt("Ingrese Presupuesto Inicial: "));
presupuestoInicial = presupuesto;

menuPrincipal();
