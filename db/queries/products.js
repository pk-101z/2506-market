import client from "../client.js";

export async function getAllProducts() {
  const { rows } = await client.query("SELECT * FROM products");
  return rows;
}

export async function getProductById(id) {
  const { rows } = await client.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );
  return rows[0];
}

export async function getOrdersByProduct(productId, userId) {
  const { rows } = await client.query(
    `SELECT o.id AS order_id, o.date
     FROM orders o
     JOIN orders_products op ON o.id = op.order_id
     WHERE op.product_id=$1 AND o.user_id=$2`,
    [productId, userId]
  );
  return rows;
}
