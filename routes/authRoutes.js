// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import { generateOTP, sendOTPEmail } from "../config/otp.js";

// const router = express.Router();

// /* =========================
//    JWT SECRET (FIXED)
// ========================= */
// const JWT_SECRET = process.env.JWT_SECRET;

// /* =========================
//    SIGNUP (SEND OTP)
// ========================= */
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "Required fields missing" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = generateOTP();

//     await sendOTPEmail(email, otp);

//     await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       signupOtp: otp,
//       signupOtpExpiry: Date.now() + 5 * 60 * 1000,
//       isVerified: false,
//     });

//     res.json({ msg: "OTP sent to email for verification" });
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
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     if (!otp) return res.status(400).json({ msg: "OTP required" });

//     if (String(user.signupOtp) !== String(otp)) {
//       return res.status(400).json({ msg: "Invalid OTP" });
//     }

//     if (!user.signupOtpExpiry || user.signupOtpExpiry < Date.now()) {
//       return res.status(400).json({ msg: "OTP expired" });
//     }

//     user.isVerified = true;
//     user.signupOtp = null;
//     user.signupOtpExpiry = null;

//     await user.save();

//     res.json({ msg: "Account verified successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    LOGIN (SEND OTP)
// ========================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: "Email and password required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ msg: "User not found" });

//     if (!user.isVerified) {
//       return res.status(400).json({ msg: "Verify account first" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Wrong password" });
//     }

//     const otp = generateOTP();
//     await sendOTPEmail(email, otp);

//     user.loginOtp = otp;
//     user.loginOtpExpiry = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     res.json({ msg: "OTP sent to email for login" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    VERIFY LOGIN OTP
// ========================= */
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
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.json({
//       msg: "Login successful",
//       token,
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
//   res.json({ msg: "Logged out" });
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

//     if (!user) return res.status(404).json({ msg: "User not found" });

//     res.json({ msg: "User is now admin", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { generateOTP, sendOTPEmail } from "../config/otp.js";

// const router = express.Router();

// /* ================= SIGNUP ================= */
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ msg: "User exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const otp = generateOTP();

//     // 👉 wrap email in try-catch
//     try {
//       await sendOTPEmail(email, otp);
//     } catch (emailErr) {
//       console.error("📧 EMAIL ERROR:", emailErr.message);
//       return res.status(500).json({ msg: "Email sending failed" });
//     }

//     await User.create({
//       name,
//       email,
//       password: hashed,
//       signupOtp: otp,
//       signupOtpExpiry: Date.now() + 5 * 60 * 1000,
//       isVerified: false,
//     });

//     res.json({ msg: "OTP sent to email" });

//   } catch (err) {
//     console.error("🔥 SIGNUP ERROR:", err); // IMPORTANT
//     res.status(500).json({ msg: err.message }); // SHOW REAL ERROR
//   }
// });

// /* ================= VERIFY SIGNUP ================= */
// router.post("/verify-signup", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     if (!user.signupOtp || String(user.signupOtp).trim() !== String(otp).trim()) {
//       return res.status(400).json({ msg: "Invalid OTP" });
//     }

//     if (!user.signupOtpExpiry || user.signupOtpExpiry < Date.now()) {
//       return res.status(400).json({ msg: "OTP expired" });
//     }

//     user.isVerified = true;
//     user.signupOtp = null;
//     user.signupOtpExpiry = null;

//     await user.save();

//     res.json({ msg: "Account verified" });

//   } catch (err) {
//     res.status(500).json({ msg: "Verify signup error" });
//   }
// });

// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: "Wrong password" });

//     const otp = generateOTP();

//     user.loginOtp = otp;
//     user.loginOtpExpiry = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     await sendOTPEmail(email, otp);

//     res.json({ msg: "Login OTP sent" });

//   } catch (err) {
//     res.status(500).json({ msg: "Login error" });
//   }
// });

// /* ================= VERIFY LOGIN ================= */
// router.post("/verify-login", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     if (!user.loginOtp || String(user.loginOtp).trim() !== String(otp).trim()) {
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
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//     });

//     res.json({
//       msg: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });

//   } catch (err) {
//     res.status(500).json({ msg: "Verify login error" });
//   }
// });

// /* ================= LOGOUT (FIXED) ================= */
// router.post("/logout", (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//     });

//     res.json({ msg: "Logged out successfully" });

//   } catch (err) {
//     res.status(500).json({ msg: "Logout error" });
//   }
// });

// export default router;

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/* ================= GENERATE OTP ================= */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

/* ================= SEND EMAIL ================= */
export const sendOTPEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:sans-serif">
          <h2>Pradeep Traders</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", response);
    return response;

  } catch (error) {
    console.error("❌ Email Error:", error);
    throw new Error(error.message || "Email sending failed");
  }
};