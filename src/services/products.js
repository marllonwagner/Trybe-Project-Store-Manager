const productsModel = require('../models/products');

const httpErrGenerator = (status, message) => ({ status, message });

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};
  
const getByName = async (q) => {
  const product = await productsModel.getByName(q);
  if (q === null) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return product;
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

const deleteProduct = async (id) => {
  const response = await productsModel.deleteProduct(id);
  if (response === 0) {
    throw httpErrGenerator(404, 'Product not found');
  }
};

module.exports = {
  getAll,
  getById,
  getByName,
  insertProduct,
  updateProduct,
  deleteProduct,
  httpErrGenerator };