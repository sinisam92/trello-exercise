import { apiClient } from "./apiClient";

export const getCards = async () => {
  return apiClient("cards");
};

export const getCardById = async (cardId) => {
  return apiClient(`cards/with-comments/${cardId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const getCardsByListsIds = async (listIds) => {
  const encodedListIds = encodeURIComponent(JSON.stringify(listIds));

  return apiClient(`cards/by-list-ids?listIds=${encodedListIds}`, {
    method: "GET",
    credentials: "include",
  });
};

export const createCard = async (card) => {
  return apiClient("cards", {
    method: "POST",
    body: JSON.stringify(card),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCardService = async (card) => {
  return apiClient(`cards/${card._id}`, {
    method: "PUT",
    body: JSON.stringify(card),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCardService = async (cardId) => {
  return apiClient(`cards/${cardId}`, {
    method: "DELETE",
  });
};
