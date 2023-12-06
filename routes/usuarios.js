const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuarios');


router.get('/:id',usuario.usuariosGet)
router.put('/:id',usuario.usuariosPut)
router.post('/',usuario.usuariosPost)
router.delete('/:id',usuario.usuariosDelete)

router.post('/login',usuario.usuariosLogin)

module.exports = router;