const express = require('express');
const router = express.Router()

//Accedemos a la logica de nuestro controlador
const libroController = require('../controllers/libroController')

//Rutas para obtenener y crear libros
router.post('/', libroController.createLibro);
router.get('/', libroController.getLibro);
router.get('/:id', libroController.getLibrobyId);
//router.put('/:id', libroController.editLibro);
//router.delete('/:id', libroController.deletLibro);

module.exports = router;