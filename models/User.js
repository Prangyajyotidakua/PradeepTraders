// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true, required: true },
//   phone: String,

//   password: String, // 🔥 MUST EXIST

//   signupOtp: String,
//   signupOtpExpiry: Date,

//   loginOtp: String,
//   loginOtpExpiry: Date,

//   isVerified: {
//     type: Boolean,
//     default: false,
//   },

//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
  
// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // ✅ important
      trim: true,
    },

    phone: String,

    password: {
      type: String,
      required: true, // ✅ must
    },

    signupOtp: String,
    signupOtpExpiry: Date,

    loginOtp: String,
    loginOtpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ❤️ WISHLIST
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],

    // 🛒 CART
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

export default mongoose.model("User", userSchema);