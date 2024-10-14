import users from "../data/usersData.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const getAllUsers = (_req, res) => {
  res.status(200).json(users);
};

const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const newUser = req.body;
  const salt = 10;

  try {
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error hashing password, contact administrator." });
  }
  //TODO: this part will change when we connect to a database, as uuid will be used
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const userToAdd = { id: newId, ...newUser };

  users.push(userToAdd);
  res.status(201).json(userToAdd);
};

const getUserById = (req, res) => {
  const paramsId = req.params.id;
  const user = users.find((u) => u.id == paramsId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user).end();
};

const deleteUser = (req, res) => {
  const paramsId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === paramsId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).end();
};

const updateUser = (req, res) => {
  const errors = validationResult(req);
  const paramsId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === paramsId);

  // Check if user exists
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  // Checks for validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;

  res.json(updatedUser);
};

export { getAllUsers, addUser, getUserById, deleteUser, updateUser };
