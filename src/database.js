const moongose = require('mongoose');

moongose.connect('mongodb://localhost:27017/midogtora', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('base de dato conectada'))
    .catch(err => console.error(err));