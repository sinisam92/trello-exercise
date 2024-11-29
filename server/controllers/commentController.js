import { validationResult } from "express-validator";
import Comment from "../models/Comment.js";
import Card from "../models/Card.js";

export const getAllComment = async (_req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error during fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments!" });
  }
};

export const getCommentById = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const comment = await Comment.findById(paramsId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error during fetching comment:", error);
    res.status(500).json({ error: "Error fetching comment!" });
  }
};

export const getCommentByCardCommentsIds = async (req, res) => {
  const { commentIds } = req.query;

  try {
    const commentIdsDecoded = await JSON.parse(decodeURIComponent(commentIds));

    const comment = await Comment.find({
      _id: { $in: commentIdsDecoded },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error during fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments!" });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = req.body;

    const card = await Card.findOne({ _id: newComment.cardId });

    if (!card) {
      return res.status(404).json({ error: "Card not found!" });
    }

    const commentToAdd = new Comment(newComment);

    card.comments.push(commentToAdd._id);

    await card.save();
    await commentToAdd.save();

    res.status(201).json(commentToAdd);
  } catch (error) {
    console.error("Error during comment creation:", error);
    res.status(500).json({ error: "Error creating comment!" });
  }
};

export const deleteComment = async (req, res) => {
  const paramsId = req.params.id;
  console.log("paramsId", paramsId);

  try {
    const comment = await Comment.findOneAndDelete({ _id: paramsId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during comment deletion:", error);
    res.status(500).json({ error: "Error deleting comment!" });
  }
};

export const updateComment = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errror: errors.array() });
  //   }
  const paramsId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: paramsId },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error during comment update:", error);
    res.status(500).json({ error: "Error updating comment!" });
  }
};
