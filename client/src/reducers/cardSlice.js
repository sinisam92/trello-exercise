import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createCard,
  deleteCardService,
  getCardById,
  getCards,
  getCardsByListsIds,
  updateCardService,
} from "../api/cardServices";

// Fetch all cards
export const fetchAllCards = createAsyncThunk(
  "cards/fetchAllCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCards();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCardById = createAsyncThunk(
  "cards/fetchCardById",
  async (cardId, { rejectWithValue }) => {
    try {
      const response = await getCardById(cardId);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// Fetch a single card by ID
export const fetchCardsByListsIds = createAsyncThunk(
  "cards/fetchCardsByListsIds",
  async (listIds, { rejectWithValue }) => {
    try {
      const response = await getCardsByListsIds(listIds);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Create a new card
export const createNewCard = createAsyncThunk(
  "cards/createNewCard",
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await createCard(cardData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Update an  card
export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await updateCardService(cardData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete a card
export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, { rejectWithValue }) => {
    try {
      await deleteCardService(cardId);
      return cardId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    status: "idle",
    loading: false,
    error: null,
    currentCard: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all cards
      .addCase(fetchAllCards.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch cards by list IDs
      .addCase(fetchCardsByListsIds.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardsByListsIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCardsByListsIds.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single card
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create new card
      .addCase(createNewCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload);
        state.currentCard = action.payload;
      })
      .addCase(createNewCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update card
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCard = action.payload;
        const index = state.cards.findIndex(
          (card) => card._id === updatedCard._id,
        );
        if (index !== -1) {
          state.cards[index] = updatedCard;
        }
        if (state.currentCard && state.currentCard._id === updatedCard._id) {
          state.currentCard = updatedCard;
        }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete card
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter((card) => card._id !== action.payload);
        if (state.currentCard && state.currentCard._id === action.payload) {
          state.currentCard = null;
        }
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cardSlice.reducer;
