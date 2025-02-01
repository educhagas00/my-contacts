const express = require('express'); // não precisa de caminho relativo
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json()); // middleware que passa body parser para JSON

app.use(routes); // para usar as rotas

// Error Handler: manipulador de erros (middleware)
// evita repetição de try-catch em todos os controllers
// o quarto argumento (error) define que é um middleware de tratamento de erros. ele PRECISA ter 4 argumentos
app.use((error, request, response, next) => {
  // imprime o erro no console e retorna apenas status 500 (erro interno do servidor)
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
