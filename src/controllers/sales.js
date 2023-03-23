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

module.exports = {
  insertSales,
  getSales };