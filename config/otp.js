// import nodemailer from "nodemailer";

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const sendOTPEmail = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "OTP Verification",
//     text: `Your OTP is ${otp}`,
//   });
// };

// export { generateOTP, sendOTPEmail };


import nodemailer from "nodemailer";
import dotenv from "dotenv";

// 1. MUST load dotenv in this file to ensure variables aren't undefined
dotenv.config();

// 2. Create a reusable transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 3. Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Mailer Error:", error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pradeep Traders" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Verification Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      html: `<b>Your OTP is: ${otp}</b>`,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ SendMail Error:", error);
    return { success: false, error };
  }
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};