import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
