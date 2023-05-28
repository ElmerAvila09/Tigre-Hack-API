// Importar las dependencias
const express = require('express');
const policias = require('./policia.js');

// Puerto en el que la API escuchará las solicitudes
const puerto = 5000;

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

  res.json({policiaCercano, "distancia": distanciaMinima});
});


// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`La API está funcionando en el puerto ${puerto}`);
});


function calcularDistancia(lat1, lon1, lat2, lon2) {
  const radLat1 = (Math.PI / 180) * lat1;
  const radLat2 = (Math.PI / 180) * lat2;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI / 180) * theta;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = (dist * 1.609344) * 1000; // Convertir a metros
  return dist;
}