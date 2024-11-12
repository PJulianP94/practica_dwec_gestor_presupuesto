// gestionPresupuestoWeb.js
import * as PresupuestoWeb from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

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
    divValor.textContent = `${gasto.valor} €`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    
        for (let i  of gasto.etiquetas) {
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
            spanEtiqueta.textContent = i;
            
            // manejador de evento para borrar la etiqueta
            let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
            manejadorBorrarEtiqueta.gasto = gasto;
            manejadorBorrarEtiqueta.etiqueta = gasto.etiquetas;
            spanEtiqueta.addEventListener('click', manejadorBorrarEtiqueta);
            
            divEtiquetas.appendChild(spanEtiqueta);
        }
    

    // Crear el botón de Editar
    let botonEditar = document.createElement('button');
    botonEditar.setAttribute("type", "button");
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';
    
    // manejador de evento para editar el gasto
    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    botonEditar.addEventListener('click', manejadorEditar);
    
    // Crear el botón de Borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.setAttribute("type", "button")
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


function repintar() {
    mostrarDatoEnId("presupuesto", PresupuestoWeb.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", PresupuestoWeb.calcularTotalGastos());
    mostrarDatoEnId("balance-total", PresupuestoWeb.calcularBalance());
    
    let gastoscompletos = document.getElementById("listado-gastos-completo");
    gastoscompletos.innerHTML = ""; // borramos los datos para insertar después 
    mostrarGastoWeb("listado-gastos-completo", PresupuestoWeb.listarGastos());
}

function actualizarPrespuestoWeb() {
    let respuesta = prompt("Introduce el presupuesto");
    let nuevopresupuesto = parseInt(respuesta);
    PresupuestoWeb.actualizarPresupuesto(nuevopresupuesto);
    repintar(); // repintar para actualizar los datos
}

let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener("click", actualizarPrespuestoWeb); // Se pasa la función sin paréntesis

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto");
    let valor = parseFloat(prompt("Introduce el valor del gasto"));
    let fecha = prompt("Introduce la fecha del gasto (formato: yyyy-mm-dd)");
    let etiquetasString = prompt("Introduce las etiquetas (separadas por comas)");
    let etiquetas = etiquetasString.split(',');

    let gasto = new CrearGasto(descripcion, valor, fecha, etiquetas);
    anyadirGasto(gasto);

    repintar(); 
}

let boton2 = document.getElementById("anyadirgasto");
boton2.addEventListener("click", nuevoGastoWeb);

function EditarHandle ()
{
    this.handleEvent = function()
    {
        let nuevaDescripcion = prompt("Introduce la nueva descripción del gasto");
        let nuevoValor = parseFloat(prompt("Introduce el nuevo valor del gasto"));
        let nuevaFecha = prompt("Introduce la nueva fecha del gasto (formato: yyyy-mm-dd):");
        let nuevasEtiquetas= prompt("Introduce las nuevas etiquetas (separadas por comas):");
        nuevasEtiquetas.split(",");
    
          this.gasto.actualizarDescripcion(nuevaDescripcion);
          this.gasto.actualizarValor(nuevoValor);
          this.gasto.actualizarFecha(nuevaFecha);
          this.gasto.anyadirEtiquetas(nuevasEtiquetas);
      
          repintar();
      }
        
    }

function BorrarHandle()
{
    this.handleEvent = function()
    {
        PresupuestoWeb.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle() {
    this.handleEvent = function() 
    {
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    }
            
       
}


export {

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

