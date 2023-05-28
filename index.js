// Importar las dependencias
const express = require('express');
const policias = require('./policia.js');

// Puerto en el que la API escuchará las solicitudes
const puerto = 3000;

// Crear una instancia de la aplicación de Express
const app = express();
app.use(express.json());

// Devolver los objetos de policias
/*
  Policias [
    {
      "id":1,
      "latitud":192.12,
      "longitud":152.12,
      "asignado":false
    },
    {}...
  ]
*/
app.get('/policias', (req, res) => {
  res.json(policias);
});


// Asignar a un policia
app.post('/assign', (req, res) => {
  
  let { latitud, longitud } = req.body;

  let policiaCercano;
  let distanciaMinima = Infinity;

  for (const policia of policias) {

    const distancia = calcularDistancia(
      policia.latitud,
      policia.longitud,
      latitud,
      longitud
    );
  
    if (distancia < distanciaMinima && policia.asignado != "true") {
      distanciaMinima = distancia;
      policiaCercano = policia;
    }
  }

  if (policiaCercano) {
    policiaCercano.asignado = "true";
  }

  res.json(policiaCercano);
});


// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`La API está funcionando en el puerto ${puerto}`);
});


function calcularDistancia(x1, y1, x2, y2) {
  const distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distancia;
}