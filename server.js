// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";

// /* ================= ROUTES ================= */
// import carRoutes from "./routes/carRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();

// /* ================= SECURITY ================= */
// app.use(helmet());

// /* ================= MIDDLEWARE ================= */
// app.use(cors({
//   origin: [
//   "http://localhost:5173",
//   "https://pradeeptrader.com",
//   "https://www.pradeeptrader.com"
//   ],
//   credentials: true,
// }));

// app.use(express.json());
// app.use(cookieParser());

// /* ================= STATIC FILES ================= */
// app.use("/uploads", express.static("uploads"));

// /* ================= ROUTES ================= */
// app.use("/api/cars", carRoutes);
// app.use("/api/reviews", reviewRoutes);

// /* 🔥 IMPORTANT FIX */
// app.use("/api/auth", authRoutes);
// console.log("🔥 AUTH ROUTES LOADED");

// /* ================= TEST ROUTE ================= */
// app.get("/", (req, res) => {
//   res.send("Backend running ✅");
// });

// /* ================= DATABASE ================= */
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("❌ DB Error:", err);
//     process.exit(1);
//   });
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";

// /* ================= LOAD ENV ================= */
// dotenv.config();

// /* ================= ROUTES ================= */
// import carRoutes from "./routes/carRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();

// /* ================= DEBUG ================= */
// console.log("🌍 ENV CHECK MONGO_URI:", process.env.MONGO_URI);

// /* ================= SECURITY ================= */
// app.use(helmet());

// /* ================= CORS ================= */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://pradeeptrader.com",
//       "https://www.pradeeptrader.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// /* ================= MIDDLEWARE ================= */
// app.use(express.json());
// app.use(cookieParser());

// /* ================= STATIC FILES ================= */
// app.use("/uploads", express.static("uploads"));

// /* ================= ROUTES ================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/cars", carRoutes);
// app.use("/api/reviews", reviewRoutes);

// /* ================= TEST ROUTE ================= */
// app.get("/", (req, res) => {
//   res.send("Backend running ✅");
// });

// /* ================= GLOBAL ERROR HANDLER ================= */
// app.use((err, req, res, next) => {
//   console.error("🔥 GLOBAL ERROR:", err.stack);
//   res.status(500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// /* ================= DATABASE ================= */
// mongoose
//   .connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 10000,
//   })
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err.message);
//   });

// /* ================= SERVER ================= */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= ROUTES ================= */
import carRoutes from "./routes/carRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/* ================= SECURITY ================= */
app.use(helmet());

/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pradeeptrader.com",
      "https://www.pradeeptrader.com",
    ],
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});