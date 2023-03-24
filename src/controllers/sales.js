const salesService = require('../services/sales');

const insertSales = async (req, res, next) => {
  try {
    const salesArray = req.body;
    const NewSale = await salesService.insertSales(salesArray);
    res.status(201).json(NewSale);
  } catch (error) {
    next(error);
  }
};

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesById = await salesService.getSalesById(id);
    res.status(200).json(salesById);
  } catch (error) {
    next(error);
  }
};

const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.deleteSales(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesArray = req.body;
    const updatedSale = await salesService.updateSales(salesArray, id);
    res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertSales,
  getSales,
  getSalesById,
  deleteSales,
  updateSales };