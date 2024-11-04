import { apiClient } from "./apiClient";

export const getAllUsers = async () => {
  return apiClient("users", {
    method: "GET",
    // credentials: "include",
  });
};

export const getUsersByIds = async (userIds) => {
  return apiClient("users/many", {
    method: "POST",
    body: JSON.stringify({ ids: userIds }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addNewUser = async (userData) => {
  return apiClient("users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
