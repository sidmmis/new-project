import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  reg: {
    type: String,
  },
  description: {
    type: String,
  },
  imageData: {
    data: Buffer,
    contentType: String,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  verify: {
    type: String,
    default: "0",
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
