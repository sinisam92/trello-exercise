import { apiClient } from "./apiClient";

export const getAllUsers = async () => {
  return apiClient("users", {
    method: "GET",
  });
};

export const getUsersByIds = async (userIds) => {
  const encodedUsersIds = encodeURIComponent(JSON.stringify(userIds));

  return apiClient(`users/many?userIds=${encodedUsersIds}`, {
    method: "GET",
    credentials: "include",
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

export const updateUserService = async (userData) => {
  console.log("userData SERVICE", userData);

  return apiClient(`users/${userData.id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
