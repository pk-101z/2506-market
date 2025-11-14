import client from "./client.js";
import bcrypt from "bcrypt";

async function seed() {
  await client.connect();

  // Create user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const { rows: [user] } = await client.query(
    "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
    ["testuser", hashedPassword]
  );

  // Create 10 products
  const products = [];
  for (let i = 1; i <= 10; i++) {
    const { rows: [product] } = await client.query(
      "INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *",
      [`Product ${i}`, `Description for product ${i}`, i * 10]
    );
    products.push(product);
  }

  // Create an order
  const { rows: [order] } = await client.query(
    "INSERT INTO orders(user_id) VALUES($1) RETURNING *",
    [user.id]
  );

  // Add 5 products to the order
  for (let i = 0; i < 5; i++) {
    await client.query(
      "INSERT INTO orders_products(order_id, product_id, quantity) VALUES($1, $2, $3)",
      [order.id, products[i].id, i + 1]
    );
  }

  console.log("Seeding complete");
  await client.end();
}

seed();