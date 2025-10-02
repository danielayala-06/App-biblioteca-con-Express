# CREACIÓN DE UNA APP CON EXPRESS JS
Aplicacion sencilla para mostrar los datos de una tabla usando Javascript con express y nodejs 
## SQL
### Creamos la BD 
 ```SQL
CREATE DATABASE biblioteca;
```
```SQL
USE biblioteca;

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
## INSTALACION

## 📂RUTA DE CARPETAS
