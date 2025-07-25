import { Schema, model } from "mongoose";

const guestSchema = new Schema(
  {
    name: String,
    email: String,
    contactNumber: String,
    startDate: Date,
    numberOfDays: Number,
    totalPayment: Number, // New field for total payment
  },
  { timestamps: true }
);

export default model("Guest", guestSchema);
