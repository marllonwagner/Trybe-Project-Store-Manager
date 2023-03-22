const httpErrGenerator = (status, message) => ({ status, message });

const isNameValid = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    throw httpErrGenerator(400, '"name" is required');
  }
  if (name.length < 5) {
    throw httpErrGenerator(422, '"name" length must be at least 5 characters long');
  }
  return next();
};

module.exports = isNameValid;