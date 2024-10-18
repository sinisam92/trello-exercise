import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    createdByUserId: {
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
    lists: [{ type: String, required: true, ref: "List" }],
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
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
