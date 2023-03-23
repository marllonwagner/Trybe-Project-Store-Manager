const salesModel = require('../models/sales');

const insertSales = async (salesArray) => {
  const id = await salesModel.insertSales(salesArray);
  return { id, itemsSold: salesArray };
};

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

module.exports = {
  insertSales,
getSales };