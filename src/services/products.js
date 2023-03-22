const productsModel = require('../models/products');

const httpErrGenerator = (status, message) => ({ status, message });

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};
  
const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return product;
};

const insertProduct = async (name) => {
  if (!name || name === '') {
    throw httpErrGenerator(400, 'Product name must exists');
  }
  const id = await productsModel.insertProduct(name);
  return { id, name };
};

module.exports = {
  getAll,
  getById,
insertProduct };