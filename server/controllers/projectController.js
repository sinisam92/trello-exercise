import starterProjectData from "../data/projectData.js";

const getAllProjects = (_req, res) => {
  res.status(200).json(starterProjectData);
};

export { getAllProjects };
