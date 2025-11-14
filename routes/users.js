import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByUsername } from "../db/queries/users.js";
import { createJWT } from "../utils/jwt.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

router.post("/register", requireBody(["username", "password"]), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashed);
    res.status(201).json(user);
  } catch (err) { next(err); }
});

router.post("/login", requireBody(["username", "password"]), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });
    const token = createJWT({ id: user.id, username: user.username });
    res.json({ token });
  } catch (err) { next(err); }
});

export default router;
