// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
presupuesto = 0;


function actualizarPresupuesto(nuevopresupuesto) {
    if (nuevopresupuestopresupuesto => 0)
    {
        nuevopresupuesto = presupuesto;
        return presupuesto;
    }      
    else
    {
        return -1;
        console.log ("El presupuesto es negativo")
    }
        }
    
function mostrarPresupuesto() {
   console.log ("Tu presupuesto actual es de: " + presupuesto)
}

function CrearGasto() {
    let Gasto = 
    {
        descripcion: "" ,
        valor: "",
        mostrarGasto : function ()
        {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion: function (nuevadescripcion)
        {
            this.descripcion = nuevadescripcion;
        },
        actualizarValor: function (nuevovalor)
        {
            if (nuevovalor >= 0)
            {
                this.valor = nuevovalor;
            }
            
        else 
        {
            console.log ("El valor no puede ser negativo")
        }
     
        },
    }
    return Gasto;
    }


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
