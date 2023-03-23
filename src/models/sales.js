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
const query = `SELECT * 
FROM StoreManager.sales AS s 
JOIN StoreManager.sales_products AS sp 
ON s.id = sp.sale_id; `;
  const [sales] = await connection.execute(query);
  return sales;
};

module.exports = {
  insertSales,
  getSales };
