import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { listSchema } from "./List.js";

const projectSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  createByUserId: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  lists: {
    type: [listSchema],
    default: [],
  },
  // lists: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "List",
  //   },
  // ],
  coverImage: {
    type: String,
  },
  technologies: {
    type: Array,
  },
  avatarUrl: {
    type: String,
  },
  membersId: {
    type: Array,
  },
  updates: {
    type: Array,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
