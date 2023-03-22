const connection = require('../models/connection');

const httpErrGenerator = (status, message) => ({ status, message });

const getAllIds = async () => {
  const query = 'SELECT product_id FROM StoreManager.sales_products;;';
  const [productsIds] = await connection.execute(query);
  return productsIds;
};

const isProdIdValid = (req, _res, next) => {
  const salesArray = req.body;
  const ids = getAllIds();
  for (let index = 0; index < salesArray.length; index += 1) {
    if (!(salesArray[index].productId in ids)) {
      throw httpErrGenerator(404, 'Product not found');
    }
  }
  
  return next();
};

// !(getById(salesArray[index].productId))

module.exports = isProdIdValid;