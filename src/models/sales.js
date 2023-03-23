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
  console.log(salesById);
  return camelize(salesById);
};

module.exports = {
  insertSales,
  getSales,
  getSalesById };
