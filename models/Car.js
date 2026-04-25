import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: String,
  company: String,
  model: String,
  year: String,
  price: String,
  seats: String,
  fuel: String,
  speed: String,
  mileage: String,
  transmission: String,
  color: String,
  owner: String,
  sold: Boolean,
  description: String,
  images: [String],
});

export default mongoose.model("Car", carSchema);