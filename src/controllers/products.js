const productsService = require('../services/products');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
res.status(200).json(products);
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

const insertProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const NewProduct = await productsService.insertProduct(name);
    res.status(201).json(NewProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const product = await productsService.updateProduct(id, name);
  return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
};