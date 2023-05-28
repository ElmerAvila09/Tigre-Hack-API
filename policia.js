// Configuración para la simulación
const config = {
    "quantity": 10,
    "policeStep": 0.00005,
    "fromCoordinates": {
        "latitude": 25.701072,
        "longitude": -100.332358
    },
    "toCoordinates": {
        "latitude": 25.743079,
        "longitude": -100.289951
    }
}

// Array para almacenar los objetos
let policias = [];

// Bucle for para crear los objetos
for (let i = 0; i < config.quantity; i++) {
  
  console.log();
  const objeto = {
    id: i + 1,
    latitud: config.fromCoordinates.latitude + (config.toCoordinates.latitude - config.fromCoordinates.latitude) * Math.random(),
    longitud: config.fromCoordinates.longitude + (config.toCoordinates.longitude - config.fromCoordinates.longitude) * Math.random(),
    asignado: "false"
  };
  
  policias.push(objeto);
}

function move_police(){
	for (let i = 0; i < policias.length; i++) {
    if (Math.round(Math.random())) {
      policias[i].latitud += config.policeStep
    }
    else {
      policias[i].longitud += config.policeStep
    }
  }
}

setInterval(move_police, 5000);

module.exports = policias;

//console.log(policias);
//console.log(policias[0]["id"]);