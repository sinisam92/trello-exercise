import mongoose from "mongoose";
import config from "../config/config.js";
beforeAll(async () => {
  await mongoose.connect(config.mongoUri);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
