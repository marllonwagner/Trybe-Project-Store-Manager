const connection = require('./connection');

const insertSales = async (salesArray) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(query);

  salesArray.map(async (e) => {
    const query2 = 'INSERT INTO StoreManager.sales_products (product_id, quantity ) VALUES (? , ?)';
    await connection.execute(query2, [e.productid, e.quantity]);
  });

  return insertId;
};

module.exports = insertSales;