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


// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// // 1. MUST load dotenv in this file to ensure variables aren't undefined
// dotenv.config();

// // 2. Create a reusable transporter object
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465, 
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // 3. Verify connection configuration on startup
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("❌ Mailer Error:", error);
//   } else {
//     console.log("✅ Server is ready to send emails");
//   }
// });

// export const sendOTPEmail = async (email, otp) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Pradeep Traders" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Verification Code",
//       text: `Your OTP is ${otp}. It expires in 5 minutes.`,
//       html: `<b>Your OTP is: ${otp}</b>`,
//     });
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error("❌ SendMail Error:", error);
//     return { success: false, error };
//   }
// };

// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// export const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// export const sendOTPEmail = async (email, otp) => {
//     await transporter.sendMail({
//         from: `"OTP System" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Your OTP Code",
//         html: `
//        <div style="
//     font-family: Arial, sans-serif;
//     background: #f4f6f8;
//     padding: 40px;
//   ">
//     <div style="
//       max-width: 420px;
//       margin: auto;
//       background: #ffffff;
//       border-radius: 12px;
//       padding: 30px;
//       text-align: center;
//       box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//     ">

//       <h2 style="
//         margin-bottom: 10px;
//         color: #333;
//       ">
//         🔐 Verification Code
//       </h2>

//       <p style="
//         color: #666;
//         font-size: 14px;
//         margin-bottom: 25px;
//       ">
//         Use the OTP below to complete your verification
//       </p>

//       <div style="
//         font-size: 32px;
//         letter-spacing: 6px;
//         font-weight: bold;
//         color: #111;
//         background: #f1f1f1;
//         padding: 15px 20px;
//         border-radius: 8px;
//         display: inline-block;
//       ">
//         ${otp}
//       </div>

//       <p style="
//         margin-top: 25px;
//         font-size: 13px;
//         color: #888;
//       ">
//         ⚠️ This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.
//       </p>

//       <div style="
//         margin-top: 30px;
//         font-size: 12px;
//         color: #aaa;
//       ">
//         If you didn’t request this, you can ignore this email.
//       </div>

//     </div>
//   </div>
//     `,
//     });

//     console.log("📩 OTP sent to:", email);
// };

import { Resend } from "resend";

/* 🔐 Check API key */
// if (!process.env.RESEND_API_KEY) {
//   throw new Error("RESEND_API_KEY is missing in environment variables");
// }
const resend = new Resend("re_FFJTFaAR_HcMLHYfvJ7B3785DhjRvVyEv");

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