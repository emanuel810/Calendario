const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true // evitar duplicados
    },
    password: {
        type: String,
        require: true
    }
});


module.exports = model('Usuario', UsuarioSchema );

