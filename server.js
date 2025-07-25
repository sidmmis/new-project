//require  can be replace with import in es6  (just use type:module in package.json)
import express from "express";
import dotenv, { config } from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import generalRoutes from "./routes/generalRoute.js";
import authRoutes from "./routes/authRoute.js";
import formidable from "formidable";

import cors from "cors";
const app = express();

// config database
connectDB();

// middleware
app.use(express.json()); //for handling json req
app.use(morgan("dev")); //for getting http req links
dotenv.config({ path: "./.env" });
app.use(cors());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/general", generalRoutes);
const PORT = process.env.PORT || 8080;
//hello
//server listening
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
