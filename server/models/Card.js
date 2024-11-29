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
    createdByUserId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
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
    //will be implemented in future
    // updates: {
    //   type: Array,
    // },
    comments: {
      type: Array,
      default: [],
      ref: "Comment",
    },
    commentsCount: {
      type: Number,
      default: 0,
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

const Card = mongoose.model("Card", cardSchema);

export default Card;
