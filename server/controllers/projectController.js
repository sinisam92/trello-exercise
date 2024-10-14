import projects from "../data/projectData.js";
import { validationResult } from "express-validator";

const getAllProjects = (_req, res) => {
  res.status(200).json(projects);
};

const getProjectById = (req, res) => {
  const paramsId = req.params.id;
  const project = projects.find((p) => p.id == paramsId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
};

const createProject = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }
  const newProject = req.body;
  projects.push(newProject);
  res.status(201).json(newProject);
};

const deleteProject = (req, res) => {
  const paramsId = Number(req.params.id);

  const projectIndex = projects.findIndex((p) => Number(p.id) === paramsId);

  if (projectIndex === -1) {
    return res.status(404).json({ message: "Project not found" });
  }

  projects.splice(projectIndex, 1);
  res.status(204).end();
};

const updateProject = (req, res) => {
  const errors = validationResult(req);
  const paramsId = req.params.id;
  const projectIndex = projects.findIndex((p) => p.id === paramsId);

  if (projectIndex === -1) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!errors.isEmpty()) {
    return res.status(400).json({ errror: errors.array() });
  }

  const updatedProject = { ...projects[projectIndex], ...req.body };
  projects[projectIndex] = updatedProject;

  res.status(200).json(updatedProject);
};

export { getAllProjects, getProjectById, createProject, deleteProject, updateProject };
