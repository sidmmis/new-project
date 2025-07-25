import mongoose from "mongoose";

const complainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reg: {
      type: String,
      required: true,
    },
    complain: {
      type: String,
      required: true,
    },
    resolve: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

export default mongoose.model("complains", complainSchema);
