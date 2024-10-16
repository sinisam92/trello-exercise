import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { cardSchema } from "./Card.js";

const listSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    projectId: {
      type: String,
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
    cards: {
      type: [cardSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export { listSchema };
