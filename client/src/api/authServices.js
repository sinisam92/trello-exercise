import { apiClient } from "./apiClient";

export const login = (credentials) => {
  return apiClient("api/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const refreshAccessToken = () => {
  return apiClient("api/auth/refresh-token", {
    method: "POST",
    credentials: "include",
  });
};

export const logoutUser = () => {
  return apiClient("api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
