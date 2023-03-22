const connection = require('../models/connection');

const getAllIds = async () => {
  const query = 'SELECT product_id FROM StoreManager.sales_products;;';
  const [productsIds] = await connection.execute(query);
  const idsArr = productsIds.map((product) => product.product_id);
  return idsArr;
};

const isProdIdValid = async (req, res, next) => {
  const salesArray = req.body;
  const ids = await getAllIds();
  for (let index = 0; index < salesArray.length; index += 1) {
    if (!(salesArray[index].productId in ids)) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }
  
  return next();
};

module.exports = isProdIdValid;