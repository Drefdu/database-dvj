const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema=mongoose.Schema({
    
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    turno:{
        type:String,
        required:[true, 'El turno es obligatorio']
    }
})

//Encriptacion de contraseñas
UsuarioSchema.pre('save', function (next) {

    const user = this;
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
});

module.exports = mongoose.model('usuarios', UsuarioSchema);