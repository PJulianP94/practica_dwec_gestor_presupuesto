// gestionPresupuestoWeb.js

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtén el contenedor donde agregarás el gasto
    let contenedor = document.getElementById(idElemento);

    // Crear el div principal para el gasto
    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    // Crear el div para la descripción del gasto
    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = gasto.descripcion; // Usar gasto.descripcion

    // Crear el div para la fecha del gasto
    let divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString(); // Formatear fecha

    // Crear el div para el valor del gasto
    let divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = `${gasto.valor} €`; // Usar gasto.valor

    // Crear el div para las etiquetas del gasto
    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');

    // Crear los elementos <span> para cada etiqueta
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
        spanEtiqueta.textContent = etiqueta; // Usar cada etiqueta

        // Agregar el <span> al contenedor de etiquetas
        divEtiquetas.appendChild(spanEtiqueta);
    }

    // Agregar los subelementos al div principal
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);

    // Finalmente, agregar el divGasto al contenedor principal
    contenedor.appendChild(divGasto);
}



  function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);

    // Crear un div contenedor para toda la agrupación
    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion'); // Clase agrupacion añadida

    // Crear el encabezado con el texto esperado
    let header = document.createElement('h1');
    header.textContent = 'Gastos agrupados por ' + periodo; // Asegúrate que esto coincide con el texto esperado
    divAgrupacion.appendChild(header);  // Añadir el encabezado al contenedor de la agrupación

    // Bucle para recorrer cada elemento de la agrupación
    for (let i in agrup) {
        let value = agrup[i];

        // Crear un div para cada agrupación, con la clase correcta de 'agrupacion-dato'
        let div = document.createElement('div');
        div.classList.add('agrupacion-dato');  // Cambié la clase aquí

        // Crear el 'span' para la clave (año, mes, etc.)
        let claveSpan = document.createElement('span');
        claveSpan.classList.add('agrupacion-dato-clave'); // Agregamos la clase correcta
        claveSpan.textContent = i; // El periodo (año, mes, etc.)

        // Crear el 'span' para el valor
        let valorSpan = document.createElement('span');
        valorSpan.classList.add('agrupacion-dato-valor'); // Agregamos la clase correcta
        valorSpan.textContent = `${value} €`;

        // Añadir los spans al div principal de la agrupación
        div.appendChild(claveSpan);
        div.appendChild(valorSpan);

        // Añadir el div a la agrupación
        divAgrupacion.appendChild(div);
    }

    // Finalmente, añadir el divAgrupacion al contenedor principal
    contenedor.appendChild(divAgrupacion);
}




export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

