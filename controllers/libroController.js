//Acceso a la DB
const db = require('../config/db')

//Método para crear libros
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
            mensaje: 'Se agrego el libro'
        })
    } catch (e) {
        //En caso de une excepcion se arrojara el error y un codigo de estado
        console.error(e)
        res.status(500).json({error: 'Error en el servidor'})
    }
}

//Método para obtener libros
exports.getLibro = async(req, res) =>{
    //Consulta SQL para obtener todos los registros en la tabla LIBROS
    const sql = "SELECT id, titulo, autor, numpaginas, categoria FROM libros"
    try {
        //Obtenemos solo los registros y no los metadatos
        const [libros] = await db.query(sql)
        return res.status(200).json({libros})    
    } catch (e) {
        console.error(e)
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}

//Método para buscar un libro por su ID
exports.getLibrobyId = async(req, res) =>{
    //Obtenemos el ID del libro que queremos encontrar
    const {id} = req.params

    //Preparamos la consulta SQL
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

//Método para editar un libro(Minímo se requiere un campo para actualizar)
exports.editLibro = async(req, res) =>{
    //Obtenemos el ID del libro qu evmaos a editar
    const {id} = req.params;

    //Obtenemos los nuevos valores que el libro tendra 
    const {titulo, autor, numpaginas, categoria} = req.body

    //Validamos que haya al menos un valor  
    if(!titulo && !autor && !numpaginas && !categoria){
        return res.status(400).json({mensaje: 'Debe de ingresar minimo un campo para actualizar'})
    }

    let sqlParts = []; //Este array guardara la consulta SQL
    let values = []; //Este array guardara los valores
    
    //Creamos condiciones para agregar a la consulta SQL en caso que el campo tenga un nuevo valor
    if(titulo){
        sqlParts.push('titulo = ?')
        values.push(titulo)
    }

    if(autor){
        sqlParts.push('autor = ?')
        values.push(autor)
    }

    if(numpaginas){
        sqlParts.push('numpaginas = ?')
        values.push(numpaginas)
    }

    if(categoria){
        sqlParts.push('categoria = ?')
        values.push(categoria)
    }

    //En caso de que el array que la guarda la consultas(sqlParts) este vacio se enviara un mensaje de error
    if(!sqlParts){
        return res.status(400).json({error: 'No hay datos para actualizar'})
    }

    //Construimos la consulta dinámica
    const sql = `UPDATE libros SET ${sqlParts.join(', ')} WHERE id = ?`
    values.push(id)
    try {
        //Insertamos los libros a la BD
        const [result] = await db.query(sql, values)    
        
        //En caso de no actualizarse
        if (result.affectedRows === 0) {
            return res.status(404).json({erro: 'No se ha encontrado el libro'})
        }
        //En caso de actualizarse se enviara un mensaje de exito
        res.status(200).json({mensaje: 'Se actualizo el libro correctamente'})
    } catch (e) {

        console.error(500).json({mensaje: 'Error en el servidor'})
    }
}

//Método para eliminar un libro
exports.deleteLibro = async(req, res) =>{
    const {id} = req.params

    //Preparamos la consulta SQL
    const sql = "DELETE FROM libros WHERE id = ?"

    try {
        //Ingresamos la consulta a la BD
        const [result] = await db.query(sql, [id])

        //En caso de no encontrar el libro
        if(!result.affectedRows){
            return res.status(400).json({error: 'Libro no encontrado para eliminar'})
        }
        
        //Enviamos la respuesta
        res.status(200).json({mensaje: 'Producto eliminado'})
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Error en el servidor'})
    }
}