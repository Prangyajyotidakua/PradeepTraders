// // import express from "express";
// // import mongoose from "mongoose";
// // import upload from "../middleware/upload.js";
// // import Car from "../models/Car.js";
// // import fs from "node:fs";

// // const router = express.Router();

// // /* =========================
// //    GET ALL CARS
// // ========================= */
// // router.get("/", async (req, res) => {
// //   try {
// //     const cars = await Car.find().sort({ createdAt: -1 });
// //     res.json(cars);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /* =========================
// //    ADMIN ROUTE (MUST BE BEFORE :id)
// // ========================= */
// // router.get("/admin", async (req, res) => {
// //   try {
// //     const cars = await Car.find().sort({ createdAt: -1 });
// //     res.json(cars);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /* =========================
// //    GET SINGLE CAR (DETAIL PAGE)
// // ========================= */
// // router.get("/:id", async (req, res) => {
// //   try {
// //     // safety check (prevents crash)
// //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
// //       return res.status(400).json({ msg: "Invalid car ID" });
// //     }

// //     const car = await Car.findById(req.params.id);

// //     if (!car) {
// //       return res.status(404).json({ msg: "Car not found" });
// //     }

// //     res.json(car);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /* =========================
// //    ADD CAR (MULTIPLE IMAGES)
// // ========================= */
// // router.post("/add", upload.array("images", 10), async (req, res) => {
// //   try {
// //     const imageUrls = req.files.map(
// //       (file) => `http://localhost:5000/uploads/${file.filename}`
// //     );

// //     const car = await Car.create({
// //       ...req.body,
// //       sold: req.body.sold === "true",
// //       images: imageUrls,
// //     });

// //     res.json({ msg: "Car added", car });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /* =========================
// //    DELETE CAR (FIXED)
// // ========================= */
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
// //       return res.status(400).json({ msg: "Invalid car ID" });
// //     }

// //     const car = await Car.findById(req.params.id);

// //     if (!car) {
// //       return res.status(404).json({ msg: "Car not found" });
// //     }

// //     // ✅ DELETE IMAGES SAFELY
// //     if (car.images && car.images.length > 0) {
// //       car.images.forEach((img) => {
// //         const filePath = img.replace("http://localhost:5000/", "");

// //         try {
// //           fs.unlinkSync(filePath); // 🔥 FIXED (no async error)
// //         } catch (err) {
// //           console.log("Image delete error:", err.message);
// //         }
// //       });
// //     }

// //     await Car.findByIdAndDelete(req.params.id);

// //     res.json({ msg: "Car deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;

// import express from "express";
// import mongoose from "mongoose";
// import Car from "../models/Car.js";
// import fs from "fs";

// const router = express.Router();

// /* ================= GET ALL ================= */
// router.get("/", async (req, res) => {
//   const cars = await Car.find().sort({ createdAt: -1 });
//   res.json(cars);
// });

// /* =========================
//    ADD CAR (MULTIPLE IMAGES)
// ========================= */
// router.post("/add", upload.array("images", 10), async (req, res) => {
//   try {
//     const imageUrls = req.files.map(
//       (file) => `http://localhost:5000/uploads/${file.filename}`
//     );

//     const car = await Car.create({
//       ...req.body,
//       sold: req.body.sold === "true",
//       images: imageUrls,
//     });

//     res.json({ msg: "Car added", car });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// /* ================= ADMIN ================= */
// router.get("/admin", async (req, res) => {
//   const cars = await Car.find().sort({ createdAt: -1 });
//   res.json(cars);
// });

// /* ================= UPDATE ALL FIELDS ================= */
// router.put("/:id", async (req, res) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ msg: "Invalid car ID" });
//     }

//     const updatedCar = await Car.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           name: req.body.name,
//           company: req.body.company,
//           model: req.body.model,
//           year: req.body.year,
//           price: req.body.price,
//           seats: req.body.seats,
//           fuel: req.body.fuel,
//           speed: req.body.speed,
//           mileage: req.body.mileage,
//           transmission: req.body.transmission,
//           color: req.body.color,
//           owner: req.body.owner,
//           sold: req.body.sold,
//           description: req.body.description,
//           images: req.body.images,
//         },
//       },
//       { new: true }
//     );

//     res.json(updatedCar);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* ================= DELETE ================= */
// router.delete("/:id", async (req, res) => {
//   const car = await Car.findById(req.params.id);

//   if (!car) return res.status(404).json({ msg: "Not found" });

//   await Car.findByIdAndDelete(req.params.id);

//   res.json({ msg: "Deleted" });
// });

// export default router;
import express from "express";
import multer from "multer";
import Car from "../models/Car.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* ================= MULTER MEMORY ================= */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= ADD CAR ================= */
router.post("/add", upload.array("images", 10), async (req, res) => {
  try {
    const imageUrls = [];

    for (let file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "cars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      imageUrls.push(result.secure_url);
    }

    const car = await Car.create({
      ...req.body,
      sold: req.body.sold === "true",
      images: imageUrls,
    });

    res.status(201).json({ msg: "Car added", car });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET SINGLE ================= */
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;