import nodemailer from "nodemailer";

/* =========================
   GENERATE OTP
========================= */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* =========================
   MAIL TRANSPORTER
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   SEND OTP EMAIL
========================= */
export const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    console.log("📧 OTP sent to:", email);
  } catch (err) {
    console.log("❌ Email Error:", err.message);
  }
};