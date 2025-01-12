import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users!" });
  }
};

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const newUser = req.body;
  const salt = 10;

  try {
    const checkIfExists = await User.findOne({ email: newUser.email });
    if (checkIfExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    const userToAdd = new User(newUser);

    const savedUser = await userToAdd.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ error: "Error hashing password, contact administrator." });
  }
};

export const getUserById = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const user = await User.findById(paramsId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user!" });
  }
};

export const deleteUser = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(paramsId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // prettier-ignore
    res.status(204).end();
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ error: "Error deleting user, contact administrator." });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const paramsId = req.params.id;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(paramsId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "Error updating user, contact administrator." });
  }
};

export const getUsersByIds = async (req, res) => {
  const { userIds } = req.query;

  try {
    const userIdsDecoded = await JSON.parse(decodeURIComponent(userIds));
    if (!Array.isArray(userIdsDecoded)) {
      return res.status(400).json({ error: "IDs must be provided as an array." });
    }

    const users = await User.find({ _id: { $in: userIdsDecoded } });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users by IDs:", error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};
