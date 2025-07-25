import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
    default: "Monday",
  },

  breakfast: {
    type: String,
    required: true,
    default: "Default Breakfast",
  },
  lunch: {
    type: String,
    required: true,
    default: "Default Lunch",
  },
  dinner: {
    type: String,
    required: true,
    default: "Default Dinner",
  },
});

export default mongoose.model("Menu", menuSchema);
