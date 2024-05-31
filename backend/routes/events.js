/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventsControllers');


const router = Router();

router.use( validarJWT ); // al hacer esto cualquier peticion que este debajo tendra que validar su token

router.get('/', getEventos );

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio obligatoria').custom( isDate ), // apuntes de este helper
        check('end','Fecha de finalización obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

router.put('/:id', actualizarEvento );

router.delete('/:id', eliminarEvento );

module.exports = router;