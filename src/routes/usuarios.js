const app = require('express')();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

//--------------------------------------------------------
// Obtener usuarios
//--------------------------------------------------------

app.get('/', (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });
    });
});


module.exports = app;