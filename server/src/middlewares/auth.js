// src/middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ➡️ Authenticate JWT token
export const authenticate = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token provided" });

    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // find user by ID
    const user = await User.findById(payload.id).select("-password"); // exclude password
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ➡️ Role-based access
export const permit = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (allowedRoles.includes(req.user.role)) return next();
  return res.status(403).json({ error: "Forbidden" });
};
