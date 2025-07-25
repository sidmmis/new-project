// import mongoose from "mongoose";

// const noticeSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   content: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Notice", noticeSchema);

import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  pdf: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notice", noticeSchema);
