import { apiClient } from "./apiClient";

export const getLists = async () => {
  return apiClient("lists");
};

export const getListById = async (listId) => {
  return apiClient(`lists/single/${listId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const getListByProjectId = async (projectId) => {
  return apiClient(`lists/${projectId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const createList = async (list) => {
  return apiClient("lists", {
    method: "POST",
    body: JSON.stringify(list),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const updateListService = async (list) => {
  return apiClient(`lists/${list._id}`, {
    method: "PUT",
    body: JSON.stringify(list),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteListService = async (listId) => {
  return apiClient(`lists/${listId}`, {
    method: "DELETE",
  });
};
