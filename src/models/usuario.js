const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN', 'RECEPCION', 'VETERINARIO', 'GROOMER'],
    message: '{VALUE} no es un rol valido '
};

const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    user: { type: String, required: [true, 'Mombre de usuario es necesario'], unique: true },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, { messaje: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);