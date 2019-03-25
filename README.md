## apis proyecto

- levantar servidor de base de datos mysql
- cargar la base de datos 'usuarios.sql'

repetir en cada carpeta para leventar la api:

- npm install
- npm run dev

endpoints - x-xxx-form-urlencoded - Tabla usuarios:

- <div style="display: inline">http://localhost:2000/api/v1/usuarios/usuarios  => GET : obtener usuarios
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/usuario_id/:id  => GET : obtener usuario por id
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/crear_usuario  => POST : crear un usuario(nombre, nombre_usuario, email)
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/usuario/:id  => PUT : editar nombre de usuario(nombre_usuario)
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/usuario/:id  => DELETE : elimina usuario
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/usuario_email/:email  => GET : obtener usuario por email
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/usuario_status/:id  => PUT : actualizar status del usuario(id_status)

endpoints - x-xxx-form-urlencoded - Tabla status_usuarios

- <div style="display: inline">http://localhost:2000/api/v1/usuarios/status_usuarios => GET : obtener usuarios
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/crear_status_usuario => POST : crear status de usuario(id_status, descripcion)
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/status_usuario/3 => PUT : editar status de usuario(id_status, descripcion)
- <div style="display: inline">http://localhost:2000/api/v1/usuarios/status_usuarios => DELETE : eliminar usuario

endpoints - x-xxx-form-urlencoded - Tabla mensajes

- <div style="display: inline">http://localhost:2100/api/v1/mensajes/mensajes => GET Mensajes
- <div style="display: inline">http://localhost:2100/api/v1/mensajes/crear_mensaje => POST insertar mensajes(cuerpo, id_usuario, id_status)

endpoints - x-xxx-form-urlencoded - Tabla status_mensajes

- <div style="display: inline">http://localhost:2100/api/v1/mensajes/status_mensajes => GET status mensajes
- <div style="display: inline">http://localhost:2100/api/v1/mensajes/crear_status_mensaje => POST crear status_mensajes(id_status, descripcion)
- <div style="display: inline">http://localhost:2100/api/v1/mensajes/status_mensaje/:id => PUT editar status_mensajes(id_status, descripcion)
- <div style="display: inline">http://localhost:2100/api/v1/mensajes/status_mensaje/:id => DELETE eliminar status_mensajes
