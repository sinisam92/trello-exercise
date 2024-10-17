import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 604800000),
          sameSite: config.env == "production" ? "None" : "lax",
          secure: config.env == "production" ? true : false, //http on localhost, https on production
          httpOnly: true,
        })
        .json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("error logging in: ", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const logout = (_req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

export { login, logout };
