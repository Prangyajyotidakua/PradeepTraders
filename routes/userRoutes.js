// import express from "express";
// import User from "../models/User.js";
// import { protect } from "../middleware/auth.js";

// const router = express.Router();


// /* =========================
//    ADD TO WISHLIST ❤️
// ========================= */
// router.post("/wishlist/:carId", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user.wishlist.includes(req.params.carId)) {
//       user.wishlist.push(req.params.carId);
//     }

//     await user.save();

//     res.json({ msg: "Added to wishlist", wishlist: user.wishlist });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    ADD TO CART 🛒
// ========================= */
// router.post("/cart/:carId", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user.cart.includes(req.params.carId)) {
//       user.cart.push(req.params.carId);
//     }

//     await user.save();

//     res.json({ msg: "Added to cart", cart: user.cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    GET WISHLIST ❤️
// ========================= */
// router.get("/wishlist", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate("wishlist");

//     res.json(user.wishlist);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    REMOVE FROM WISHLIST ❌
// ========================= */
// router.delete("/wishlist/:carId", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     user.wishlist = user.wishlist.filter(
//       (id) => id.toString() !== req.params.carId
//     );

//     await user.save();

//     res.json({ msg: "Removed from wishlist" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    GET CART 🛒
// ========================= */
// router.get("/cart", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate("cart");
//     res.json(user.cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    REMOVE FROM CART ❌
// ========================= */
// router.delete("/cart/:carId", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     user.cart = user.cart.filter(
//       (id) => id.toString() !== req.params.carId
//     );

//     await user.save();

//     res.json({ msg: "Removed from cart" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* =========================
   ADD TO WISHLIST ❤️
========================= */
router.post("/wishlist/:carId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.wishlist.includes(req.params.carId)) {
      user.wishlist.push(req.params.carId);
    }

    await user.save();

    res.json({ msg: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ADD TO CART 🛒
========================= */
router.post("/cart/:carId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.cart.includes(req.params.carId)) {
      user.cart.push(req.params.carId);
    }

    await user.save();

    res.json({ msg: "Added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET WISHLIST ❤️
========================= */
router.get("/wishlist", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   REMOVE FROM WISHLIST ❌
========================= */
router.delete("/wishlist/:carId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.carId
    );

    await user.save();

    res.json({ msg: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET CART 🛒
========================= */
router.get("/cart", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   REMOVE FROM CART ❌
========================= */
router.delete("/cart/:carId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter(
      (id) => id.toString() !== req.params.carId
    );

    await user.save();

    res.json({ msg: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;