import { validationResult } from "express-validator";
import Comment from "../models/Comment.js";

const getAllComment = async (_req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error during fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments!" });
  }
};

const getCommentById = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const list = await Comment.findById(paramsId);

    if (!list) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Error during fetching list:", error);
    res.status(500).json({ error: "Error fetching list!" });
  }
};

const createComment = async (req, res) => {
  const newComment = req.body;

  try {
    const listToAdd = new Comment(newComment);

    await listToAdd.save();
    res.status(201).json(listToAdd);
  } catch (error) {
    console.error("Error during list creation:", error);
    res.status(500).json({ error: "Error creating list!" });
  }
};

const deleteComment = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const list = await Comment.findOneAndDelete({ _id: paramsId });

    if (!list) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during list deletion:", error);
    res.status(500).json({ error: "Error deleting list!" });
  }
};

const updateComment = async (req, res) => {
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
    console.error("Error during list update:", error);
    res.status(500).json({ error: "Error updating list!" });
  }
};

export { getAllComment, getCommentById, createComment, deleteComment, updateComment };
