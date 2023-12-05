const mongoose = require('mongoose');

const estacionamientoShema = mongoose.Schema({
  estacionamiento: {
    type: String,
    required: true
  },
  seccion: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  favorito: {
    type: Boolean,
    default: false,
    required: false
  }
});

module.exports = mongoose.model('estacionamiento', estacionamientoShema);