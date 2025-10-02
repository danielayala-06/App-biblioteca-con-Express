const express = require('express');
const router = express.Router()

//Accedemos a la logica de nuestro controlador
const libroController = require('../controllers/libroController')

//Rutas para obtenener y crear libros
router.post('/', libroController.createLibro);
router.get('/', libroController.getLibro);

module.exports = router;