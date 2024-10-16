import projects from "../data/projectData.js";
import { validationResult } from "express-validator";
import Project from "../models/Project.js";

const getAllProjects = async (_req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error during fetching projects:", error);
    res.status(500).json({ error: "Error fetching projects!" });
  }
};

const getProjectById = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const project = await Project.findOne({ id: paramsId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error during fetching project:", error);
    res.status(500).json({ error: "Error fetching project!" });
  }
};

const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const newProject = req.body;

  try {
    const projectToAdd = new Project(newProject);
    await projectToAdd.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error during project creation:", error);
    res.status(500).json({ error: "Error creating project!" });
  }
};

const deleteProject = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const project = await Project.findOneAndDelete({ id: paramsId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during project deletion:", error);
    res.status(500).json({ error: "Error deleting project!" });
  }
};

const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }
  const paramsId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedProject = await Project.findOneAndUpdate({ id: paramsId }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error during project update:", error);
    res.status(500).json({ error: "Error updating project!" });
  }
};

export { getAllProjects, getProjectById, createProject, deleteProject, updateProject };
