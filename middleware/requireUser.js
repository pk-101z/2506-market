import { verifyJWT } from "../utils/jwt.js";

export function requireUser(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = auth.split(" ")[1];
    const payload = verifyJWT(token);
    req.user = payload; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}