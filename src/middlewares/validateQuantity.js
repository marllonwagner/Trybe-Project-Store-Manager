const httpErrGenerator = (status, message) => ({ status, message });

const isQuantValid = (req, _res, next) => {
  const salesArray = req.body;
  for (let index = 0; index < salesArray.length; index += 1) {
    if ((salesArray[index].quantity < 1)) {
      throw httpErrGenerator(422, '"quantity" must be greater than or equal to 1');
    }
  }

  return next();
};

module.exports = isQuantValid;