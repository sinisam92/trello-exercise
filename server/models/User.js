import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    username: {
      type: String,
      required: true,
      maxLength: 20,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    defaultAvatar: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
