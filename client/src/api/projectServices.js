import { apiClient } from "./apiClient";

const getProjects = async () => {
  return await apiClient("projects");
};

export { getProjects };
