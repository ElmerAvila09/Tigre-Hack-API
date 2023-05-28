// Número de objetos a crear
const n = 3;

// Array para almacenar los objetos
const policias = [];
let sum = 0;
// Bucle for para crear los objetos
for (let i = 0; i < n; i++) {
  
    const objeto = {
    id: i + 1,
    latitud: 25.72686918884415 + sum,
    longitud: -100.31223803086839 + sum,
    asignado: "false"
  };
  
  policias.push(objeto);
  sum += .003;
}

module.exports = policias;

//console.log(policias);
//console.log(policias[0]["id"]);