import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  console.log("config.mongoUri", config.mongoUri);
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error12345: ", error);

    console.error(`Error: ${error.message}`);
    // process.exit(1);
  }
};

export default connectDB;
