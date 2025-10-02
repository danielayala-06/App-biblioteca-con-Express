const express = require('express')
const libroRoutes= require('./routes/librosRoutes')

const app = express()
const PORT = process.env.PORT || 3000 // Puerto de la aplicación

app.use(express.json())

app.use('/api/libros', libroRoutes)

//Iniciamos el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
})