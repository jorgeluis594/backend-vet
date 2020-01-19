mascotaconst mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agresividadMAscota = {
    values: ['Agresivo', 'Tranquilo', 'Docil'],
    message: '{VALUE} no es un termino valido'
}

const MascotaSchema = new Schema({

    //datos del dueño
    nombrecli: { type: String, required: true },
    iddueno: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    celular: { type: Number, required: true },
    //datos de la mascota
    nombremasco: { type: String, required: true },
    nacimiento: { type: Date, required: true },
    raza: { type: String, required: true },
    historia: { type: Number, required: true },
    agresividad: { type: String, required: false, enum: agresividadMAscota },
    peso: { type: Number, required: true },
    sexo: { type: String, required: true },
    date: { type: Date, default: Date.now },
    alergias: []
});

module.exports = mongoose.model('Mascota', MascotaSchema);