const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const colors = require("colors");
const router = require("./routes/mensajes.js");

// ** CONFIGURACIONES
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// ** RUTAS
app.use(router);

// * SERVIDOR
app.listen(2100, () => {
  console.log("Servidor API MENSAJES corriendo en puerto 2100".bold);
});
