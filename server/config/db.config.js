import mongoose from "mongoose";
import config from "./config.js";

// let connectionString = process.env.DEVELOPMENT
//   ? process.env.ATLAS_URI_TEST
//   : process.env.ATLAS_URI;

const connectDB = async () => {
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
