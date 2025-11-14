import express from "express";
import requireUser from "../middleware/requireUser.js";
import { getAllProducts, getProductById, getOrdersByProduct } from "../db/queries/products.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try { res.json(await getAllProducts()); } 
  catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) { next(err); }
});

router.get("/:id/orders", requireUser, async (req, res, next) => {
  try { res.json(await getOrdersByProduct(req.params.id, req.user.id)); } 
  catch (err) { next(err); }
});

export default router;