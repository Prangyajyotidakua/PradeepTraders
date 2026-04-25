
// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const router = express.Router();

// const JWT_SECRET = "SECRET_KEY";

// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // 🔥 STEP 1: hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🔥 STEP 2: CREATE USER (THIS IS CRITICAL PART)
//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword, // ✅ MUST BE HERE
//       signupOtp: Math.floor(100000 + Math.random() * 900000).toString(),
//       signupOtpExpiry: Date.now() + 5 * 60 * 1000,
//       isVerified: false,
//     });

//     console.log("USER CREATED:", user);

//     res.json({ msg: "OTP sent for signup" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    VERIFY SIGNUP OTP
// ========================= */
// router.post("/verify-signup", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     if (!otp) {
//       return res.status(400).json({ msg: "OTP required" });
//     }

//     if (String(user.signupOtp) !== String(otp)) {
//       return res.status(400).json({ msg: "Invalid OTP" });
//     }

//     if (!user.signupOtpExpiry || user.signupOtpExpiry < Date.now()) {
//       return res.status(400).json({ msg: "OTP expired" });
//     }

//     user.signupOtp = null;
//     user.signupOtpExpiry = null;
//     user.isVerified = true;

//     await user.save();

//     res.json({ msg: "Account verified successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    LOGIN (SEND OTP)
// ========================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("LOGIN REQUEST:", req.body);

//     if (!email || !password) {
//       return res.status(400).json({ msg: "Email and password required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     if (!user.isVerified) {
//       return res.status(400).json({ msg: "Please verify signup first" });
//     }

//     // 🔥 FIX: prevent bcrypt crash
//     if (!user.password) {
//       return res.status(400).json({ msg: "User password missing in DB" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Wrong password" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.loginOtp = otp;
//     user.loginOtpExpiry = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     console.log("LOGIN OTP:", otp);

//     res.json({ msg: "OTP sent for login" });
//   } catch (err) {
//     console.log("LOGIN ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    VERIFY LOGIN OTP
// ========================= */
// // router.post("/verify-login", async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({ msg: "User not found" });
// //     }

// //     if (!otp) {
// //       return res.status(400).json({ msg: "OTP required" });
// //     }

// //     if (String(user.loginOtp) !== String(otp)) {
// //       return res.status(400).json({ msg: "Invalid OTP" });
// //     }

// //     if (!user.loginOtpExpiry || user.loginOtpExpiry < Date.now()) {
// //       return res.status(400).json({ msg: "OTP expired" });
// //     }

// //     user.loginOtp = null;
// //     user.loginOtpExpiry = null;

// //     await user.save();

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     res.cookie("token", token, {
// //       httpOnly: true,
// //       secure: false,
// //       sameSite: "lax",
// //       maxAge: 24 * 60 * 60 * 1000,
// //     });

// //     res.json({
// //       msg: "Login successful",
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: err.message });
// //   }
// //   console.log("BODY:", req.body);
// // console.log("EMAIL:", req.body.email);
// // console.log("PASSWORD:", req.body.password);
// // console.log("USER:", user);
// // console.log("DB PASSWORD:", user?.password);
// // });

// router.post("/verify-login", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ msg: "User not found" });

//     if (String(user.loginOtp) !== String(otp)) {
//       return res.status(400).json({ msg: "Invalid OTP" });
//     }

//     if (!user.loginOtpExpiry || user.loginOtpExpiry < Date.now()) {
//       return res.status(400).json({ msg: "OTP expired" });
//     }

//     user.loginOtp = null;
//     user.loginOtpExpiry = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       "SECRET_KEY",
//       { expiresIn: "1d" }
//     );

//     // ✅ COOKIE
//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//     });

//     // ✅ ALSO SEND TOKEN + USER
//     res.json({
//       msg: "Login successful",
//       token, // 🔥 IMPORTANT
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    LOGOUT
// ========================= */
// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.json({ msg: "Logged out successfully" });
// });

// /* =========================
//    MAKE ADMIN
// ========================= */
// router.put("/make-admin/:email", async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { email: req.params.email },
//       { role: "admin" },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.json({ msg: "User promoted to admin", user });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateOTP, sendOTPEmail } from "../config/otp.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

/* =========================
   SIGNUP (SEND OTP)
========================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    await sendOTPEmail(email, otp);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      signupOtp: otp,
      signupOtpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    });

    res.json({ msg: "OTP sent to email for verification" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   VERIFY SIGNUP OTP
========================= */
router.post("/verify-signup", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    if (!otp) return res.status(400).json({ msg: "OTP required" });

    if (String(user.signupOtp) !== String(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (user.signupOtpExpiry < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    user.isVerified = true;
    user.signupOtp = null;
    user.signupOtpExpiry = null;

    await user.save();

    res.json({ msg: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   LOGIN (SEND OTP)
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Verify account first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const otp = generateOTP();

    await sendOTPEmail(email, otp);

    user.loginOtp = otp;
    user.loginOtpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    res.json({ msg: "OTP sent to email for login" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   VERIFY LOGIN OTP
========================= */
router.post("/verify-login", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    if (String(user.loginOtp) !== String(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (user.loginOtpExpiry < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    user.loginOtp = null;
    user.loginOtpExpiry = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   LOGOUT
========================= */
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
});

/* =========================
   MAKE ADMIN
========================= */
router.put("/make-admin/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { role: "admin" },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User is now admin", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;