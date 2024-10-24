// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idgastos = 0;

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

function CrearGasto() {
    let Gasto = {
        descripcion: "",
        valor: Number(valor),
        fecha: Date.parse(datestring) || Date.now(),
        etiquetas:  [],
        mostrarGasto: function () {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion: function (nuevadescripcion) {
            this.descripcion = nuevadescripcion;
        },
        actualizarValor: function (nuevovalor) {
            if (nuevovalor >= 0) {
                this.valor = nuevovalor;
            } else {
                console.log("El valor no puede ser negativo");
            }
        },
        actualizarFecha: function (nuevaFechaString) {
            let nuevafecha =  Date.parse(nuevaFechaString);
            this.fecha = !isNaN(nuevafecha) ? nuevafecha : Date.now();
        },
        anyadirEtiquetas: function(...nuevasEtiquetas) {
            this.etiquetas.push(...nuevasEtiquetas); // Añade nuevas etiquetas al array existente
    },
    mostrarGastoCompleto: function () 
    {
        let etiquetasTexto = "No hay etiquetas.";
        if (this.etiquetas.length > 0) {
            etiquetasTexto = "";
            for (let i = 0; i < this.etiquetas.length; i++) {
                etiquetasTexto += `${this.etiquetas[i]}\n`;
            }
        }
        return `Gasto correspondiente a "${this.descripcion}" con valor ${this.valor} €.\n` +
               `Fecha: ${new Date(this.fecha).toLocaleDateString()}\n` +
               `Etiquetas:\n${etiquetasTexto}`;
    }
}
    return Gasto;
}
function listarGastos () 
{
    return gastos;
}

function anyadirGasto (gasto)
{
gasto.id = idgastos;
idgastos++;
gastos.push(gasto)
}

function borrarGasto(id)
 {
    let indice = gastos.findIndex(gasto => gasto.id === id);

    if (indice >= 0) {
        gastos.splice(indice, 1);
    } else {
        console.log("No existe el gasto con el id introducidio.");
    }
}
function calcularTotalGastos()
{
    let total = 0;
    for (let i of gastos)
        {
            total += i.valor;
        }
    return total
}
function calcularBalance()
{
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
