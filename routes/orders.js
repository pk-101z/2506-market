import express from "express";
import requireUser from "../middleware/requireUser.js";
import { createOrder, getOrdersByUser, getOrderById } from "../db/queries/orders.js";
import { addProductToOrder, getProductsByOrder } from "../db/queries/orderProducts.js";

const router = express.Router();
router.use(requireUser);

router.post("/", async (req, res, next) => {
  try { res.status(201).json(await createOrder(req.user.id)); } 
  catch (err) { next(err); }
});

router.get("/", async (req, res, next) => {
  try { res.json(await getOrdersByUser(req.user.id)); } 
  catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try { res.json(await getOrderById(req.params.id)); } 
  catch (err) { next(err); }
});

router.post("/:id/products", async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    res.json(await addProductToOrder(req.params.id, productId, quantity));
  } catch (err) { next(err); }
});

router.get("/:id/products", async (req, res, next) => {
  try { res.json(await getProductsByOrder(req.params.id)); } 
  catch (err) { next(err); }
});

export default router;