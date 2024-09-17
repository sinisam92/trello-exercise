import { useState, useEffect } from "react";
import presentationData from "../data/presentationData";

const useProjects = (projectId) => {
  const [projects, setProjects] = useState(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    return storedProjects || presentationData;
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const currentProject = projects.find((project) => project.id === projectId);
  return { projects, currentProject, setProjects };
};

export default useProjects;
