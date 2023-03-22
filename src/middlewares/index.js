const isNameValid = require('./validateProductName');
const isProdAndQuantValid = require('./validateSalesProdAndQuant');
const isQuantValid = require('./validateQuantity');
const isProdIdValid = require('./validateProdId');

module.exports = {
  isNameValid,
  isProdAndQuantValid,
  isQuantValid,
  isProdIdValid,
};