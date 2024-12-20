import * as PresupuestoWeb from "./gestionPresupuesto.js"

// Función para mostrar un dato en un elemento con el id proporcionado
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

// Función para mostrar un gasto en la web
function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);
    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    // Mostrar descripción
    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = gasto.descripcion;

    // Mostrar fecha
    let divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    // Mostrar valor
    let divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = `${gasto.valor}`;

    // Mostrar etiquetas
    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
        spanEtiqueta.textContent = etiqueta;

        // Manejador de evento para borrar la etiqueta
        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener('click', manejadorBorrarEtiqueta);

        divEtiquetas.appendChild(spanEtiqueta);
    }

    // Crear el botón de Editar
    let botonEditar = document.createElement('button');
    botonEditar.setAttribute("type", "button");
    botonEditar.className = 'gasto-editar-formulario';
    botonEditar.textContent = 'Editar';

    // Manejador de evento para editar el gasto
    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    botonEditar.addEventListener('click', manejadorEditar);

    // Crear el botón de Borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.setAttribute("type", "button");
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrar';

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botonBorrar.addEventListener('click', manejadorBorrar);

    // Añadimos todos los elementos al divGasto
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);
    divGasto.appendChild(botonEditar);
    divGasto.appendChild(botonBorrar);

    // Añadimos el divGasto al contenedor
    contenedor.appendChild(divGasto);
}

// Función para mostrar los gastos agrupados en la web
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';

    let header = document.createElement('h1');
    header.textContent = 'Gastos agrupados por ' + periodo;
    divAgrupacion.appendChild(header);

    // Bucle para recorrer cada elemento de la agrupación
    for (let i in agrup) {
        let value = agrup[i];

        let div = document.createElement('div');
        div.className = "agrupacion-dato";

        let claveSpan = document.createElement('span');
        claveSpan.className = 'agrupacion-dato-clave';
        claveSpan.textContent = i;

        let valorSpan = document.createElement('span');
        valorSpan.classList.add('agrupacion-dato-valor');
        valorSpan.textContent = `${value} €`;

        div.appendChild(claveSpan);
        div.appendChild(valorSpan);

        divAgrupacion.appendChild(div);
    }

    contenedor.appendChild(divAgrupacion);
}

// Función para repintar los datos de la página
function repintar() {
    mostrarDatoEnId("presupuesto", PresupuestoWeb.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", PresupuestoWeb.calcularTotalGastos());
    mostrarDatoEnId("balance-total", PresupuestoWeb.calcularBalance());

    let gastoscompletos = document.getElementById("listado-gastos-completo");
    gastoscompletos.innerHTML = ""; // Limpiamos el contenedor antes de agregar los elementos

    const gastos = PresupuestoWeb.listarGastos();
    
    if (gastos.length === 0) {
        console.warn("No hay gastos para mostrar");
    }

    // Agregar los gastos al DOM
    gastos.forEach(gasto => mostrarGastoWeb("listado-gastos-completo", gasto));
}


// Función para actualizar el presupuesto
function actualizarPrespuestoWeb() {
    let respuesta = prompt("Introduce el presupuesto");
    let nuevopresupuesto = parseInt(respuesta);
    PresupuestoWeb.actualizarPresupuesto(nuevopresupuesto);
    repintar(); // repintar para actualizar los datos
}

// Botón de actualización del presupuesto
let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener("click", actualizarPrespuestoWeb); // Se pasa la función sin paréntesis

// Función para añadir un nuevo gasto
function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto");
    let valor = parseFloat(prompt("Introduce el valor del gasto"));
    let fecha = prompt("Introduce la fecha del gasto (formato: yyyy-mm-dd)");
    let etiquetasString = prompt("Introduce las etiquetas (separadas por comas)");

    // Asegurarnos de que etiquetasString no sea null
    if (etiquetasString === null) {
        etiquetasString = '';  // Asignamos una cadena vacía si el valor es null
    }

    // Convertir las etiquetas en un array
    let etiquetas = etiquetasString.split(',').map(etiqueta => etiqueta.trim());  // Trim para quitar espacios extras

    let gasto = new PresupuestoWeb.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    PresupuestoWeb.anyadirGasto(gasto);

    repintar();
}



// Botón para añadir un nuevo gasto
let boton2 = document.getElementById("anyadirgasto");
boton2.addEventListener("click", nuevoGastoWeb);

// Manejador de evento para editar un gasto
function EditarHandle() {
    this.handleEvent = function () {
        let nuevaDescripcion = prompt("Introduce la nueva descripción del gasto");
        let nuevoValor = parseFloat(prompt("Introduce el nuevo valor del gasto"));
        let nuevaFecha = prompt("Introduce la nueva fecha del gasto (formato: yyyy-mm-dd):");
        let nuevasEtiquetas = prompt("Introduce las nuevas etiquetas (separadas por comas):");
        nuevasEtiquetas = nuevasEtiquetas.split(",");

        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    }
}

// Manejador de evento para borrar un gasto
function BorrarHandle() {
    this.handleEvent = function () {
        PresupuestoWeb.borrarGasto(this.gasto.id);
        repintar();
    }
}

// Manejador de evento para borrar una etiqueta
function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario() {
    // Clonar el template del formulario
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    
    // Obtener el formulario
    var formulario = plantillaFormulario.querySelector("form");
    
    // Desactivar el botón para añadir un gasto mediante formulario
    let botonFormulario = document.getElementById("anyadirgasto-formulario");
    botonFormulario.disabled = true;

    // Manejador para el evento submit
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Recoger los datos del formulario
        let descripcion = formulario.querySelector("#descripcion").value;
        let valor = parseFloat(formulario.querySelector("#valor").value);
        let fecha = formulario.querySelector("#fecha").value;
        let etiquetasString = formulario.querySelector("#etiquetas").value;
        let etiquetas = etiquetasString.split(',');

        if (!descripcion || !valor || !fecha) {
            console.error("Faltan datos en el formulario");
            return;
        }

        // Crear un nuevo gasto
        let gasto = new PresupuestoWeb.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        PresupuestoWeb.anyadirGasto(gasto);

        // Repintar la interfaz
        repintar();

        // Volver a habilitar el botón de añadir gasto
        botonFormulario.disabled = false;

        // Eliminar el formulario
        formulario.remove();
    });

    // Añadir un botón de cancelar para eliminar el formulario
    let botonCancelar = formulario.querySelector(".cancelar");
    botonCancelar.addEventListener("click", function () {
        formulario.remove();
        botonFormulario.disabled = false;
    });

    // Añadir el formulario a la página
    document.getElementById("controlesprincipales").appendChild(formulario);
}

// Asociar el botón "Añadir Gasto" al formulario
let botonFormulario = document.getElementById("anyadirgasto-formulario");
botonFormulario.addEventListener("click", nuevoGastoWebFormulario);

function EditarHandleFormulario() {
    this.handleEvent = function () {
        // Clonar el template del formulario
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        // Rellenar los campos del formulario con los datos actuales del gasto
        formulario.querySelector("#descripcion").value = this.gasto.descripcion;
        formulario.querySelector("#valor").value = this.gasto.valor;
        formulario.querySelector("#fecha").value = this.gasto.fecha;
        formulario.querySelector("#etiquetas").value = this.gasto.etiquetas.join(", ");
        
        // Desactivar el botón de editar
        let botonFormulario = document.getElementById("anyadirgasto-formulario");
        botonFormulario.disabled = true;

        // Manejador para el submit del formulario
        formulario.addEventListener("submit", (event) => {
            event.preventDefault();

            // Obtener los nuevos datos
            let descripcion = formulario.querySelector("#descripcion").value;
            let valor = parseFloat(formulario.querySelector("#valor").value);
            let fecha = formulario.querySelector("#fecha").value;
            let etiquetasString = formulario.querySelector("#etiquetas").value;
            let etiquetas = etiquetasString.split(',');

            // Actualizar el gasto
            this.gasto.actualizarDescripcion(descripcion);
            this.gasto.actualizarValor(valor);
            this.gasto.actualizarFecha(fecha);
            this.gasto.anyadirEtiquetas(...etiquetas);

            // Repintar la lista de gastos
            repintar();

            // Volver a activar el botón
            botonFormulario.disabled = false;
        });

        // Manejador para el botón cancelar
        let botonCancelar = formulario.querySelector(".cancelar");
        botonCancelar.addEventListener("click", function () {
            formulario.remove();
            botonFormulario.disabled = false;
        });

        // Añadir el formulario a la página
        document.getElementById("controlesprincipales").appendChild(formulario);
    };
}

function filtrarGastosWeb(event) {
    event.preventDefault();

    const formulario = document.getElementById("formulario-filtrado");
    const descripcion = formulario["formulario-filtrado-descripcion"].value.trim();

    // Crear el objeto con las opciones de filtrado
    const opcionesFiltrado = {
        descripcionContiene: descripcion,
        fechaDesde: formulario["formulario-filtrado-fecha-desde"].value,
        fechaHasta: formulario["formulario-filtrado-fecha-hasta"].value,
        valorMinimo: parseFloat(formulario["formulario-filtrado-valor-minimo"].value) || null,
        valorMaximo: parseFloat(formulario["formulario-filtrado-valor-maximo"].value) || null,
        etiquetasTiene: PresupuestoWeb.transformarListadoEtiquetas(
            formulario["formulario-filtrado-etiquetas-tiene"].value
        )
    };

    const gastosFiltrados = PresupuestoWeb.filtrarGastos(opcionesFiltrado);

    // Mostrar los resultados filtrados
    const capaListadoGastos = document.getElementById("listado-gastos-completo");
    capaListadoGastos.innerHTML = ""; // Limpiar antes de agregar

    gastosFiltrados.forEach(gasto => mostrarGastoWeb("listado-gastos-completo", gasto));
}

function guardarGastosWeb() {
    // Obtenemos el listado de los gastos desde la función listarGastos
    const gastos = PresupuestoWeb.listarGastos();

    // Convertimos el listado de gastos en una cadena JSON
    const gastosString = JSON.stringify(gastos);

    // Almacenamos la cadena en localStorage con la clave 'GestorGastosDWEC'
    localStorage.setItem('GestorGastosDWEC', gastosString);

    // Mensaje opcional para confirmar que los gastos se han guardado
    console.log("Gastos guardados correctamente en localStorage.");
}

// Función para cargar los gastos desde localStorage
function cargarGastosWeb() {
    // Intentamos obtener la cadena de gastos desde localStorage
    const gastosString = localStorage.getItem('GestorGastosDWEC');

    // Si existen gastos en localStorage, los parseamos y los cargamos
    if (gastosString) {
        const gastosCargados = JSON.parse(gastosString);

        // Llamamos a la función cargarGastos con los datos cargados
        PresupuestoWeb.cargarGastos(gastosCargados);
    } else {
        // Si no existen gastos, cargamos un array vacío
        PresupuestoWeb.cargarGastos([]);
    }

    repintar();
}

// Asignamos las funciones como manejadores de eventos para los botones correspondientes
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);

// Añadimos la función como manejadora del evento submit del formulario
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};
