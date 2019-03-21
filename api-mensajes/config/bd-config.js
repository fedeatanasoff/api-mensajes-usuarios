const mysql = require("mysql");
const colors = require("colors");
const dbOpciones = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "chatapi"
};

const conexion = mysql.createConnection(dbOpciones);

conexion.connect(error => {
  return error
    ? console.log(`Error al conectarse a la BD: ${error.stack}`.red)
    : console.log(
        `Conexion establecida con la BD Nº ${conexion.threadId}`.yellow
      );
});

module.exports = conexion;
