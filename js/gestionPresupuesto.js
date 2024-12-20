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
        alert("El presupuesto es negativo");
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
    this.etiquetas = Array.isArray(etiquetas) && etiquetas.length > 0 ? etiquetas : [];  // Asegurarse de que 'etiquetas' sea un arreglo
}

// Métodos del objeto Gasto en el prototype
CrearGasto.prototype.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
}

CrearGasto.prototype.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
}

CrearGasto.prototype.actualizarValor = function (nuevoValor) {
    if (nuevoValor >= 0)
        this.valor = nuevoValor;
    else
        this.valor = this.valor; // No cambia si el nuevo valor es negativo
}

CrearGasto.prototype.mostrarGastoCompleto = function () {
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

CrearGasto.prototype.actualizarFecha = function (nuevaFechaString) {
    let nuevaFecha = Date.parse(nuevaFechaString);
    if (!isNaN(nuevaFecha)) {
        this.fecha = nuevaFecha;
    }
};

CrearGasto.prototype.anyadirEtiquetas = function (...nuevasEtiquetas) {
    if (!Array.isArray(this.etiquetas)) {
        this.etiquetas = [];  // Inicializar como arreglo vacío si no lo es
    }
    for (let i = 0; i < nuevasEtiquetas.length; i++) {
        if (!this.etiquetas.includes(nuevasEtiquetas[i])) {
            this.etiquetas.push(nuevasEtiquetas[i]);
        }
    }
};

CrearGasto.prototype.borrarEtiquetas = function (...etiquetasAEliminar) {
    if (Array.isArray(this.etiquetas)) {
        for (let i = 0; i < etiquetasAEliminar.length; i++) {
            let index = this.etiquetas.indexOf(etiquetasAEliminar[i]);
            if (index !== -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    }
};

CrearGasto.prototype.obtenerPeriodoAgrupacion = function (periodo) {
    let fechaObjeto = new Date(this.fecha).toISOString();

    if (periodo === 'dia') {
        return fechaObjeto.substring(0, 10);  // "YYYY-MM-DD"
    }
    if (periodo === 'mes') {
        return fechaObjeto.substring(0, 7);  // "YYYY-MM"
    }
    if (periodo === 'año') {
        return fechaObjeto.substring(0, 4);  // "YYYY"
    }

    return ''; // Si el periodo no es válido, retornamos una cadena vacía
};

function listarGastos() {
    return gastos;
}

function filtrarGastos(parametro) {
    return gastos.filter(function (gasto) {
        let resultado = true;

        if (parametro.fechaDesde && new Date(gasto.fecha) < new Date(parametro.fechaDesde)) {
            resultado = false;
        }

        if (parametro.fechaHasta && new Date(gasto.fecha) > new Date(parametro.fechaHasta)) {
            resultado = false;
        }

        if (parametro.valorMinimo && gasto.valor < parametro.valorMinimo) {
            resultado = false;
        }

        if (parametro.valorMaximo && gasto.valor > parametro.valorMaximo) {
            resultado = false;
        }

        if (parametro.descripcionContiene && gasto.descripcion.toLowerCase().indexOf(parametro.descripcionContiene.toLowerCase()) === -1) {
            resultado = false;
        }

        if (parametro.etiquetasTiene && parametro.etiquetasTiene.length > 0) {
            let tieneEtiqueta = parametro.etiquetasTiene.some(etiqueta =>
                gasto.etiquetas.some(gastoEtiqueta => gastoEtiqueta.toLowerCase() === etiqueta.toLowerCase())
            );
            if (!tieneEtiqueta) {
                resultado = false;
            }
        }

        return resultado;
    });
}


function agruparGastos(periodo = 'mes', etiquetas = [], fechaDesde, fechaHasta) {
    let gastosFiltrados = filtrarGastos({
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas.length > 0 ? etiquetas : []
    });

    return gastosFiltrados.reduce(function (acc, gasto) {
        let periodoAgrup = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[periodoAgrup] = acc[periodoAgrup] || 0;
        acc[periodoAgrup] += gasto.valor;
        return acc;
    }, {});
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let indice = gastos.findIndex(function (gasto) {
        return gasto.id === id;
    });

    if (indice >= 0) {
        gastos.splice(indice, 1);  // Eliminamos el gasto con el id proporcionado
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

function transformarListadoEtiquetas(listado)
{
   // Reemplazar los separadores comunes (.,:; espacio) por comas
   const textoNormalizado = listado.replace(/[.,:;\s]+/g, ",");

   // Dividir el texto por comas y eliminar elementos vacíos
   const etiquetas = textoNormalizado.split(",").filter(etiqueta => etiqueta.trim() !== "");

   return etiquetas;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento al gasto rehidratado
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    cargarGastos,
    transformarListadoEtiquetas,
    listarGastos,
    agruparGastos,
    filtrarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
