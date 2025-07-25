import mongoose from "mongoose";
const savePollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      id: { type: String, unique: true },
      options: { type: String },
      count: { type: Number, default: 0 },
    },
  ],
  votedUsers: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Poll", savePollSchema);
