const productsModel = require('../models/products');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
  };

  module.exports = getAll;