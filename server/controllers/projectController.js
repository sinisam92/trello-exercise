import { validationResult } from "express-validator";
import List from "../models/List.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const getAllProjects = async (req, res) => {
  try {
    // const projects = await Project.find({ createdByUserId: req.user._id });
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error during fetching projects:", error);
    res.status(500).json({ error: "Error fetching projects!" });
  }
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error during fetching project:", error);
    res.status(500).json({ error: "Error fetching project!" });
  }
};

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const newProject = req.body;
  const userId = newProject.createdByUserId;

  try {
    const projectToAdd = new Project(newProject);

    const user = await User.findById(userId);

    if (userId === user._id) {
      user.createdProjects.push(projectToAdd._id);
      await user.save();
    }

    await projectToAdd.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error during project creation:", error);
    res.status(500).json({ error: "Error creating project!" });
  }
};

// TODO: Implement delete lists, cards, comments related to projects to be deleted when deleting a project
export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during project deletion:", error);
    res.status(500).json({ error: "Error deleting project!" });
  }
};

export const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }
  const { projectId } = req.params;
  const updatedData = req.body;
  console.log("updatedData", updatedData);

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error during project update:", error);
    res.status(500).json({ error: "Error updating project!" });
  }
};

export const addListToProject = async (req, res) => {
  const { projectId } = req.params;

  const listData = req.body;

  try {
    const newList = new List(listData);
    await newList.save();

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    //     project.lists.push(newList._id);

    await project.save();

    res.status(201).json(newList);
  } catch (error) {
    console.error("Error adding list to project:", error);
    res.status(500).json({ error: "Error adding list to project!" });
  }
};

// export const getProjectWithListsAndCards = async (req, res) => {
//   const { projectId } = req.params;

//   try {
//     const project = await Project.findById(projectId).populate({
//       path: "lists",
//       populate: {
//         path: "cards",
//       },
//     });

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     res.json(project);
//   } catch (error) {
//     console.error("Error fetching project with lists:", error);
//     res.status(500).json({ error: "Error fetching project with lists!" });
//   }
// };
