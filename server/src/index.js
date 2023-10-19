const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importa el middleware CORS
const carRouter = require('./routes/car.js'); 
const app = express();

app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configura CORS para permitir solicitudes desde cualquier origen (*)
app.use(cors());

app.use('/api', carRouter);

app.listen(app.get('port'), () => {
  console.log(`El servidor está funcionando en el puerto ${app.get('port')}`);
});
