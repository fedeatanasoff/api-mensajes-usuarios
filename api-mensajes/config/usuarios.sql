DROP DATABASE IF EXISTS chatapi;

CREATE DATABASE IF NOT EXISTS chatapi;

USE chatapi;

CREATE TABLE usuarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    creado_en DATETIME NOT NULL, 
    actualizado_en DATETIME NOT NULL,
    id_status INT UNSIGNED NOT NULL
);

CREATE TABLE status_usuarios(
    id_status INT NOT NULL UNIQUE,
    descripcion VARCHAR(20) NOT NULL
);

CREATE TABLE mensajes(
    id_mensaje INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cuerpo VARCHAR(140) NOT NULL,
    creado_en DATETIME NOT NULL, 
    id_usuario INT UNSIGNED NOT NULL,
    id_status INT UNSIGNED NOT NULL
);

CREATE TABLE status_mensajes(
    id_status INT UNSIGNED NOT NULL UNIQUE,
    descripcion VARCHAR(20) NOT NULL
);

INSERT INTO usuarios (nombre, nombre_usuario, email, creado_en, actualizado_en, id_status) VALUES ("federico", "fd", "fde@fede.com", "2019-03-15 01:14:21","2019-03-15", 1);
INSERT INTO usuarios (nombre, nombre_usuario, email, creado_en, actualizado_en, id_status) VALUES ("lautaro", "laucha_ar", "laucha@lg.com", "2019-03-19 21:14:21","2019-03-15", 1);
INSERT INTO status_usuarios VALUES (1, "conectado");
INSERT INTO status_usuarios VALUES (2, "desconectado");
INSERT INTO status_mensajes VALUES (1, "leido");
INSERT INTO status_mensajes VALUES (2, "no leido");
INSERT INTO mensajes (cuerpo, creado_en, id_usuario, id_status) VALUES ("cuerpo de mensaje", "2019-03-15 01:14:21", 1, 1);
