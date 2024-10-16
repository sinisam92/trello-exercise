import Project from "../models/Project.js";

const addList = async (req, res) => {
  const { projectId } = req.params;
  const newList = req.body;

  try {
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const listToAdd = newList;

    project.lists.push(listToAdd);

    await project.save();

    res.status(201).json(listToAdd);
  } catch (error) {
    console.error("Error during list creation:", error);
    res.status(500).json({ error: "Error creating list!" });
  }
};

export { addList };
