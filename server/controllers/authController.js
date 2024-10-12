import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "../data/usersData.js";

import { validationResult } from "express-validator";

const register = async (req, res) => {
  const { username, firstName, lastName, email, password, avatarUrl } = req.body;
  const salt = 10;

  try {
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      avatarUrl,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const user = users.find((user) => user.username === username);
  console.log("User", user);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    console.log(await bcrypt.compare(password, user.password));
    if (await bcrypt.compare(password, user.password)) {
      console.log("TEST LOG");
      console.log("process.env", process.env.TOKEN_SECRET);

      const token = jwt.sign({ username }, process.env.TOKEN_SECRET);
      //   res.cookie("token", token, {
      //     httpOnly: true,
      //     // maxAge: 900000,
      //   });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

const logout = (_req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

export { register, login, logout };
