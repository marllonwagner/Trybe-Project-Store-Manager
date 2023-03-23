const express = require('express');

const app = express();

app.use(express.json());

const { isNameValid, isProdAndQuantValid,
  isQuantValid, isProdIdValid } = require('./middlewares/index');
const productsController = require('./controllers/products');
const salesController = require('./controllers/sales');
const errorHandler = require('./middlewares/errorHandler');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);
app.post('/products', isNameValid, productsController.insertProduct);
app.post('/sales', isProdAndQuantValid, isQuantValid, isProdIdValid, salesController.insertSales);

app.use(errorHandler);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;