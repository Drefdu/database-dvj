const usuarios = require('../models/usuarios');
const usuariosModelo = require('../models/usuarios')
const bcrypt = require('bcryptjs');


exports.usuariosGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const usuario = await usuariosModelo.findById(id);
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuario de la base de datos'
        });
    }
};

exports.usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    let { nombre, email, password, turno } = req.body;
    
    try {

        // Encriptar la nueva contraseña si se proporciona
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;
        }

        const usuario = await usuariosModelo.findByIdAndUpdate(id, { nombre, email, password, turno }, { new: true });

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        

        res.json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            usuario
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el usuario'
        });
    }
};

exports.usuariosPost = async (req, res = response) => {
    const usuario = new usuarios(req.body);

    try {
        await usuario.save();
        res.json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario en la base de datos'
        });
    }
};

exports.usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await usuariosModelo.findByIdAndDelete(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado exitosamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el usuario'
        });
    }
};

exports.usuariosLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const usuarioEncontrado = await usuariosModelo.findOne({ email: email });
        if (usuarioEncontrado) {
            const contrasenaValida = await bcrypt.compare(password, usuarioEncontrado.password);

            if (contrasenaValida) {
                res.json(usuarioEncontrado);
            } else {
                return res.status(200).json({ msg: 'Contraseña inválida' });
            }
        } else {
            return res.status(200).json({ msg: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};