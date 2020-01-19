const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const clienteSchema = new Schema({
    nombrecli: { type: String, required: [true, "Nombre de cliente es necesario"] },
    dni: { type: Number, required: [true, "DNI de cliente es necesario"], unique: true },
    telefono: { type: Number, required: false },
    celular: { type: Number, required: true },
    email: { type: String, required: false },
    distrito: { type: String, required: [true, "Distrito de cliente es necesario"] },
    direccion: { type: String, required: [true, "Direccion de cliente es necesario"] },
    date: { type: Date, default: Date.now }
});

clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Cliente', clienteSchema);