const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async (salesArray) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(query);

  await Promise.all(salesArray.map((e) => {
    const query2 = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity )
     VALUES (?, ?, ?)`;
   return connection.execute(query2, [insertId, e.productId, e.quantity]);
  }));

  return insertId;
};

const getSales = async () => {
  const query = `SELECT s.date, sp.*
FROM StoreManager.sales AS s 
JOIN StoreManager.sales_products AS sp 
ON s.id = sp.sale_id; `;
  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const getSalesById = async (id) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity
FROM StoreManager.sales AS s 
JOIN StoreManager.sales_products AS sp 
ON s.id = sp.sale_id
WHERE sp.sale_id = (?);`;
  const [salesById] = await connection.execute(query, [id]);
  return camelize(salesById);
};

const deleteSales = async (id) => {
  const query = `DELETE FROM StoreManager.sales
  WHERE id = (?)`;
  const query2 = `DELETE FROM StoreManager.sales_products
  WHERE sale_id = (?)`;
  const [response1] = await connection.execute(query, [id]);
  const [response2] = await connection.execute(query2, [id]);

  return response1.affectedRows + response2.affectedRows;
};

const updateSales = async (salesArray, id) => {
  const [[result]] = await Promise.all(salesArray.map((e) => {
  const query = `UPDATE StoreManager.sales_products SET quantity = (?)
   WHERE product_id = (?)
    AND sale_id = (?);`;
  const response = connection.execute(query, [e.quantity, e.productId, id]);
    return response;
}));
  return result.affectedRows;
};

module.exports = {
  insertSales,
  getSales,
  getSalesById,
  deleteSales,
  updateSales };
