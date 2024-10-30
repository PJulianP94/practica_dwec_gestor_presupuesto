// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
// Funciones
function actualizarPresupuesto(valorNuevopresupuesto) {
    if (valorNuevopresupuesto >= 0) {
        presupuesto = valorNuevopresupuesto;
        return presupuesto;
    } else {
        console.log("El presupuesto es negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

// Función constructora para crear un objeto Gasto
function CrearGasto(descripcion = "", valor = 0, fecha = Date.now(), ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? Number(valor) : 0;
    this.fecha = Date.parse(fecha) || Date.now();
    this.etiquetas = etiquetas.length > 0 ? etiquetas : [];
}

// Métodos del objeto Gasto en el prototype
CrearGasto.prototype.mostrarGasto = function ()
{
return `Gasto correspondiente a ${this.descripcion} con valor: ${this.valor} €`;
}
CrearGasto.prototype.actualizarDescripcion = function (nuevaDescripcion) 
{
    this.descripcion = nuevaDescripcion;
}
CrearGasto.prototype.actualizarValor = function (nuevoValor) 
{
    if(nuevoValor >= 0)
        this.valor = nuevoValor;
    else
    this.valor = this.valor;
}
CrearGasto.prototype.mostrarGastoCompleto = function() {
    let etiquetasTexto = "No hay etiquetas.";
    if (this.etiquetas.length > 0) {
        etiquetasTexto = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            etiquetasTexto += `- ${this.etiquetas[i]}\n`;
        }
    }
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
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

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
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


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {

    listarGastos,
    anyadirGasto,
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
