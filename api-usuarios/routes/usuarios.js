const express = require("express");
const router = express.Router();
const conexion = require("../config/bd-config");
const colors = require("colors");

const dataVacia = array => {
  return array.length === 0 ? true : false;
};

/**
 * ************************
 * * TABLA usuarios
 * ************************
 */

// * get usuarios
router.get("/api/v1/usuarios/usuarios", (req, res) => {
  const connection = conexion;

  const queryString = "SELECT * FROM usuarios";
  connection.query(queryString, (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "error al obtener los usuarios",
        error: err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

// * get por id
router.get("/api/v1/usuarios/usuario_id/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Accediendo a la informacion del usuario id: ${id}`);

  const connection = conexion;

  const queryString = `SELECT * FROM usuarios WHERE id = ?`;
  connection.query(queryString, [id], (err, data, fields) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err
      });
    }

    if (dataVacia(data)) {
      return res
        .status(404)
        .json({ ok: true, message: "usuario no encontrado", usuario: {} });
    } else {
      let usuario = {
        id: data[0].id,
        nombre: data[0].nombre,
        nombre_usuario: data[0].nombre_usuario,
        email: data[0].email,
        creado_en: data[0].creado_en,
        actualizado_en: data[0].actualizado_en,
        id_status: data[0].id_status
      };

      res.json({
        ok: true,
        usuario
      });
    }
  });

  // res.end();
});

// * get por email
router.get("/api/v1/usuarios/usuario_email/:email", (req, res) => {
  const email = req.params.email;
  console.log(`Accediendo a la informacion del usuario id: ${email}`);

  const connection = conexion;

  const queryString = `SELECT * FROM usuarios WHERE email = ?`;
  connection.query(queryString, [email], (err, data, fields) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err
      });
    }

    console.log(data);

    if (dataVacia(data)) {
      return res
        .status(404)
        .json({ ok: true, message: "usuario no encontrado", usuario: {} });
    } else {
      let usuario = {
        id: data[0].id,
        nombre: data[0].nombre,
        nombre_usuario: data[0].nombre_usuario,
        email: data[0].email,
        creado_en: data[0].creado_en,
        actualizado_en: data[0].actualizado_en,
        id_status: data[0].id_status
      };

      res.json({
        ok: true,
        usuario
      });
    }
  });

  // res.end();
});

// * insertar usuarios
router.post("/api/v1/usuarios/crear_usuario", (req, res) => {
  const connection = conexion;

  const { nombre, nombre_usuario, email } = req.body;
  let fecha_registro = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const queryString =
    "INSERT INTO usuarios (nombre, nombre_usuario, email, creado_en, actualizado_en, id_status) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    queryString,
    [nombre, nombre_usuario, email, fecha_registro, fecha_registro, 1],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "error al realizar al insertar nuevo usuario",
          error: err
        });
      }

      const usuario = {
        id: data.insertId,
        nombre,
        nombre_usuario,
        email,
        creado_en: fecha_registro,
        actualizado_en: fecha_registro,
        id_status: 1
      };

      res.json({ ok: true, data: usuario });
    }
  );
});

// * actualizar estado usuario
router.put("/api/v1/usuarios/usuario_status/:id", (req, res) => {
  const connection = conexion;

  const id = req.params.id;
  const { id_status } = req.body;

  let fecha_actualizacion = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const queryString = `UPDATE usuarios SET id_status = ?, actualizado_en= ? WHERE id = ?`;
  connection.query(
    queryString,
    [id_status, fecha_actualizacion, id],
    (err, data, fields) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "error al realizar la peticion",
          error: err
        });
      }

      if (data.affectedRows === 0) {
        return res
          .status(404)
          .json({ ok: true, message: "usuario no encontrado", usuario: {} });
      } else {
        res.json({
          ok: true,
          mensaje: "se ha editado correctamente estado del usuario"
        });
      }
    }
  );
});

// * editar usuario
router.put("/api/v1/usuarios/usuario/:id", (req, res) => {
  const id = req.params.id;
  const nombre_usuario = req.body.nombre_usuario;

  const connection = conexion;

  let fecha_actualizacion = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const queryString = `UPDATE usuarios SET nombre_usuario = ?, actualizado_en = ? WHERE id = ?`;
  connection.query(
    queryString,
    [nombre_usuario, fecha_actualizacion, id],
    (err, data, fields) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "error al realizar la peticion",
          error: err
        });
      }

      if (data.affectedRows === 0) {
        return res
          .status(404)
          .json({ ok: true, message: "usuario no encontrado", usuario: {} });
      } else {
        res.json({
          ok: true,
          mensaje: "se ha editado correctamente el nombre de usuario"
        });
      }
    }
  );
});

// * eliminar usuario
router.delete("/api/v1/usuarios/usuario/:id", (req, res) => {
  const id = req.params.id;

  const connection = conexion;

  const queryString = `DELETE FROM usuarios WHERE id = ?`;
  connection.query(queryString, [id], (err, data, fields) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err
      });
    }

    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ ok: true, message: "usuario no encontrado", usuario: {} });
    } else {
      res.json({
        ok: true,
        mensaje: "se ha eliminado correctamente el usuario "
      });
    }
  });
});

/**
 * ************************
 * * TABLA status_usuarios
 * ************************
 */

// * get status_usuarios
router.get("/api/v1/usuarios/status_usuarios", (req, res) => {
  const connection = conexion;

  const queryString = "SELECT * FROM status_usuarios";
  connection.query(queryString, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

// * insertar status_usuarios
router.post("/api/v1/usuarios/crear_status_usuario", (req, res) => {
  const connection = conexion;

  const { id_status, descripcion } = req.body;

  const queryString = "INSERT INTO status_usuarios VALUES (?, ?)";
  connection.query(queryString, [id_status, descripcion], (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }

    res.json({ ok: true, message: "status_usuario creado exitosamente" });
  });
});

// * editar status_usuario
router.put("/api/v1/usuarios/status_usuario/:id", (req, res) => {
  const id = req.params.id;
  const { id_status, descripcion } = req.body;

  const connection = conexion;

  const queryString = `UPDATE status_usuarios SET id_status = ?, descripcion = ? WHERE id_status = ?`;
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

      if (data.affectedRows === 0) {
        return res
          .status(404)
          .json({ ok: true, message: "usuario no encontrado", usuario: {} });
      } else {
        res.json({
          ok: true,
          mensaje: "se ha editado correctamente el registro"
        });
      }
    }
  );
});

// * eliminar status_usuario
router.delete("/api/v1/usuarios/status_usuario/:id", (req, res) => {
  const id = req.params.id;

  const connection = conexion;

  const queryString = `DELETE FROM status_usuarios WHERE id_status = ?`;
  connection.query(queryString, [id], (err, data, fields) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "error al realizar la peticion",
        error: err
      });
    }

    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ ok: true, message: "usuario no encontrado", usuario: {} });
    } else {
      res.json({
        ok: true,
        message: "se ha eliminado correctamente el usuario"
      });
    }
  });
});

module.exports = router;
