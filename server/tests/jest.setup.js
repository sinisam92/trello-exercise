import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env.ATLAS_URI_TEST);
  // await User.deleteMany();
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
