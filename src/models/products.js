const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const insertProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [result] = await connection.execute(query, [name]);
  return result.insertId;
};

const updateProduct = async (id, name) => {
  const query = `UPDATE StoreManager.products SET name = (?)
   WHERE id = (?);`;
  const [result] = await connection.execute(query, [name, id]);
  return result.affectedRows;
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM StoreManager.products
  WHERE id = (?)`;
  const [response] = await connection.execute(query, [id]);
  return response.affectedRows;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
};