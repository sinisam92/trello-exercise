import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import commentSchema from "./Comment.js";

const cardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    listId: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
    assigned: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    // comments: {
    //   type: Array,
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;