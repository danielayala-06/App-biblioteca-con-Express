# 🌐CREACIÓN DE UNA APP CON EXPRESS JS
App de biblioteca usando Javascript con express y nodejs. En este proyecto se implemento las opereaciones CRUD completas.

## 🛢️Creacion de la BD 
Podemos hacerlo con cualquier gestor de Base de Datos que tengamos. En mi caso lo hice con MySQLWorbeanch.
 ```SQL
CREATE DATABASE biblioteca;
USE biblioteca;
```
```SQL
CREATE TABLE libros(
id INT auto_increment PRIMARY KEY,
titulo VARCHAR(45) NOT NULL,
autor VARCHAR(45) NOT NULL,
numpaginas SMALLINT NOT NULL,
categoria VARCHAR(45) NOT NULL
)ENGINE = INNODB;

INSERT INTO libros(titulo, autor, numpaginas, categoria) VALUES('Clean Code', 'Robert Cecil Martin', 464, 'Software Development');
INSERT INTO libros(titulo, autor, numpaginas, categoria) VALUES('The pragmatic Programmer', 'Andy Hunt y Dave Thomas', 320, 'Software Development');
SELECT * FROM libros;
 ```
## 📥INSTALACION
Para este proyecto necesitamos tener instalado Node.js y nodemon. Con esto en cuenta, clonamos el repositorio.

```bash
git clone https://github.com/danielayala-06/App-biblioteca-con-Express.git
```
Luego accedemos a la carpeta raiz del proyecto e instalamos las dependencias:
```bash
npm install
```
Para la configuracion la conexion a la BD renombraremos el archivo ".env.example" a ".env"
y configuramos el archivo .env
```conf
DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=tu_base_de_datos
DB_PORT=puerto_DB
```
Por ultimo ejecutamos el siguiente comando en la terminal:
```bash
nodemon server
```
