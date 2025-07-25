import mongoose from "mongoose";

const accountantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "accountant",
    },
    email: {
      type: String,
      required: true,
      default: "accountant@mnnit.ac.in",
    },
    password: {
      type: String,
      required: true,
      default: "accountant",
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);
export default mongoose.model("accountant", accountantSchema);
