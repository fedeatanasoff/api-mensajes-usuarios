const express = require("express");
const router_mensajes = express.Router();
const conexion = require("../config/bd-config");
const colors = require("colors");

/**
 * ************************
 * * TABLA mensajes
 * ************************
 */

// * get mensajes
router_mensajes.get("/api/v1/mensajes/mensajes", (req, res) => {
  const connection = conexion;

  const queryString = "SELECT * FROM mensajes";
  connection.query(queryString, (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }

    res.json({
      ok: true,
      mensajes: data
    });
  });
});

// * insertar mensaje
router_mensajes.post("/api/v1/mensajes/crear_mensaje", (req, res) => {
  const connection = conexion;

  const { cuerpo, id_usuario, id_status } = req.body;
  let fecha_registro = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const queryString =
    "INSERT INTO mensajes (cuerpo, creado_en, id_usuario, id_status) VALUES (?, ?, ?, ?)";
  connection.query(
    queryString,
    [cuerpo, fecha_registro, id_usuario, id_status],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "error al realizar la peticion",
          error: err
        });
      }

      const usuario = {
        id: data.insertId,
        cuerpo,
        creado_en: fecha_registro,
        id_usuario,
        id_status
      };

      res.json({ ok: true, usuario });
    }
  );
});

/**
 * ************************
 * * TABLA status_mensajes
 * ************************
 */

// * get status_usuarios
router_mensajes.get("/api/v1/mensajes/status_mensajes", (req, res) => {
  const connection = conexion;

  const queryString = "SELECT * FROM status_mensajes";
  connection.query(queryString, (err, data, fields) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }
    console.table(fields);
    res.json({
      ok: true,
      data
    });
  });
});

// * insertar status_mensajes
router_mensajes.post("/api/v1/mensajes/crear_status_mensaje", (req, res) => {
  const connection = conexion;

  const { id_status, descripcion } = req.body;

  const queryString = "INSERT INTO status_mensajes VALUES (?, ?)";
  connection.query(queryString, [id_status, descripcion], (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }

    res.json({ ok: true, message: "status_usuario creado exitosamente" });
  });
});

// * editar status_mensaje
router_mensajes.put("/api/v1/mensajes/status_mensaje/:id", (req, res) => {
  const id = req.params.id;
  const { id_status, descripcion } = req.body;

  const connection = conexion;

  const queryString = `UPDATE status_mensajes SET id_status = ?, descripcion = ? WHERE id_status = ?`;
  connection.query(
    queryString,
    [id_status, descripcion, id],
    (err, data, fields) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "error al realizar la peticion",
          error: err
        });
      }
      res.json({
        ok: true,
        mensaje: "se ha editado correctamente el status mensaje"
      });
    }
  );
});

// * eliminar status_mensaje
router_mensajes.delete("/api/v1/mensajes/status_mensaje/:id", (req, res) => {
  const id = req.params.id;

  const connection = conexion;

  const queryString = `DELETE FROM status_mensajes WHERE id_status = ?`;
  connection.query(queryString, [id], (err, data, fields) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }

    res.json({
      ok: true,
      message: "se ha eliminado correctamente el status mensaje"
    });
  });
});

module.exports = router_mensajes;
