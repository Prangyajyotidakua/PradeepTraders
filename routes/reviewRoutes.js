
// import express from "express";
// import upload from "../middleware/upload.js";
// import Review from "../models/Review.js";

// const router = express.Router();

// // GET ALL REVIEWS
// router.get("/", async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ createdAt: -1 });
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ADD REVIEW (ONLY 1 IMAGE)
// router.post("/", upload.single("carImg"), async (req, res) => {
//   try {
//     const review = await Review.create({
//       name: req.body.name,
//       role: req.body.role,
//       message: req.body.message,
//       carImg: req.file
//         ? `http://localhost:5000/uploads/${req.file.filename}`
//         : "",
//     });

//     res.status(201).json(review);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import Review from "../models/Review.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* ========= MULTER MEMORY ========= */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ========= GET ALL REVIEWS ========= */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ========= ADD REVIEW ========= */
router.post("/", upload.single("carImg"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "reviews" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const review = await Review.create({
      name: req.body.name,
      role: req.body.role,
      message: req.body.message,
      carImg: imageUrl,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ========= DELETE REVIEW ========= */
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ msg: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;