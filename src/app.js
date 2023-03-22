const express = require('express');
const isNameValid = require('./middlewares/index');

const app = express();

app.use(express.json());

const productsController = require('./controllers/products');
const errorHandler = require('./middlewares/errorHandler');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', isNameValid, productsController.insertProduct);
app.post('/sales');

app.use(errorHandler);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;