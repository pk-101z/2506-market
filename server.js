import app from "./app.js";
import client from "./db/client.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to database");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();