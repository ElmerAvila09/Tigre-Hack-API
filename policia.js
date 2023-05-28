// Configuración para la simulación
const config = {
    quantity: 10,
    policeStep: 0.00005,
    changeDirectionCount: 5,
    fromCoordinates: {
        latitude: 25.701072,
        longitude: -100.332358
    },
    toCoordinates: {
        latitude: 25.743079,
        longitude: -100.289951
    }
}

let changeDirectionCounter = 0

// Array para almacenar los objetos
let policias = [];

const directions = ["norte", "sur", "este", "oeste"];
let tempDirections = []

// Bucle for para crear los objetos
for (let i = 0; i < config.quantity; i++) {
  
  console.log();
  const objeto = {
    id: i + 1,
    latitud: config.fromCoordinates.latitude + (config.toCoordinates.latitude - config.fromCoordinates.latitude) * Math.random(),
    longitud: config.fromCoordinates.longitude + (config.toCoordinates.longitude - config.fromCoordinates.longitude) * Math.random(),
    asignado: "false",
    ultimaDireccion: directions[Math.floor(Math.random() * directions.length)]
  };
  
  policias.push(objeto);
}

function sumDistance(police) {
  if (police.ultimaDireccion == "norte") {
    police.latitud += config.policeStep
  }
  else if (police.ultimaDireccion == "sur") {
    police.latitud -= config.policeStep
  }
  else if (police.ultimaDireccion == "este") {
    police.longitud += config.policeStep
  }
  else {
    police.longitud -= config.policeStep
  } 
  return police
}

function move_police(){
  if (changeDirectionCounter <= config.changeDirectionCount){
    for (let i = 0; i < policias.length; i++) {
      policias[i] = sumDistance(policias[i])
    }
  }
  else {
    changeDirectionCounter = 0
    for (let i = 0; i < policias.length; i++) {
      if (policias[i].ultimaDireccion == "norte") {
        tempDirections = ["norte", "este", "oeste"]
      }
      else if (policias[i].ultimaDireccion == "sur") {
        tempDirections = ["sur", "este", "oeste"]
      }
      else if (policias[i].ultimaDireccion == "este") {
        tempDirections = ["norte", "sur", "este"]
      }
      else {
        tempDirections = ["norte", "sur", "oeste"]
      }
      policias[i].ultimaDireccion = tempDirections[Math.floor(Math.random() * tempDirections.length)]
      policias[i] = sumDistance(policias[i])
    }
  }
  changeDirectionCounter++
}

setInterval(move_police, 5000);

module.exports = policias;