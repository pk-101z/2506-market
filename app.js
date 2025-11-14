import express from "express";
import bodyParser from "body-parser";

import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";

import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.use(errorHandler);

export default app;