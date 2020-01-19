const app = require('express')();
const Cliente = require('../models/clientes');
//--------------------------------------------------------
// Obtener todos los clientes
//--------------------------------------------------------
app.get('/', (req, res) => {

    Cliente.find({}, (err, clientes) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Problemas con obteniendo datos',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        });
    });
});

//--------------------------------------------------------
// Buscar cliente x id
//--------------------------------------------------------

app.get('/:id', (req, res) => {

    const id = req.params.id;

    Cliente.findById(id, (err, clienteBuscado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al concetar',
                errors: err
            });
        }
        if (!clienteBuscado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Cliente no encontrado',
            });
        }
        res.status(200).json({
            ok: true,
            cliente: clienteBuscado
        });
    });
});
//--------------------------------------------------------
// Buscar cliente x  termino
//--------------------------------------------------------

app.get('buscar/:termino', (req, res) => {

    const termino = req.params.termino;



    Cliente.find({
        $or: [
            { nombrecli: termino },
            { dni: termino },
            { direccion: termino }
        ]
    }, (err, clienteBuscado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al concetar',
                errors: err
            });
        }
        if (!clienteBuscado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Cliente no encontrado',
            });
        }
        res.status(200).json({
            ok: true,
            cliente: clienteBuscado
        });
    });
});

//--------------------------------------------------------
// Crear cliente
//--------------------------------------------------------
app.post('/', (req, res) => {

    const body = req.body;

    const cliente = new Cliente({
        nombrecli: body.nombre,
        dni: body.dni,
        telefono: body.telefono,
        celular: body.celular,
        email: body.email,
        distrito: body.distrito,
        direccion: body.direccion
    });

    cliente.save((err, clienteGuardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error con la base de datos',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            cliente: clienteGuardado
        });
    });

});

//--------------------------------------------------------
// Actualizar Cliente
//--------------------------------------------------------
app.put('/:id', (req, res) => {

    const id = req.params.id;
    const body = req.body;

    Cliente.findById(id, (err, cliente) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problemas al conectar con la bd',
                errors: err
            });
        }
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no existe'
            });
        }
        cliente.nombrecli = body.nombre;
        cliente.dni = body.dni;
        cliente.telefono = body.telefono;
        cliente.celular = body.celular;
        cliente.email = body.email;
        cliente.distrito = body.distrito;
        cliente.direccion = body.direccion;

        cliente.save((err, clienteActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar cliente',
                    errors: err
                });
            }

            res.status(201).json({
                ok: true,
                cliente: clienteActualizado
            });
        });
    });
});

module.exports = app;