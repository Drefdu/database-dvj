const express = require('express');
const router = express.Router();
const estacionamiento = require('../controllers/estacionamiento');

router.get('/', estacionamiento.getEstacionamiento);
router.post('/', estacionamiento.addEstacionamiento);
router.put('/:_id', estacionamiento.updateEstacionamiento);




module.exports = router;