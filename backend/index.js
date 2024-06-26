const express = require('express'); 
require('dotenv').config();

const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') ); 

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') ); // esto es un middleware
app.use('/api/events', require('./routes/events'))
// CRUD: Eventos


// Escuchar peticiones
const port = 4000
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${ port }`);
});
