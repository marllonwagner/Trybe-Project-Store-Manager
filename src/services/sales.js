const salesModel = require('../models/sales');

const insertSales = async (salesArray) => {
  const id = await salesModel.insertSales(salesArray);
  return { id, itemsSold: salesArray };
};

module.exports = insertSales;