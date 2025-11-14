import client from "../client.js";

export async function createUser(username, hashedPassword) {
  const { rows } = await client.query(
    "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id, username",
    [username, hashedPassword]
  );
  return rows[0];
}

export async function getUserByUsername(username) {
  const { rows } = await client.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );
  return rows[0];
}

export async function getUserById(id) {
  const { rows } = await client.query(
    "SELECT id, username FROM users WHERE id=$1",
    [id]
  );
  return rows[0];
}