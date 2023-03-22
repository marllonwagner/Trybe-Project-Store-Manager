const isNameValid = require('./validateProductName');
const isProdAndQuantValid = require('./validateSalesProdAndQuant');
const isQuantValid = require('./validateQuantity');

module.exports = {
  isNameValid,
  isProdAndQuantValid,
  isQuantValid,
};