// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   name: String,
//   role: String,
//   message: String,
//   carImg: String,
// }, { timestamps: true });

// export default mongoose.model("Review", reviewSchema);

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    message: String,
    carImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);