import { validationResult } from "express-validator";
import List from "../models/List.js";
import Card from "../models/Card.js";
import Project from "../models/Project.js";

export const getAllLists = async (_req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error during fetching lists:", error);
    res.status(500).json({ error: "Error fetching lists!" });
  }
};

export const getListById = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Error during fetching list:", error);
    res.status(500).json({ error: "Error fetching list!" });
  }
};

export const getListsByProjectId = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.find({ projectId: id });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Error during fetching list:", error);
    res.status(500).json({ error: "Error fetching list!" });
  }
};

export const createList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const newList = req.body;

    const listToAdd = new List(newList);

    const project = await Project.findById(newList.projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found!" });
    }

    project.lists.push(listToAdd._id);
    await project.save();

    await listToAdd.save();
    res.status(201).json(listToAdd);
  } catch (error) {
    console.error("Error during list creation:", error);
    res.status(500).json({ error: "Error creating list!" });
  }
};

export const deleteList = async (req, res) => {
  const paramsId = req.params.id;

  try {
    await Card.deleteMany({ listId: paramsId });
    const list = await List.findOneAndDelete({ _id: paramsId });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during list deletion:", error);
    res.status(500).json({ error: "Error deleting list!" });
  }
};

export const updateList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const paramsId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedList = await List.findOneAndUpdate({ _id: paramsId }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(updatedList);
  } catch (error) {
    console.error("Error during list update:", error);
    res.status(500).json({ error: "Error updating list!" });
  }
};
