import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    foodRating: {
      type: String,
    
    
    },
    serviceRating: {
      type: String,
     
     
    },
    feedback: {
      type: String,
    },
    name: {
        type: String,
      },

  
  },
  { timestamps: true }
);

export default mongoose.model("feedback", feedbackSchema);
