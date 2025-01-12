const { env } = process;
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

//if we are in production always load the .env
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.info = () => {};
  dotenv.config();
} else {
  //dev or staging or any other enviroment
  //look for a .env.development file
  let envPath = path.join(__dirname, "..", "env.development");
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    dotenv.config();
  }
}

const config = {
  env: env.NODE_ENV || "production",
  tokenSecret: env.JWT_SECRET,
  mongoUri: env.NODE_ENV === "testing" ? env.MONGO_URI_TEST : env.MONGO_URI,
  jwtSecret: env.JWT_REFRESH_SECRET,
  // frontendOrigin
};

// console.log("ENV", config.env);
// console.log(config);

export default config;
