import { apiClient } from "./apiClient";

const getProjects = async () => {
  return await apiClient("projects");
};

const getProject = async (projectId) => {
  return await apiClient(`projects/${projectId}`);
};

const createProject = async (project) => {
  return await apiClient("projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
};

const updateProject = async (project) => {
  return await apiClient(`projects/${project.id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
};

const deleteProject = async (projectId) => {
  return await apiClient(`projects/${projectId}`, {
    method: "DELETE",
  });
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
