const salesService = require('../services/sales');

const insertSales = async (req, res, next) => {
  try {
    const { salesArray } = req.body;
    const NewSale = await salesService.insertSales(salesArray);
    res.status(201).json(NewSale);
  } catch (error) {
    next(error);
  }
};

module.exports = insertSales;