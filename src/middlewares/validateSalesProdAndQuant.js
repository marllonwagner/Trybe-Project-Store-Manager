const httpErrGenerator = (status, message) => ({ status, message });

const isProdAndQuantValid = (req, _res, next) => {
  const salesArray = req.body;
for (let index = 0; index < salesArray.length; index += 1) {
  if (!('productId' in salesArray[index])) {
    throw httpErrGenerator(400, '"productId" is required');
  }
  if (!('quantity' in salesArray[index])) {
    throw httpErrGenerator(400, '"quantity" is required');
  }
}

  return next();
};

module.exports = isProdAndQuantValid;