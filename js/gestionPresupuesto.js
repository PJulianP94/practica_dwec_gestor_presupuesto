// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// Funciones
function actualizarPresupuesto(nuevopresupuesto) {
    if (nuevopresupuesto >= 0) {
        presupuesto = nuevopresupuesto;
        return presupuesto;
    } else {
        console.log("El presupuesto es negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de: " + presupuesto + " €");
}

// Función constructora para crear un objeto Gasto
function CrearGasto(descripcion = "", valor = 0, fecha = Date.now(), ...etiquetas) {
    this.id = idGasto++;
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? Number(valor) : 0;
    this.fecha = Date.parse(fecha) || Date.now();
    this.etiquetas = etiquetas.length > 0 ? etiquetas : [];
}

// Métodos del objeto Gasto en el prototype
CrearGasto.prototype.mostrarGastoCompleto = function() {
    let etiquetasTexto = "No hay etiquetas.";
    if (this.etiquetas.length > 0) {
        etiquetasTexto = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            etiquetasTexto += ` - ${this.etiquetas[i]}\n`;
        }
    }
    return `Gasto correspondiente a "${this.descripcion}" con valor ${this.valor} €.\n` +
           `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
           `Etiquetas:\n${etiquetasTexto}`;
};

CrearGasto.prototype.actualizarFecha = function(nuevaFechaString) {
    let nuevaFecha = Date.parse(nuevaFechaString);
    if (!isNaN(nuevaFecha)) {
        this.fecha = nuevaFecha;
    }
};

CrearGasto.prototype.anyadirEtiquetas = function(...nuevasEtiquetas) {
    for (let i = 0; i < nuevasEtiquetas.length; i++) {
        if (!this.etiquetas.includes(nuevasEtiquetas[i])) {
            this.etiquetas.push(nuevasEtiquetas[i]);
        }
    }
};

CrearGasto.prototype.borrarEtiquetas = function(...etiquetasAEliminar) {
    for (let i = 0; i < this.etiquetas.length; i++) {
        if (etiquetasAEliminar.includes(this.etiquetas[i])) {
            this.etiquetas.splice(i, 1);
            i--; 
        }
    }
};

// Funciones para gestionar gastos
function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    // 1. Añadir la propiedad id al gasto
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice >= 0) {
        gastos.splice(indice, 1);
    } else {
        console.log("No existe el gasto con el id introducido.");
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

// Ejemplo de uso
let gasto1 = new CrearGasto("Alquiler", 500);
let gasto2 = new CrearGasto("Comida", 100, "2021-10-06T13:10", "supermercado");
anyadirGasto(gasto1);


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    filtrarGastos,
    agruparGastos,
    listarGastos,
    anyadirGasto,
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
