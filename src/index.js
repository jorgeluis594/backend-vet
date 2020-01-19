const app = require('express')();
const bodyparse = require('body-parser');
const cors = require('cors');

// Inicializando
require('./database');

//body parse
app.use(bodyparse.urlencoded({ extended: false }));
app.use(bodyparse.json());

// Configuraciones
app.set('port', process.env.PORT || 3000);

//importando rutas
const userRutas = require('./routes/usuarios');
const clientesRutas = require('./routes/clientes');
const mascotasRutas = require('./routes/mascotas');

app.use(cors());
// Usando rutas
app.use('/usuarios', userRutas);
app.use('/clientes', clientesRutas);
app.use('/mascotas', mascotasRutas);

// Iniciando server
app.listen(app.get('port'), () => {
    console.log('Server iniciado en el puerto: ', app.get('port'));
});