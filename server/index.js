import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import cors from "./middleware/cors.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3044;

app.use(express.json());
app.use(cors);
app.use(cookieParser());
dotenv.config();
connectDB();

// Routes
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/api/auth", authRoutes);

//Fallback route
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/public/404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
