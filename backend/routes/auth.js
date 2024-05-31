/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express') // esto es bueno ponerlo porque asi no lo carga dos veces
const router = Router();

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authControllers')
const { validarJWT } = require('../middlewares/validarJwt');


router.post(
    '/register', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/', 
    [// middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);


router.get('/renew', validarJWT, revalidarToken); // vuelve a actualizar el token para añadir otras tres horas al usuario

module.exports = router; 
/* router.post('/register', (req, res) => {
    
   res.json( {
    ok: true,
    msg: 'registro'
   })
})   */

