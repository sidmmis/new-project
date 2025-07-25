import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const DB = process.env.MONGO_URL;

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connection successfull`);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
