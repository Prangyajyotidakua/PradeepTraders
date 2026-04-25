
import express from "express";
import upload from "../middleware/upload.js";
import Review from "../models/Review.js";

const router = express.Router();

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD REVIEW (ONLY 1 IMAGE)
router.post("/", upload.single("carImg"), async (req, res) => {
  try {
    const review = await Review.create({
      name: req.body.name,
      role: req.body.role,
      message: req.body.message,
      carImg: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "",
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;