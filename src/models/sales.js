const connection = require('./connection');

const insertSales = async (salesArray) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(query);

  salesArray.map(async (e) => {
    const query2 = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity )
     VALUES (?, ?, ?)`;
    await connection.execute(query2, [insertId, e.productId, e.quantity]);
  });

  return insertId;
};

module.exports = { insertSales };