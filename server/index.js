import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.config.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3044;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:3044",
      "http://127.0.0.1:5500",
      "https://team-managment-client.vercel.app/",
    ],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// serve static files -  preffered route / actual folder path
app.use("/images", express.static("statics"));
dotenv.config();
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/lists", listRoutes);
app.use("/cards", cardRoutes);
app.use("/comments", commentRoutes);

//Fallback route
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/public/404.html"));
});

const PORT = process.env.PORT || 3044;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
  });
}

app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});

export default app;
