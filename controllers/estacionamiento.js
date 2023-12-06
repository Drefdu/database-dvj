const estacionamientoModelo = require('../models/estacionamiento')

exports.getEstacionamiento = async (req, res) => {
  try {
    const estacionamientos = await estacionamientoModelo.find();
    if(!estacionamientos){
      res.status(404).json({msg: "hubo un error"});
    }
    res.send(estacionamientos);
  } catch (error) {
    console.log(error);
  }
}

exports.addEstacionamiento = async (req, res) => {
  try {
    let estacionamiento = new estacionamientoModelo(req.body);
    await estacionamiento.save();
    res.send('Registro agregado exitosamente')

  } catch (error) {
    console.log(error);
  }
}

exports.updateEstacionamiento = async (req, res) => {
  try {
    const { estado, favorito } = req.body;
    let estacionamiento = await estacionamientoModelo.findById(req.params._id);
    if (!estacionamiento) {
      res.status(404).json({msg: "hubo un error"});
    }
    estacionamiento.estado = estado;
    estacionamiento.favorito = favorito;

    estacionamiento = await estacionamientoModelo.findOneAndUpdate({_id: req.params._id}, estacionamiento, {new: true})
    res.json(estacionamiento);
  } catch (error) {
    console.log(error);
  }
}