import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "../data/usersData.js";

import { validationResult } from "express-validator";

const register = async (req, res) => {
  const { username, firstName, lastName, email, password, avatarUrl } = req.body;

  try {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      avatarUrl,
      password,
    };
    users.push(newUser);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.TOKEN_SECRET
      );
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
