const productsService = require('../services/products');

const getAll = async (_req, res, next) => {
try {
  const products = await productsService.getAll();
res.status(200).json(products);
} catch (error) {
  next(error);
}
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const product = await productsService.getById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById };