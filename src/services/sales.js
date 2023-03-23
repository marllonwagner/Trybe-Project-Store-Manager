const salesModel = require('../models/sales');

const httpErrGenerator = (status, message) => ({ status, message });

const insertSales = async (salesArray) => {
  const id = await salesModel.insertSales(salesArray);
  return { id, itemsSold: salesArray };
};

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

const getSalesById = async (id) => {
  const saleById = await salesModel.getSalesById(id);
  if (!saleById || saleById < 1) {
    throw httpErrGenerator(404, 'Sale not found');
  }
  return saleById;
};

const deleteSales = async (id) => {
  const response = await salesModel.deleteSales(id);
  if (response === 0) {
    throw httpErrGenerator(404, 'Sale not found');
  }
};

module.exports = {
  insertSales,
  getSales,
  getSalesById,
  deleteSales,
  httpErrGenerator };