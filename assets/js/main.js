// URL de la API
const urlApi = "https://mindicador.cl/api";

// Elementos del DOM
const cantidadInput = document.getElementById("cantidadInput");
const monedaSelect = document.getElementById("monedaSelect");
const botonConvertir = document.getElementById("botonConvertir");
const resultadoDiv = document.getElementById("resultado");

// Función para obtener los datos de la API
function obtenerTasasDeCambio() {
  return fetch(urlApi)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener los datos desde la API.");
      }
      return respuesta.json();
    })
    .catch((error) => {
      resultadoDiv.textContent = `Error: ${error.message}`;
      return null;
    });
}

// Función para realizar la conversión
function convertirMoneda() {
  const cantidad = parseFloat(cantidadInput.value);
  const moneda = monedaSelect.value;
  
  // Funcion para validar el monto
  if (isNaN(cantidad) || cantidad <= 0) {
    resultadoDiv.textContent = "Por favor, ingresa un monto válido.";
    return;
  }

  // Llamar a la API y realizar la conversión
  obtenerTasasDeCambio().then((datos) => {
    if (!datos) return;

    
    const claveMoneda = moneda === "usd" ? "dolar" : "euro";
    const tasaCambio = datos[claveMoneda]?.valor;

    if (!tasaCambio) {
      resultadoDiv.textContent =
        "No se encontró el tipo de cambio seleccionado.";
      return;
    }

    const montoConvertido = (cantidad / tasaCambio).toFixed(2);
    resultadoDiv.textContent = `Monto convertido: ${montoConvertido} ${moneda.toUpperCase()}`;
  });
}

// Agregar el evento al botón
botonConvertir.addEventListener("click", convertirMoneda);
