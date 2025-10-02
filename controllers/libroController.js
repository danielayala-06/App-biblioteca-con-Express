//Acceso a la DB
const db = require('../config/db')

exports.createLibro = async(req, res) =>{
    // Obtenemos los datos del body
    const {titulo, autor, numpaginas, categoria} = req.body
    
    //Preparamos la consulta SQL
    const sql = "INSERT INTO libros(titulo, autor, numpaginas, categoria) VALUES(?, ?, ?, ?)"

    //Validamos que no falte ningún dato
    if(!titulo || !autor || !numpaginas || !categoria){
        return res.status(400).json({error: 'No se permiten valores vacios'})
    }

    try {
        //Ejecutamos la consulta SQL
        const [result] = await db.query(sql, [titulo, autor, numpaginas, categoria])
        
        //Devolvemos una respuesta de exito
        res.status(201).json({ 
            id: result.insertId,
            mensaje: 'Se agrego el libro'})
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Error en el servidor'})
    }
}

exports.getLibro = async(req, res) =>{
    const sql = "SELECT id, titulo, autor, numpaginas, categoria FROM libros"
    try {
        //Obtenemos solo los dato
        const [libros] = await db.query(sql)
        return res.status(200).json({libros})    
    } catch (e) {
        console.error(e)
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}

exports.getLibrobyId = async(req, res) =>{
    const {id} = req.params
    const sql = "SELECT id, titulo, autor, numpaginas, categoria FROM libros WHERE id = ?"
    try {
        //Obtenemos solo los datos
        const [libros] = await db.query(sql, [id])

        //Enviamos un mensaje de error en caso de no encontrar el libro
        if (!libros.length) {
            return res.status(404).json({mensaje: 'Libro no encontrado'})
        }

        return res.status(200).json({res:libros[0]})    
    } catch (e) {
        console.error(e)
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}