import { useState, useEffect } from "react";
import presentationData from "../data/presentationData";

const useProjects = (projectId) => {
  const [projects, setProjects] = useState(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    return storedProjects || presentationData;
  });

  const addProject = (newProject) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      return updatedProjects;
    });
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const currentProject = projects.find((project) => project.id === projectId);
  return { projects, currentProject, setProjects, addProject };
};

export default useProjects;
