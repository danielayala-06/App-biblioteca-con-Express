//Acceso a la DB
const db = require('../config/db')

exports.createLibro = async(req, res) =>{
    console.log('Has ejecutado POST CHAVAL')
}

exports.getLibro = async(req, res) =>{
    const sql = "SELECT id, titulo, autor, numpaginas, categoria FROM libros"
    try {
        //Obtenemos solo los dato
        const [libros] = await db.query(sql)
        res.status(200).json({libros})    
    } catch (e) {
        console.error(e)
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}