import client from "../client.js";

export async function addProductToOrder(orderId, productId, quantity) {
  const { rows } = await client.query(
    `INSERT INTO orders_products(order_id, product_id, quantity)
     VALUES($1, $2, $3) RETURNING *`,
    [orderId, productId, quantity]
  );
  return rows[0];
}

export async function getProductsByOrder(orderId) {
  const { rows } = await client.query(
    `SELECT p.*, op.quantity
     FROM products p
     JOIN orders_products op ON p.id = op.product_id
     WHERE op.order_id=$1`,
    [orderId]
  );
  return rows;
}