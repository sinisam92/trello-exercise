import { apiClient } from "./apiClient";

export const getProjects = async () => {
  return await apiClient("projects");
};

export const getProjectById = async (projectId) => {
  return apiClient(`projects/${projectId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const createProject = async (project) => {
  return await apiClient("projects", {
    method: "POST",
    body: JSON.stringify(project),
    //credentials: 'include'
  });
};

export const updateProject = async (project) => {
  return await apiClient(`projects/${project.id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
};

export const deleteProject = async (projectId) => {
  return await apiClient(`projects/${projectId}`, {
    method: "DELETE",
  });
};
