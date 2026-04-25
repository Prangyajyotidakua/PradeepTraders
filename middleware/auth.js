import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET = "SECRET_KEY";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only" });
  }
  next();
};