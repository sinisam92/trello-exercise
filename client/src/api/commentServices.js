import { apiClient } from "./apiClient";

export const getComments = async () => {
  return apiClient("comments");
};

export const getCommentById = async (commentId) => {
  console.log("commentId in service", commentId);

  return apiClient(`comments/${commentId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const getCommentsByCardCommentsIds = async (commentIds) => {
  const encodedCommentIds = encodeURIComponent(JSON.stringify(commentIds));

  return apiClient(`comments/by-comment-ids?commentIds=${encodedCommentIds}`, {
    method: "GET",
    credentials: "include",
  });
};

export const createComment = async (comment) => {
  return apiClient("comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
};

export const updateCommentService = async (comment) => {
  return apiClient(`comments/${comment._id}`, {
    method: "PUT",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCommentService = async (commentId) => {
  console.log("commentId in service", commentId);

  return apiClient(`comments/${commentId}`, {
    method: "DELETE",
  });
};
