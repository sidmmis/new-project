import mongoose from "mongoose";

const menureqSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "0",
    },
    wardenmessage: {
      type: String, // Array of strings
      default: "",
    },
    managerreq: {
      type: Array, // Array of strings
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("menureq", menureqSchema);
