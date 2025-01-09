const express = require('express'); // não precisa de caminho relativo

const routes = require('./routes');

const app = express();

app.use(routes); // para usar as rotas

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
