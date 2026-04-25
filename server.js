// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";

// // import authRoutes from "./routes/authRoutes.js";
// // import carRoutes from "./routes/carRoutes.js";
// // import reviewRoutes from "./routes/reviewRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";

// // const app = express();

// // /* =========================
// //    MIDDLEWARE
// // ========================= */
// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());
// // app.use(cookieParser());

// // /* =========================
// //    STATIC FILES
// // ========================= */
// // app.use("/uploads", express.static("uploads"));

// // /* =========================
// //    ROUTES
// // ========================= */
// // app.use("/api/auth", authRoutes);
// // app.use("/api/cars", carRoutes);
// // app.use("/api/reviews", reviewRoutes);
// // app.use("/api/user", userRoutes);
// // /* =========================
// //    TEST ROUTE (IMPORTANT)
// // ========================= */
// // app.get("/", (req, res) => {
// //   res.send("Backend is running ✅");
// // });

// // /* =========================
// //    DATABASE
// // ========================= */
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/cars")
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.log("❌ DB Error:", err));

// // /* =========================
// //    SERVER
// // ========================= */
// // const PORT = 5000;

// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });

// // import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// // import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// console.log("ENV CHECK:", process.env.MONGO_URI);

// // const app = express();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(5000, () => console.log("🚀 Server running on port 5000"));
//   })
//   .catch(err => {
//     console.error("❌ MongoDB Error:", err);
//   });



// /* =========================
//    ROUTES
// ========================= */
// import authRoutes from "./routes/authRoutes.js";
// import carRoutes from "./routes/carRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// /* =========================
//    INIT
// ========================= */
// dotenv.config();
// console.log("MONGO_URI =", process.env.MONGO_URI);

// const app = express();

// console.log("🔥 server.js started loading...");

// /* =========================
//    MIDDLEWARE
// ========================= */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// /* =========================
//    STATIC FILES
// ========================= */
// app.use("/uploads", express.static("uploads"));

// /* =========================
//    ROUTES
// ========================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/cars", carRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/user", userRoutes);

// /* =========================
//    TEST ROUTE
// ========================= */
// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });

// /* =========================
//    DATABASE CONNECTION
// ========================= */
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log("✅ MongoDB Connected");
//     console.log("📦 Host:", conn.connection.host);
//   } catch (err) {
//     console.log("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   }
// };

// /* =========================
//    START SERVER
// ========================= */
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.log("❌ Server failed to start:", err.message);
//   }
// };

// startServer();


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import carRoutes from "./routes/carRoutes.js";

// dotenv.config();

// const app = express();

// /* ================= MIDDLEWARE ================= */
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// app.use(express.json());
// app.use(cookieParser());

// /* ================= STATIC (FOR IMAGES) ================= */
// app.use("/uploads", express.static("uploads"));

// /* ================= ROUTES ================= */
// app.use("/api/cars", carRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running ✅");
// });

// /* ================= DB + SERVER ================= */
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => console.error("❌ DB Error:", err));
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

/* ================= ROUTES ================= */
import carRoutes from "./routes/carRoutes.js";
import reviewRoutes from "./routes/reviewRouter.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ADDED AUTH

dotenv.config();

const app = express();

/* ================= SECURITY ================= */
app.use(helmet());

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-domain.com"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes); // ✅ FIXED (THIS WAS MISSING)

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

/* ================= DB + SERVER ================= */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB Error:", err);
    process.exit(1);
  });