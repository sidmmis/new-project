import mongoose from "mongoose";
const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   default: "manager",
    },
    email: {
      type: String,
      required: true,
      //   default: "manager@mnnit.ac.in",
    },
    password: {
      type: String,
      required: true,
      //   default: "manager",
    },
    role: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

export default mongoose.model("manager", managerSchema);
