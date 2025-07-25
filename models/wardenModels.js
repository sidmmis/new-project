import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   default: "Warden",
    },
    email: {
      type: String,
      required: true,
      //   default: "warden@mnnit.ac.in",
    },
    password: {
      type: String,
      required: true,
      //   default: "warden",
    },
    role: {
      type: Number,
      default: 1,
    },
    managerId: {
      type: mongoose.ObjectId,
      ref: "manager",
    },
    managerreq: {
      type: [String], // Array of strings
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("warden", wardenSchema);
