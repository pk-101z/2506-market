import client from "../client.js";

export async function createOrder(userId) {
  const { rows } = await client.query(
    "INSERT INTO orders(user_id) VALUES($1) RETURNING *",
    [userId]
  );
  return rows[0];
}

export async function getOrdersByUser(userId) {
  const { rows } = await client.query(
    "SELECT * FROM orders WHERE user_id=$1",
    [userId]
  );
  return rows;
}

export async function getOrderById(id) {
  const { rows } = await client.query(
    "SELECT * FROM orders WHERE id=$1",
    [id]
  );
  return rows[0];
}