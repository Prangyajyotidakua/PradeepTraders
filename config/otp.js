// import nodemailer from "nodemailer";

// /* =========================
//    GENERATE OTP
// ========================= */
// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// /* =========================
//    MAIL TRANSPORTER
// ========================= */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /* =========================
//    SEND OTP EMAIL
// ========================= */
// export const sendOTPEmail = async (email, otp) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is: ${otp}`,
//     });

//     console.log("📧 OTP sent to:", email);
//   } catch (err) {
//     console.log("❌ Email Error:", err.message);
//   }
// };

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
  tls: {
    rejectUnauthorized: false,
  },
});

/* =========================
   SEND OTP EMAIL
========================= */
export const sendOTPEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Your OTP Code</h2>
          <p style="font-size: 18px;">
            <b>${otp}</b>
          </p>
          <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    console.log("📧 OTP sent successfully to:", email);
    return info;
  } catch (err) {
    console.error("❌ OTP Email Error:", err.message);

    // IMPORTANT: throw error so backend knows email failed
    throw new Error("Failed to send OTP email");
  }
};