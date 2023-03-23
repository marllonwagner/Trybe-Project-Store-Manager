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
  const id = await productsModel.insertProduct(name);
  return { id, name };
};

const updateProduct = async (id, name) => {
  const product = await productsModel.updateProduct(id, name);
  if (product === 0) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct };