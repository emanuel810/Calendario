const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => { 

    // manejo de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next(); // se utiliza para indicarle a Express que la función validarCampos ha terminado de manejar la solicitud actual
}

module.exports = {
    validarCampos
}