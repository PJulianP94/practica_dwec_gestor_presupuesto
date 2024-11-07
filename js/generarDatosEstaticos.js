import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

// Actualizo el presupuesto y lo muestro
gestionPresupuesto.actualizarPresupuesto(1500);
web.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

// Creo los gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añado los gastos al array
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

// Mostrar el gasto total y el balance
web.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
web.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

let gastos = gestionPresupuesto.gastos || [];

// Mostrar todos los gastos
for (let i = 0; i < gastos.length; i++) {
    web.mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.gastos[i]);
}

// Filtrar y mostrar los gastos por diferentes criterios

// Mostrar los gastos realizados en septiembre de 2021
let gastosFiltradosSeptiembre = gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (let i = 0; i < gastosFiltradosSeptiembre.length; i++) {
    web.mostrarGastoWeb('listado-gastos-filtrado-1', gastosFiltradosSeptiembre[i]);
}

// Mostrar los gastos de más de 50€
let gastosFiltrados50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
for (let i = 0; i < gastosFiltrados50.length; i++) {
    web.mostrarGastoWeb('listado-gastos-filtrado-2', gastosFiltrados50[i]);
}

// Mostrar los gastos de más de 200€ con etiqueta "seguros"
let gastosFiltradosSeguros200 = gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (let i = 0; i < gastosFiltradosSeguros200.length; i++) {
    web.mostrarGastoWeb('listado-gastos-filtrado-3', gastosFiltradosSeguros200[i]);
}

// Mostrar los gastos con las etiquetas "comida" o "transporte" y de menos de 50€
let gastosFiltradosComidaTransporte50 = gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] });
for (let i = 0; i < gastosFiltradosComidaTransporte50.length; i++) {
    web.mostrarGastoWeb('listado-gastos-filtrado-4', gastosFiltradosComidaTransporte50[i]);
}

// Agrupar gastos por día, mes y año
let agrupadosPorDia = gestionPresupuesto.agruparGastos('dia');
web.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupadosPorDia, 'día');

let agrupadosPorMes = gestionPresupuesto.agruparGastos('mes');
web.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupadosPorMes, 'mes');

let agrupadosPorAnyo = gestionPresupuesto.agruparGastos('año');
web.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupadosPorAnyo, 'año');

