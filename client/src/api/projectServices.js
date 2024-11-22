import { apiClient } from "./apiClient";

export const getProjects = async () => {
  return apiClient("projects");
};

export const getProjectById = async (projectId) => {
  return apiClient(`projects/${projectId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const createProject = async (project) => {
  return apiClient("projects", {
    method: "POST",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
};

export const updateProjectService = async (project) => {
  return apiClient(`projects/${project._id}`, {
    method: "PUT",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProjectService = async (projectId) => {
  return apiClient(`projects/${projectId}`, {
    method: "DELETE",
  });
};
