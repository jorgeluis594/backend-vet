const app = require('express')();
const Mascota = require('../models/mascotas');
const Cliente = require('../models/clientes');

//--------------------------------------------------------
// Obtener todas las mascotas
//--------------------------------------------------------
app.get('/', (req, res) => {

    Mascota.find({}, (err, MascotasTotal) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problemas con el servidor',
                errors: err
            });
        }
        console.log(MascotasTotal);
        if (!MascotasTotal) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encontro mascotas'
            });
        }
        res.status(200).json({
            ok: true,
            Mascotas: MascotasTotal
        });
    });
});

//--------------------------------------------------------
// Obtener mascotas por dueño
//--------------------------------------------------------

app.get('/cliente/:id', (req, res) => {

    const idcli = req.params.id;
    Mascota.find({ iddueno: idcli }, (err, MascotasxCliente) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problemas con el servidor',
                errors: err
            });
        }

        if (!MascotasxCliente) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encontro Mascotas',
            });
        }

        res.status(200).json({
            ok: true,
            mascotas: MascotasxCliente
        });
    });
});

//--------------------------------------------------------
// Obtener Mascota
//--------------------------------------------------------

app.get('/:id', (req, res) => {

    const id = req.params.id;
    Mascota.findById(id, (err, Mascotaxid) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problemas con el servidor',
                errors: err
            });
        }
        if (!Mascotaxid) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encontro Mascota',
            });
        }
        res.status(200).json({
            ok: true,
            mascota: Mascotaxid
        });
    });
});

//--------------------------------------------------------
// Agregando Mascotas
//--------------------------------------------------------
app.post('/', (req, res) => {
    const body = req.body;



    Cliente.findById(body.idcli, (err, ClienteEncontrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problemas con el servidor',
                errors: err
            });
        }
        if (!ClienteEncontrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encontro Cliente',
            });
        }
        console.log(ClienteEncontrado);
        const newMascota = new Mascota({
            nombrecli: ClienteEncontrado.nombrecli,
            iddueno: ClienteEncontrado._id,
            celular: ClienteEncontrado.celular,
            nombremasco: body.nombre,
            nacimiento: body.nacimiento,
            raza: body.raza,
            agresividad: body.agresividad,
            peso: body.peso,
            sexo: body.sexo,
        });
        newMascota.save((err, MascotaCreada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Problemas con el servidor',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                mascota: MascotaCreada
            });
        });
    });
});

//--------------------------------------------------------
// Actualizar mascota
//--------------------------------------------------------

app.put('/:id', (req, res) => {

    const id = req.params.id;
    const body = req.body;

    Mascota.findById(id, (err, MascotaEncontrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problemas con el servidor',
                errors: err
            });
        }
        if (!MascotaEncontrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encontro Mascota',
            });
        }

        MascotaEncontrada.nombremasco = body.nombre;
        MascotaEncontrada.nacimiento = body.nacimiento;
        MascotaEncontrada.raza = body.raza;
        MascotaEncontrada.agresividad = body.agresividad;
        MascotaEncontrada.peso = body.peso;

        MascotaEncontrada.save((err, MascotaActualizada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Problemas con el servidor',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                mascota: MascotaActualizada
            });
        });
    });
});


module.exports = app;