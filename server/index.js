import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3044;

app.use(express.json());

app.use('/users', userRouter);

//Fallback route
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/public/404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
