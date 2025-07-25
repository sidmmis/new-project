import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    reg: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      default: "1",
    },
    blocked: {
      type: String,
      default: "0",
    },
    paid: {
      type: String,
      default: "0",
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
