const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}); 
// este código modifica la representación JSON de los objetos creados a partir del esquema de evento,
// eliminando las propiedades __v y _id y reemplazando _id con id en la salida JSON. 
// Esto puede ser útil, por ejemplo, si se quiere ocultar ciertas propiedades o
// cambiar su nombre en la salida JSON de un objeto mongoose creado a partir de este esquema.
 


module.exports = model('Evento', EventoSchema );

